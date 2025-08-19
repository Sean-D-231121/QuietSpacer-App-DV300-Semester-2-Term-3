import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";

type Props = {
  visible: boolean;
  marker: any | null;
  onClose: () => void;
  navigation: any;
};

const MarkerDetailsModal = ({
  visible,
  marker,
  onClose,
  navigation,
}: Props) => {
  if (!marker) return null;

  const displayTitle =
    marker.title?.trim() || marker.name?.trim() || "Untitled";

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={onClose}
        >
          <TouchableOpacity activeOpacity={1} style={styles.content}>
            {marker.image_url ? (
              <Image source={{ uri: marker.image_url }} style={styles.image} />
            ) : null}
            <Text style={styles.title}>{displayTitle}</Text>
            {marker.description ? (
              <Text style={styles.description}>{marker.description}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onClose();
                navigation.navigate("PlaceDetails", { marker });
              }}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <Text style={{ color: "#999", marginTop: 10 }}>Close</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MarkerDetailsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  image: { width: 200, height: 200, borderRadius: 10, marginBottom: 15 },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#455A64",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
