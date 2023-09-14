import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { fonts } from "./fonts";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Transparent white color
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
  },
  linkText: {
    color: colors.primary,
    fontSize: 16,
  },
  content: {
    zIndex: 1,
    width: "100%",
    alignItems: "center",
  },
  heading: {
    ...fonts.heading,
    color: colors.primary,
    fontSize: 24,
    marginBottom: 16,
  },
  text: {
    ...fonts.mainText,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    width: "100%",
  },
  buttonText: {
    ...fonts.mainText,
    color: colors.white,
  },
  input: {
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    ...fonts.mainText,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  logo: {
    height: 70,
    resizeMode: "contain",
    marginBottom: 24,
  },
});
