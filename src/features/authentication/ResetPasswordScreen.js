import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { globalStyles } from "../../themes/styles";

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = () => {
    // Add logic to handle password reset
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleResetPassword}
      >
        <Text style={globalStyles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;
