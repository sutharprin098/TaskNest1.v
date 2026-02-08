'use client';

import { useState, useRef, useEffect } from 'react';

interface LocationMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  initialLat?: number;
  initialLng?: number;
  initialAddress?: string;
}

export default function LocationMap({
  onLocationSelect,
  initialLat = 28.7041,
  initialLng = 77.1025,
  initialAddress = '',
}: LocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [latitude, setLatitude] = useState(initialLat);
  const [longitude, setLongitude] = useState(initialLng);
  const [address, setAddress] = useState(initialAddress);
  const [mapLoaded, setMapLoaded] = useState(false);

  const initialized = useRef(false);

  useEffect(() => {
    const initMap = async () => {
      if (typeof window === 'undefined' || !mapContainer.current || initialized.current) return;

      try {
        const L = (await import('leaflet')).default;

        // Fix icon issue
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });

        const newMap = L.map(mapContainer.current).setView([initialLat, initialLng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(newMap);

        const newMarker = L.marker([initialLat, initialLng], {
          draggable: true,
        }).addTo(newMap);

        // Handle map clicks
        newMap.on('click', (e: any) => {
          const { lat, lng } = e.latlng;
          setLatitude(lat);
          setLongitude(lng);
          newMarker.setLatLng([lat, lng]);
          const coordAddress = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          setAddress(coordAddress);
          onLocationSelect(lat, lng, coordAddress);
        });

        // Handle marker drag
        newMarker.on('dragend', () => {
          const newLatLng = newMarker.getLatLng();
          setLatitude(newLatLng.lat);
          setLongitude(newLatLng.lng);
          const coordAddress = `${newLatLng.lat.toFixed(4)}, ${newLatLng.lng.toFixed(4)}`;
          setAddress(coordAddress);
          onLocationSelect(newLatLng.lat, newLatLng.lng, coordAddress);
        });

        mapInstance.current = newMap;
        initialized.current = true;
        setMapLoaded(true);
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapLoaded(true);
      }
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        try {
          mapInstance.current.remove();
        } catch (e) {
          console.error('Error removing map:', e);
        }
        mapInstance.current = null;
      }
    };
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    onLocationSelect(latitude, longitude, newAddress);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          setLatitude(lat);
          setLongitude(lng);
          const coordAddress = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          setAddress(coordAddress);

          if (mapInstance.current) {
            mapInstance.current.setView([lat, lng], 13);
            mapInstance.current.eachLayer((layer: any) => {
              if (layer.setLatLng) {
                layer.setLatLng([lat, lng]);
              }
            });
          }

          onLocationSelect(lat, lng, coordAddress);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    }
  };

  return (
    <div className="w-full space-y-4">
      <style>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css');
      `}</style>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium flex items-center gap-2"
        >
          📍 Current Location
        </button>
      </div>

      {!mapLoaded && (
        <div className="w-full h-80 rounded-lg border-2 border-gray-300 shadow-md bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600 font-semibold">Loading map...</p>
        </div>
      )}

      <div
        ref={mapContainer}
        className="w-full h-80 rounded-lg border-2 border-gray-300 shadow-md overflow-hidden"
        style={{ display: mapLoaded ? 'block' : 'none' }}
      />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          📍 Coordinates:
        </label>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-gray-100 rounded border border-gray-300">
            <div className="text-xs text-gray-600">Latitude</div>
            <div className="font-semibold">{latitude.toFixed(4)}</div>
          </div>
          <div className="p-2 bg-gray-100 rounded border border-gray-300">
            <div className="text-xs text-gray-600">Longitude</div>
            <div className="font-semibold">{longitude.toFixed(4)}</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Address:
        </label>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Click on map or drag marker to select, or type address"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
        />
      </div>
    </div>
  );
}
