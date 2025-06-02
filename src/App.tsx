import { Routes, Route } from "react-router-dom";
import BooleanPage from "./pages/boolean_test";
import { useEffect } from "react";
import type { CSSProperties } from "react";
import Hello from "./pages/hello";
import Choice from "./pages/choice";
import GuestPage from "./pages/guest";

import Picto from "./pages/picto";
import QCM from "./pages/qcm";
import End from "./pages/end";
import Score from "./pages/result";
import Classement from "./pages/classement";

function App() {
  useEffect(() => {
    const setRealViewport = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setRealViewport();
    window.addEventListener("resize", setRealViewport);
    return () => window.removeEventListener("resize", setRealViewport);
  }, []);

  const containerStyle: CSSProperties = {
    position: "relative",
    //height: "100vh",
    height: "calc(var(--vh, 1vh) * 100)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontFamily: "sans-serif",
    overflow: "hidden",
  };
  return (
    <div style={containerStyle}>

      <Routes>
        <Route path="/" element={<Hello/>} />
        <Route path="/about" element={<>Yahouu 2</>} />
        <Route path="/choice" element={<Choice/>} />
        <Route path="/guest" element={<GuestPage/>} />
        <Route path="/hello" element={<Hello/>} />
        <Route path="/picto" element={<Picto/>} />
        <Route path="/test" element={<BooleanPage/>} />
        <Route path="/qcm" element={<QCM/>} />
        <Route path="/end" element={<End/>} />
        <Route path="/score" element={<Score/>} />
        <Route path="/classement" element={<Classement/>} />
        <Route path="*" element={<>Yahouu 3</>} />
      </Routes>
    </div>
  );
}

export default App;

// remove login, signup, only local account
