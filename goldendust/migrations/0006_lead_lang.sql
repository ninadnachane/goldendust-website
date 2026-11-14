-- Website language the guest used (en, nl, de, fr, it, es), so the guide can reply in it.
ALTER TABLE leads ADD COLUMN lang TEXT NOT NULL DEFAULT 'en';
