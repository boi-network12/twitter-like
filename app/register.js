import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import CustomKeyboardView from '../components/customeKeyboard';
import { ThemeContext } from '../context/ThemeContext';
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from 'expo-router';
import { useLoading } from "../context/LoadingContext"
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const theme = useContext(ThemeContext);
  const nameInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const navigateLogin = () => {
    router.push('login')
  }

  const handleSignup = async () => {
    if(!name.match(/^[a-zA-Z]+$/)){
      setError('Name must only contain letters.');
      return;
    }

    if(password.length < 6){
      setError('Password must be at least 6 characters long.');
      return;
    }

    // if all validation pass, proceed  with signup logic
    setIsLoading(true);
    try {
      setError('');
      await register( name, username, email, password );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Failed to register. please check your credentials and try again')
    }

    // Add my signup logic here 
  }

  return (
    <CustomKeyboardView 
      backgroundColor={theme.background}
      style={[styles.container]}>
      <StatusBar style='auto' backgroundColor={theme.background}/>
      <Text style={[styles.h1, { color: theme.primaryColor }]}>create account</Text>
      <Text style={[styles.p, { color: theme.text }]}>
        create an account so you can explore all the existing jobs
      </Text>
      {error ? 
          <Text style={styles.errorText}>{error}</Text> : null
      }
      <TextInput
        ref={nameInputRef}
        style={[styles.input, { backgroundColor: theme.inputBg, color: theme.inputText }]}
        placeholder='Name'
        value={name}
        onChangeText={setName}
        returnKeyType="next"
        selectionColor={theme.text}
        selectTextOnFocus
        onSubmitEditing={() => usernameInputRef.current.focus()}
      />
      <TextInput
        ref={usernameInputRef}
        style={[styles.input, { backgroundColor: theme.inputBg, color: theme.inputText }]}
        placeholder='@Username'
        value={username}
        onChangeText={setUsername}
        returnKeyType="next"
        selectionColor={theme.text}
        selectTextOnFocus
        onSubmitEditing={() => emailInputRef.current.focus()}
      />
      <TextInput
        ref={emailInputRef}
        style={[styles.input, { backgroundColor: theme.inputBg, color: theme.inputText }]}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        returnKeyType="next"
        selectionColor={theme.text}
        selectTextOnFocus
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />
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
        onPress={handleSignup}
        disabled={isLoading}
        >
        {isLoading ? <ActivityIndicator color={"#fff"}/> : 
        <Text style={[styles.btnText]}>Sign up</Text> 
        }
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={navigateLogin}>
        <Text style={[styles.p, { color: theme.text }]}>Already have an account? Login</Text>
      </TouchableWithoutFeedback>
    </CustomKeyboardView>
  );
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
