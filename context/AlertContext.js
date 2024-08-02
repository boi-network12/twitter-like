import React, { createContext, useContext, useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from './ThemeContext';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const theme = useContext(ThemeContext);

  const showAlert = (type, title, message, onOk, onCancel) => {
    setAlert({ type, title, message, onOk, onCancel });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!alert}
          onRequestClose={hideAlert}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.alertContainer, { backgroundColor: theme.background }]}>
              <Text style={[styles.alertTitle, { color: theme.text }]}>{alert.title}</Text>
              <Text style={[styles.alertMessage, { color: theme.text }]}>{alert.message}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    alert.onCancel && alert.onCancel();
                    hideAlert();
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    alert.onOk && alert.onOk();
                    hideAlert();
                  }}
                >
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});
