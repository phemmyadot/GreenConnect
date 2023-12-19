import React from "react";
import { View, ActivityIndicator } from "react-native";
import { globalStyles } from "../themes/styles";

const Loader = () => {
  return (
    <View style={globalStyles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Loader;
