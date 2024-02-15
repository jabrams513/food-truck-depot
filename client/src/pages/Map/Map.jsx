import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Map.module.css";
import { QUERY_FOOD_TRUCKS } from "../../utils/queries.js";
import { useQuery } from "@apollo/client";

mapboxgl.accessToken = REACT_APP_MAP_BOX_API;

const Map = () => {
  const mapContainer = useRef(null);
  const markers = useRef({});
  const { loading, data, refetch } = useQuery(QUERY_FOOD_TRUCKS);
  const vendorList = data?.foodTrucks || [];
  const [userLocation, setUserLocation] = useState(null);

  // Fetch user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Set user's location if available
        setUserLocation([position.coords.longitude, position.coords.latitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  // Refresh vendors list on page load
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Initialize map
  useEffect(() => {
    if (!loading) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: userLocation || [0, 0], // Center the map on user's location if available, else on world center
        zoom: userLocation ? 10 : 1, // Set zoom level to 10 if user's location is available, else to 1
      });

      map.on("load", () => {
        // Add markers for each vendor
        vendorList.forEach((vendor) => {
          const el = document.createElement("div");
          el.className = styles.marker;

          const label = document.createElement("div");
          label.className = styles.label;
          label.textContent = vendor.vendorName;
          el.appendChild(label);

          const marker = new mapboxgl.Marker(el)
            .setLngLat([vendor.longitude, vendor.latitude])
            .addTo(map);

          // Store marker reference
          markers.current[vendor.vendorName] = marker;
        });
      });

      map.on("move", () => {
        // Update marker positions when the map moves
        Object.entries(markers.current).forEach(([vendorName, marker]) => {
          const vendor = vendorList.find(
            (vendor) => vendor.vendorName === vendorName
          );
          if (vendor) {
            marker.setLngLat([vendor.longitude, vendor.latitude]);
          }
        });
      });

      // Cleanup
      return () => map.remove();
    }
  }, [loading, vendorList, userLocation]);

  return (
    <div>
      <h1>Truck Map</h1>
      <h3>Vendors Everywhere</h3>
      <div ref={mapContainer} className={styles.mapContainer}></div>
    </div>
  );
};

export default Map;
