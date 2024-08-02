import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard, View } from 'react-native';

const CustomKeyboardView = ({ children, style, backgroundColor, alignItems, gap }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, style, { backgroundColor, alignItems, gap }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CustomKeyboardView;
