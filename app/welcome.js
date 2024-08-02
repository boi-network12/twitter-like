import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { ThemeContext } from '../context/ThemeContext'
import { StatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';

export default function Welcome() {
  const theme = useContext(ThemeContext);
  const router = useRouter();

  const toRegister = () => {
    router.push('register');
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]} >
      <StatusBar style='auto'/>
      <View style={styles.imgContainer}>
        <Image
          source={require("../assets/images/welcomeImg.png")}
          style={styles.img}
        />
      </View>
      <Text style={[styles.text, { color: theme.text }]} >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      </Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity 
        onPress={toRegister}
        style={[styles.btn, { backgroundColor: theme.primaryColor }]}>
          <Text style={[styles.btnText]}>get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignContent: "center",
    flex: 1,
    paddingHorizontal: 15
  },
  imgContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "60%",
  },
  img: {
    width: "70%",
    height: "70%"
  },
  text: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: hp(1.8)
  }, 
  btnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: hp(30)
  },
  btn: {
    height: hp(8),
    width: hp(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(20),
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
    fontSize: hp(2),
    color: "#f2f2f2",
    textTransform: "capitalize"
  }
})