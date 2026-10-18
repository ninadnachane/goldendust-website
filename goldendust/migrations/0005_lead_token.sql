-- Private link token so a guest can open their own itinerary PDF, and where the lead came from.
ALTER TABLE leads ADD COLUMN token TEXT;
ALTER TABLE leads ADD COLUMN source TEXT NOT NULL DEFAULT 'whatsapp';
