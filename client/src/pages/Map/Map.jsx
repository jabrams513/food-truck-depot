import React, { useRef, useEffect } from "react";
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

  // useEffect to immediately refresh vendors list on page load
  useEffect(() => {
    refetch(); // Refresh vendors list on page load
  }, [refetch]);

  useEffect(() => {
    if (!loading) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [0, 0], // World Center coordinates (longitude, latitude)
        zoom: 1, // Default zoom level (slightly zoomed out)
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
  }, [loading, vendorList]);

  return (
    <div>
      <h1>Truck Map</h1>
      <h3>Vendors Everywhere</h3>
      <div ref={mapContainer} className={styles.mapContainer}></div>
    </div>
  );
};

export default Map;
