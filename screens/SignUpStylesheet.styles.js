import { StyleSheet } from "react-native";
const SignUpstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf5e6",
    alignItems: "center",
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 26,
    fontWeight: "600",
    fontFamily: "serif",
    marginTop: 10,
  },
  avatar: {
    backgroundColor: "#add8e6",
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  form: {
    width: "80%",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    backgroundColor: "#add8e6",
    borderRadius: 25,
    height: 45,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  buttonCircle: {
    backgroundColor: "#5f636d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  swipeButton: {
    marginTop: 30,
    backgroundColor: "#add8e6",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  swipeThumb: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  swipeText: {
    fontSize: 16,
    color: "#5f636d",
    fontWeight: "bold",
  },
  swipeWrapper: {
    marginTop: 30,
  },
});
export default SignUpstyles;
