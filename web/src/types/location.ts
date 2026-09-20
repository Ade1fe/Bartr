export const NIGERIA_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
  'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
  'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
] as const;

export type NigeriaState = typeof NIGERIA_STATES[number];

// The one shape location data takes, everywhere it appears — on a user
// doc, on a listing doc, and in the Algolia sync payload. Every schema,
// type, and function touching location imports this instead of
// redeclaring its own version.
export interface GeoLocation {
  city: string;
  state: NigeriaState;
  lat: number | null;
  lng: number | null;
}