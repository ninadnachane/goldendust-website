// Starting data for the planner.
// Lodges come from the Excel "List of Lodges and Camps" (verified rates only, Arusha left out for now):
// regenerate with `node --import tsx scripts/import-lodges.mjs <file.xlsx>`, or upload it in /admin → Lodges & camps.
// Park fees are taken from our 2025/26 blog figures and should be checked against TANAPA / NCAA.
import type { Area, Config, Lodge } from "./engine";
import lodgeData from "./lodges.data.json";

// Route order: the planner puts the chosen areas in this order.
export const areas: Area[] = [
  { id: "tarangire", side: "east", blurb: "Game drives in Tarangire, known for its elephant herds, baobab trees and river wildlife.", name: "Tarangire", feeZoneId: "tarangire", minNights: 1, active: true },
  { id: "manyara", side: "east", blurb: "Game drives around Lake Manyara: groundwater forest, flamingos and tree-climbing lions if you're lucky.", name: "Lake Manyara", feeZoneId: "manyara", minNights: 1, active: true },
  { id: "ndutu", side: "west", blurb: "Game drives on the Ndutu plains, where the herds gather to calve from January to March.", name: "Ndutu", feeZoneId: "ncaa", minNights: 1, active: true },
  { id: "south-serengeti", side: "west", blurb: "Game drives in the southern Serengeti plains.", name: "South Serengeti", feeZoneId: "serengeti", minNights: 1, active: true },
  { id: "central-serengeti", side: "west", blurb: "Game drives in the central Serengeti around Seronera, home to many of the park's big cats.", name: "Central Serengeti", feeZoneId: "serengeti", minNights: 1, active: true },
  { id: "west-serengeti", side: "west", blurb: "Game drives in the western Serengeti.", name: "Western Serengeti", feeZoneId: "serengeti", minNights: 1, active: true },
  { id: "north-serengeti", side: "west", blurb: "Game drives in the northern Serengeti, where the herds cross the Mara River from July.", name: "North Serengeti", feeZoneId: "serengeti", minNights: 2, active: true },
  { id: "ngorongoro", side: "nca", blurb: "A night on the Ngorongoro Crater rim, high above the crater floor.", name: "Ngorongoro (crater rim)", feeZoneId: "ncaa", minNights: 1, active: true },
  { id: "karatu", side: "east", blurb: "A night in Karatu, in the highlands just outside the Ngorongoro Conservation Area.", name: "Karatu", feeZoneId: "", minNights: 1, active: true },
];

const lodges = lodgeData as Lodge[];

export const defaultConfig: Config = {
  settings: {
    guideDay: 40, vehicleDay: 180, maxPerVehicle: 7, vehicleDaysExtra: 1,
    firstLunchAdult: 15, firstLunchChild: 10,
    adminPct: 10, marginPct: 7, leadDays: 20,
    childMinAge: 5, childMaxAge: 15,
    minTotalNights: 2, maxTotalNights: 21, maxGuests: 21,
    craterFee: 295, ncaZoneId: "ncaa", airportTransfer: 80, addonAdminPct: 2, arushaNightAdult: 0, arushaNightChild: 0, // TODO: set the fixed Arusha rate in /admin
  },
  // Incl. 18% VAT, peak season, non-East-African visitors. TANAPA figures from the 2023/24 tariff.
  // NCA (Ngorongoro) transit/entry $71.80 per adult and crater descent $295 per vehicle confirmed by Golden Dust (18 Oct 2026).
  feeZones: [
    { id: "serengeti", name: "Serengeti National Park", adultDay: 82.6, childDay: 23.6, concessionAdult: 70.8, concessionChild: 11.8, campAdult: 35.4, campChild: 5.9, vehicleDay: 0 },
    { id: "ncaa", name: "Ngorongoro Conservation Area", adultDay: 71.8, childDay: 23.6, concessionAdult: 0, concessionChild: 0, campAdult: 0, campChild: 0, vehicleDay: 0 },
    { id: "tarangire", name: "Tarangire National Park", adultDay: 59, childDay: 17.7, concessionAdult: 47.2, concessionChild: 11.8, campAdult: 35.4, campChild: 5.9, vehicleDay: 0 },
    { id: "manyara", name: "Lake Manyara National Park", adultDay: 59, childDay: 17.7, concessionAdult: 47.2, concessionChild: 11.8, campAdult: 35.4, campChild: 5.9, vehicleDay: 0 },
  ],
  areas,
  lodges,
  // Arusha hotels aren't verified yet, so the arrival night isn't priced (pick hotels in /admin → Costs & rules once they are).
  arrival: { name: "Arusha", lodges: { budget: "", comfort: "", premium: "", luxury: "" } },
  // Add-ons guests can tick. Prices incl. VAT. Balloon and breakfast prices are SAMPLES: set yours in /admin → Costs & rules.
  addons: [
    { id: "crater", name: "Ngorongoro Crater game drive", blurb: "A half day on the crater floor, usually on the way back to Arusha. One of the best places in Tanzania to see rhino.", per: "vehicle", price: 295, childPrice: 0, parkFee: true, active: true },
    { id: "bush-breakfast", name: "Bush breakfast", blurb: "Breakfast set up out on the plains after an early game drive.", per: "person", price: 45, childPrice: 25, parkFee: false, active: true },
    { id: "balloon", name: "Balloon safari over the Serengeti", blurb: "A sunrise hot-air balloon flight over the plains, with a champagne breakfast after landing.", per: "person", price: 599, childPrice: 599, parkFee: false, active: true },
  ],
  doc: {
    included: [
      "Airport pick-up & drop-off (ARK or JRO)", "All ground transfers as per itinerary", "Private 4×4 safari vehicle with pop-up roof",
      "Professional driver-guide (English)", "Park entrance fees", "Concession / camping fees", "Accommodation as listed",
      "Meals on full board basis during safari (breakfast, lunch & dinner)", "Picnic lunches during game drives",
      "Drinking water during safari (in the vehicle)", "Soft drinks & beer (only in the vehicle)", "All game drives as per itinerary",
    ],
    excluded: [
      "International flights", "Visa fees", "Travel & medical insurance", "Tips & gratuities (standard tipping is USD 10-20 per person per day)",
      "Beverages at the camps", "Personal expenses (laundry, minibar, souvenirs, phone calls)", "Optional activities (e.g. hot air balloon safari)",
    ],
    payment: "Advance of 30%, the rest in cash on arrival. The cancellation policy of each camp and lodge applies.",
    notes: [
      "Accommodation is subject to availability. Bookings aren't confirmed until you accept this quotation, so a listed property may become fully booked in the meantime. If that happens we'll propose suitable alternatives for your approval. If you're not happy with the alternatives and we can't secure your original choice, we'll give you a full refund.",
    ],
  },
};
