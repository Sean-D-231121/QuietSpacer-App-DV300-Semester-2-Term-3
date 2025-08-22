import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  search: string;
  setSearch: (val: string) => void;
  handleSearch: () => void;
  openAddPlace: () => void;
  keyboardHeight: Animated.Value;
};

const SearchBar = ({
  search,
  setSearch,
  handleSearch,
  openAddPlace,
  keyboardHeight,
}: Props) => {
  return (
    <Animated.View style={[styles.container, { bottom: keyboardHeight }]}>
      <TextInput
        placeholder="Where to?"
        style={styles.input}
        placeholderTextColor="#333"
        value={search}
        onChangeText={setSearch}
        returnKeyType="search"
        onSubmitEditing={handleSearch} 
        blurOnSubmit={true} 
      />
    </Animated.View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: "#fdf5e6",
    borderRadius: 25,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#add8e6",
    borderRadius: 25,
    flex: 1,
    height: 40,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
  },
  button: {
    backgroundColor: "#455A64",
    padding: 10,
    borderRadius: 25,
    marginRight: 8,
  },
});
