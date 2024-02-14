import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Map.module.css";
import { vendors } from "../Home/Home.jsx";

mapboxgl.accessToken = REACT_APP_MAP_BOX_API;
/* ("pk.eyJ1IjoiamFicmFtczUxMyIsImEiOiJjbHNpNGhoenoyNHM0MmpzNG50ZGw4eWF0In0.QtyIw-zXHg6o5pDjLHBZvA");
 */
const Map = () => {
  const mapContainer = useRef(null);
  const markers = useRef({});

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128], // NYC coordinates (longitude, latitude)
      zoom: 10, // Default zoom level (slightly zoomed out)
    });

    map.on("load", () => {
      // Add markers for each vendor
      vendors.forEach((vendor) => {
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
        const vendor = vendors.find(
          (vendor) => vendor.vendorName === vendorName
        );
        if (vendor) {
          marker.setLngLat([vendor.longitude, vendor.latitude]);
        }
      });
    });

    // Cleanup
    return () => map.remove();
  }, []);

  return (
    <div>
      <h1>Truck Map</h1>
      <h3>Vendors Everywhere</h3>
      <div ref={mapContainer} className={styles.mapContainer}></div>
    </div>
  );
};

export default Map;
