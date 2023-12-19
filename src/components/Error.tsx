import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { globalStyles } from "../themes/styles";

const ErrorModal = ({
  visible,
  message,
  onClose,
}: {
  visible: boolean;
  message: string;
  onClose: () => void;
}) => {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={globalStyles.modalContainer}>
        <View style={globalStyles.modalContent}>
          <Text style={globalStyles.modalMessage}>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={globalStyles.modalClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
