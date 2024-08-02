// context/LoadingContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingContext = createContext();

export const useLoading = () => {
    return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            )}
        </LoadingContext.Provider>
    );
};

const styles = StyleSheet.create({
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
