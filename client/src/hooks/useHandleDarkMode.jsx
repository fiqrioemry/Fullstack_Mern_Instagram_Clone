import { useEffect, useState } from "react";

const useHandleDarkMode = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const handleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    localStorage.setItem("darkMode", JSON.stringify(isDark));
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  console.log("tes");
  return { handleDarkMode, darkMode };
};

export default useHandleDarkMode;
