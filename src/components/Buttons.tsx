import { TouchableOpacity, Text, View } from "react-native";
import { globalStyles } from "../themes/styles";
import React from "react";

interface Props {
  text: string;
  onPressed?: () => void;
}

export const PrimaryButton: React.FC<Props> = ({ text, onPressed }) => {
  return (
    <TouchableOpacity style={globalStyles.button} onPress={onPressed}>
      <Text style={globalStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const DisabledButton: React.FC<Props> = ({ text }) => {
  return (
    <View style={[globalStyles.button, globalStyles.disabledButton]}>
      <Text style={globalStyles.buttonText}>{text}</Text>
    </View>
  );
};
