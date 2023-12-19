import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { fonts } from "./fonts";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
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
  // @ts-expect-error TS(2322): Type '{ color: string; fontFamily: string; fontSiz... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2322): Type '{ color: string; fontFamily: string; fontSiz... Remove this comment to see the full error message
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    marginHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalClose: {
    fontSize: 16,
    color: "#007BFF",
  },
});
