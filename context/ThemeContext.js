import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { lightenColor } from "../utils/colorUtils";

const ThemeContext = createContext();

const themes = {
  dark: {
    background: "#121212",
    primaryColor: "#3D3050",
    inputBg: lightenColor("#3D3050", 0.3),
    inputText: "#ddd",
    text: "#f2f2f2",
    btnShadow: "rgba(0,0,0,0)"
  },
  light: {
    background: "#f2f2f2",
    primaryColor: "#3D3050",
    inputBg: lightenColor("#3D3050", 0.5),
    inputText: "#444",
    text: "#333",
    btnShadow: "rgba(0,0,0,0)"
  },
};

const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(themes[colorScheme]);

  useEffect(() => {
    setTheme(themes[colorScheme]);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
