'use client';

import { useState, useCallback } from "react";
import { useUserProfile } from "./use-user-profile";

export function useLocationFilter() {
  const { data: profile } = useUserProfile(); // assumes user profile carries city/state/lat/lng
  const [locationMode, setLocationModeState] = useState('nearby');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const setLocationMode = useCallback((mode: string) => {
    setLocationModeState(mode);
    if (mode === 'nearby' && !coords) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocationModeState('national') // permission denied — fall back gracefully, don't dead-end the UI
      );
    }
  }, [coords]);

  const geoConfig =
    locationMode === 'nearby' && coords
      ? { aroundLatLng: `${coords.lat}, ${coords.lng}`, aroundRadius: 25000 } // 25km, adjust to taste
      : locationMode === 'city' && profile?.city
      ? { facetFilters: [`city:${profile.city}`] }
      : locationMode === 'state' && profile?.state
      ? { facetFilters: [`state:${profile.state}`] }
      : {}; // national — no location constraint at all

  return { locationMode, setLocationMode, geoConfig };
}