-- Migration: 004_update_properties_constraints.sql
-- Update properties status and property_type check constraints to align with forms and application values

-- Drop existing check constraints if they exist
ALTER TABLE properties DROP CONSTRAINT IF EXISTS properties_status_check;
ALTER TABLE properties DROP CONSTRAINT IF EXISTS properties_property_type_check;

-- Add updated check constraints
ALTER TABLE properties ADD CONSTRAINT properties_status_check
  CHECK (status IN (
    'available',
    'rented',
    'under-maintenance',
    'ready',
    'off-plan',
    'repossessed',
    'for-sale',
    'sold'
  ));

ALTER TABLE properties ADD CONSTRAINT properties_property_type_check
  CHECK (property_type IN (
    'residential',
    'commercial',
    'land',
    'apartment',
    'house',
    'penthouse',
    'bedsitter',
    'studio',
    'townhouse',
    'villa'
  ));
