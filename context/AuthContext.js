import React, { createContext, useContext, useEffect, useState } from "react";
const cl = console.log.bind(console);
const ce = console.error.bind(console);
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const SERVER_URL = 'http://192.168.244.4:5000';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    const storeTokenAndUserId = async (token, userId) => {
        try {
            if(token){
                await AsyncStorage.setItem('token', token);
            }
            if(userId){
                await AsyncStorage.setItem('userId', userId);
            }
        } catch (error) {
            ce('Error storing token and userId:', error);
        }
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem('token');
                cl('Fetched Token: ', token);

                const userId = await AsyncStorage.getItem('userId');
                cl('Fetched UserId: ', userId);

                if (token) {
                    const response = await fetch(`${SERVER_URL}/api/users/me`, {
                        headers: { 'Authorization': `Bearer ${token}`},
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                        setIsAuthenticated(true);
                    }
                } else {
                    setIsAuthenticated(false);
                }

            } catch (error) {
                console.error('Failed to check auth status:', error);
                setIsAuthenticated(false);
            } finally{
                setLoading(false);
            }
        };

        checkAuthStatus();
    },[]);

    const login = async (emailOrUsername, password) => {
        try {
            const response = await fetch(`${SERVER_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailOrUsername, password }),
            });

            if(!response.ok) throw new Error('Login failed')

                const data = await response.json();
                await storeTokenAndUserId(data.token, data.user.id);
                const userResponse = await fetch(`${SERVER_URL}/api/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${data.token}`,
                    }
                });

                if(userResponse.ok){
                    const userData = await userResponse.json();
                    setUser(userData);
                    setIsAuthenticated(true);
                } else {
                    throw new Error('Failed to fetch user data');
                }
        } catch (error) {
            ce('Login errors: ', error.msg);
            throw error;
        }
    };

    // Register function
    const register = async (name, email, username, password) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Registration error');
            }

            const data = await response.json();
            setUser(data.user);
            // Optionally, handle the token if returned

        } catch (err) {
            setError(err.message);
            ce(err.msg)
        }
    };
    

    const logout = async () => {
        setLoading(true);
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userId');
            setUser(null);
            setIsAuthenticated(false);
            setLoading(false);
        } catch (error) {
            ce('Logout error: ', error);
        }
    };

    const changeEmail = async (newEmail, currentPassword) => {
        try {
            const token = await AsyncStorage.getItem('token');

            if(!token) throw new Error('No Token available');

            const response = await fetch(`${SERVER_URL}/api/users/updateEmail`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newEmail, currentPassword })
            });

            const data = await response.json();

            if(response.ok){
                cl('Email change successfully: ', data);
            } else {
                throw new Error(data.msg || 'Something went wrong')
            }
        } catch (error) {
            throw new Error('Network error: ' + error.msg);
        }
    }

    const refreshToken = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (refreshToken) {
                const response = await fetch(`${SERVER_URL}/refresh-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refreshToken }),
                });
                if (!response.ok) {
                    throw new Error('Refresh token failed');
                  }
                  const data = await response.json();
                  await storeTokenAndUserId(data.token, data.user.id);
            } else {
                throw new Error('No refresh token available');
            }
        } catch (error) {
            ce('Refresh token error: ', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await fetch(`${SERVER_URL}/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Delete user failed');
          }
      
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('userId');
          setUser(null);
          setIsAuthenticated(false);
        } catch (error) {
          console.error('Delete User error', error);
          throw error;
        }
    };

    const changePassword = async ( currentPassword, newPassword ) => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) throw new Error('No token available');

            const response = await fetch(`${SERVER_URL}/api/users/changePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                cl('Password change successfully: ', data);
            } else {
                throw new Error(data.msg || 'something went wrong');
            }
        } catch (error) {
            throw new Error('Network error: ' + error.msg);
        }
    };

    const forgetPassword = async (email) => {
        try {
            const response = await fetch(`${SERVER_URL}/api/users/forget-password`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email })
            });
        
            const data = await response.json();
        
            if (response.ok) {
              console.log('OTP sent successfully');
              // Optionally, handle success actions like showing a confirmation message
            } else {
              throw new Error(data.message || 'Failed to send OTP');
            }
        
          } catch (error) {
            throw new Error('Network error: ' + error.message);
          }
    };

    const verifyOtpAndResetPassword = async (email, otp, newPassword) => {
        try {
            const response = await fetch(`${SERVER_URL}/api/users/verifyOtpAndResetPassword`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, otp, newPassword })
            });
        
            const data = await response.json();
        
            if (response.ok) {
              console.log('Password reset successfully');
              // Optionally, handle success actions like redirecting to login screen
            } else {
              throw new Error(data.message || 'Failed to reset password');
            }
        
          } catch (error) {
            throw new Error('Network error: ' + error.message);
          }
    };

    
    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            register,
            refreshToken,
            setIsAuthenticated,
            setUser,
            deleteUser,
            changeEmail,
            changePassword,
            forgetPassword,
            verifyOtpAndResetPassword,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;