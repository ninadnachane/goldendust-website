// Full build used by Cloudflare: tests → images → site → checks.
// If any step fails the build stops (nothing is deployed, the live site stays as it was)
// and an email goes to NOTIFY_EMAIL (default hello@goldendustsafaris.com) via Resend.
// Needs RESEND_API_KEY as a *build* variable in Cloudflare (Settings → Build → Variables and secrets).
import { spawnSync } from "node:child_process";

const steps = [
  ["Tests", "npm", ["test"]],
  ["Download images", "node", ["scripts/fetch-images.mjs"]],
  ["Build site", "npx", ["astro", "build"]],
  ["Check built site", "node", ["scripts/check-build.mjs"]],
];

async function notify(step, output) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL || "hello@goldendustsafaris.com";
  const commit = (process.env.WORKERS_CI_COMMIT_SHA || "").slice(0, 7);
  const branch = process.env.WORKERS_CI_BRANCH || "";
  if (!key) { console.error("(No RESEND_API_KEY build variable, so no failure email was sent.)"); return; }
  const failed = output.split("\n").filter((l) => /^not ok|failed|Error|missing|must /i.test(l)).slice(0, 30).join("\n");
  const tail = output.split("\n").slice(-60).join("\n");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || "Golden Dust website <onboarding@resend.dev>",
      to: [to],
      subject: `Website update NOT deployed: "${step}" failed${commit ? ` (${commit})` : ""}`,
      text: `The latest website update was stopped before going live, so the site is still running the previous version.\n\nFailed step: ${step}\nBranch: ${branch || "?"}  Commit: ${commit || "?"}\n\nWhat failed:\n${failed || "(see log below)"}\n\nLast lines of the log:\n${tail}\n\nFull log: Cloudflare → Workers & Pages → goldendust-website → Deployments → View build history.`,
    }),
  }).catch((e) => ({ ok: false, status: String(e) }));
  console.error(r.ok ? `Failure email sent to ${to}.` : `Couldn't send failure email (${r.status}).`);
}

for (const [name, cmd, args] of steps) {
  console.log(`\n=== ${name} ===`);
  const res = spawnSync(cmd, args, { encoding: "utf8", shell: process.platform === "win32", maxBuffer: 64 * 1024 * 1024 });
  const output = `${res.stdout || ""}${res.stderr || ""}`;
  process.stdout.write(output);
  if (res.status !== 0) {
    console.error(`\n✖ ${name} failed. Nothing will be deployed.`);
    await notify(name, output);
    process.exit(1);
  }
}
console.log("\n✔ All tests and checks passed. Deploying.");
