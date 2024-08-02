import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import CustomKeyboardView from '../components/customeKeyboard';
import { ThemeContext } from '../context/ThemeContext';
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from 'expo-router';
import { useLoading } from '../context/LoadingContext';

export default function Login() {
  const theme = useContext(ThemeContext);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigateRegister = () => {
    router.push('register');
  };

  const handleLogin = async () => {
    if (!email.match(/^\S+@\S+\.\S+$/) && !email.match(/^\S+$/)) {
      setError('Please enter a valid email or username.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // If all validations pass, proceed with login logic
    setError('');
    setIsLoading(true);
    // Add your login logic here
      try {
      await login(emailOrUsername, password);
      setIsLoading(false);
      } catch (err) {
          // Handle any errors here, if needed
      } 
  };

  return (
    <CustomKeyboardView 
      backgroundColor={theme.background}
      style={[styles.container]}>
      <StatusBar style='auto' backgroundColor={theme.background}/>
      <Text style={[styles.h1, { color: theme.primaryColor }]}>Login here</Text>
      <Text style={[styles.p, { color: theme.text }]}>
        Welcome back, we have been missing you 
      </Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        ref={emailInputRef}
        style={[styles.input, { backgroundColor: theme.inputBg, color: theme.inputText }]}
        placeholder='Email or Username'
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        returnKeyType="next"
        selectionColor={theme.text}
        selectTextOnFocus
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />
      <TouchableOpacity style={{ width: "100%" }}>
        <Text style={[styles.forgetPassword, { color: theme.primaryColor }]}>
          Forget password?
        </Text>
      </TouchableOpacity>
      <TextInput
        ref={passwordInputRef}
        style={[styles.input, { backgroundColor: theme.inputBg, color: theme.inputText }]}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        selectionColor={theme.text}
        selectTextOnFocus
        secureTextEntry={true}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: theme.primaryColor }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? 
        <ActivityIndicator color={"#fff"}/> :
        <Text style={[styles.btnText]}>Sign in</Text>
      }
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={navigateRegister}>
        <Text style={[styles.p, { color: theme.text }]}>Don't have an account? Sign up</Text>
      </TouchableWithoutFeedback>
    </CustomKeyboardView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center"
  },
  h1: {
    fontSize: hp(3.5),
    fontFamily: "Roboto-Bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  p: {
    fontSize: hp(1.5),
    fontFamily: "Roboto-Bold",
    textTransform: "capitalize",
    textAlign: "center",
    marginVertical: hp(3)
  },
  forgetPassword: {
    fontSize: hp(1.5),
    fontFamily: "Roboto-Bold",
    textTransform: "capitalize",
    textAlign: "right",
    marginBottom: hp(1.5)
  },
  input: {
    marginBottom: hp(3),
    height: hp(7.6),
    paddingHorizontal: hp(2),
    fontFamily: "Roboto-Regular",
    borderRadius: hp(0.8),
    fontSize: hp(1.5),
    width: "100%",
    // Box shadow for iOS
    shadowColor: '#3D3050',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Box shadow for Android
    elevation: 5,
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: hp(30)
  },
  btn: {
    height: hp(8),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(0.8),
    // Box shadow for iOS
    shadowColor: '#3D3050',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Box shadow for Android
    elevation: 5,
  },
  btnText: {
    fontFamily: "Roboto-Bold",
    textAlign: "center",
    fontSize: hp(2.5),
    color: "#f2f2f2",
    textTransform: "capitalize"
  },
  errorText: {
    color: 'red',
    marginBottom: hp(2),
    textAlign: 'center',
    fontFamily: "Roboto-Regular",
    fontSize: hp(1.5),
  },
});
