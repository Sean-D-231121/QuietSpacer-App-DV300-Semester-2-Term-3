import React from "react";
import { Marker } from "react-native-maps";
import { Image } from "react-native";

interface MarkerData {
  id: string | number;
  latitude?: number;
  longitude?: number;
  lat?: number;
  long?: number;
  title?: string;
  name?: string;
}

interface MapMarkersProps {
  predefinedMarkers: MarkerData[];
  customMarkers: MarkerData[];
  dbMarkers: MarkerData[];
  setSelectedMarker: (marker: MarkerData) => void;
  setDetailsModalVisible: (visible: boolean) => void;
}

export default function MapMarkers({
  predefinedMarkers,
  customMarkers,
  dbMarkers,
  setSelectedMarker,
  setDetailsModalVisible,
}: MapMarkersProps) {
  const renderMarker = (marker: MarkerData, key: string) => (
    <Marker
      key={key}
      coordinate={{
        latitude: marker.latitude ?? marker.lat ?? 0,
        longitude: marker.longitude ?? marker.long ?? 0,
      }}
      title={marker.title || marker.name}
      onPress={() => {
        setSelectedMarker(marker);
        setDetailsModalVisible(true);
      }}
    >
      <Image
        source={require("../assets/Pin.png")}
        style={{ width: 28, height: 35, resizeMode: "contain" }}
      />
    </Marker>
  );

  return (
    <>
      {predefinedMarkers.map((m) => renderMarker(m, `pre-${m.id}`))}
      {customMarkers.map((m) => renderMarker(m, `custom-${m.id}`))}
      {dbMarkers.map((m) => renderMarker(m, `db-${m.id}`))}
    </>
  );
}
