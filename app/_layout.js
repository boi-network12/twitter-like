import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import AuthProvider, { useAuth } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { AlertProvider } from "../context/AlertContext";
import { LoadingProvider } from "../context/LoadingContext";

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    });

    useEffect(() => {
        if (typeof isAuthenticated === 'undefined' || !fontsLoaded) return;

        const inApp = segments[0] === '(app)';
        if(isAuthenticated && !inApp){
          router.replace('home');
        } else if (!isAuthenticated){
          router.replace('welcome')
        }
    },[ isAuthenticated, fontsLoaded ]);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    },[fontsLoaded]);

    if (!fontsLoaded || typeof "isAuthenticated" === 'isAuthenticated') {
        return (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        );
      }

      return <Slot/>
};

const styles = StyleSheet.create({
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default function RootLayout() {
    return (
      <AuthProvider>
        <LoadingProvider>
          <ThemeProvider>
            <AlertProvider>
              <MainLayout/>
            </AlertProvider>
          </ThemeProvider>
        </LoadingProvider>
      </AuthProvider>
    );
  }
  