import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const GradientInput = ({ placeholder, secureTextEntry, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        placeholder={placeholder}
        placeholderTextColor="#FFF"
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
    marginBottom: 40,
  },
  inputContainerFocused: {
    borderBottomColor: '#007AFF',
  },
  input: {
    height: 40,
    color: '#FFFFFF',
  },
  inputFocused: {
    color: '#FFFFFF',
  },
});

export default GradientInput;
