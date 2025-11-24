"use client";

import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  className?: string;
  height?: string;
  width?: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function GoogleMap({ 
  className = "", 
  height = "400px", 
  width = "100%" 
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCfQCOa_0xWNuWPCc6RWetNgSzshZYPvW0&callback=initMap`;
      script.async = true;
      script.defer = true;

      // Set up callback
      window.initMap = initializeMap;

      // Add script to document
      document.head.appendChild(script);

      // Cleanup function
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
        if ('initMap' in window) {
          delete (window as any).initMap;
        }
      };
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      // Villianur, Pondicherry coordinates
      const villianurLocation = {
        lat: 11.9416, // Latitude for Villianur, Pondicherry
        lng: 79.8083  // Longitude for Villianur, Pondicherry
      };

      // Create map
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: villianurLocation,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "weight": "2.00"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#9c9c9c"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "color": "#f2f2f2"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 45
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#7b7b7b"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "color": "#46bcec"
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#c8d7d4"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#070707"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          }
        ]
      });

      // Create custom marker
      const marker = new window.google.maps.Marker({
        position: villianurLocation,
        map: map,
        title: 'SIDAZ - Villianur, Pondicherry',
        animation: window.google.maps.Animation.DROP,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C11.6 2 8 5.6 8 10C8 16 16 30 16 30S24 16 24 10C24 5.6 20.4 2 16 2Z" fill="#8B5CF6"/>
              <circle cx="16" cy="10" r="4" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 32)
        }
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #8B5CF6; font-size: 16px;">SIDAZ</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">Villianur, Pondicherry</p>
            <p style="margin: 4px 0 0 0; color: #888; font-size: 12px;">Design & Engineering Solutions</p>
          </div>
        `
      });

      // Add click listener to marker
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      // Store map instance
      mapInstanceRef.current = map;
    };

    loadGoogleMaps();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <div 
        ref={mapRef} 
        style={{ height, width }}
        className="w-full"
      />
    </div>
  );
}
