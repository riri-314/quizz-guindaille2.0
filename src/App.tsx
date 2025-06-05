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
import Score from "./pages/score";
import Classement from "./pages/classement";
import ProtectedRoute from "./components/ProtectedRoutes";
import Unknow from "./pages/404";
import Error from "./pages/Error";
//import { useData } from "./provider/dataProvider";

function App() {
  //const {data, loadingData} = useData();

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
        <Route path="/" element={<Hello />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/picto" element={<ProtectedRoute><Picto /></ProtectedRoute>} />
        <Route path="/test" element={<ProtectedRoute><BooleanPage /></ProtectedRoute>} />
        <Route path="/qcm" element={<ProtectedRoute><QCM /></ProtectedRoute>} />
        <Route path="/score" element={<ProtectedRoute><Score /></ProtectedRoute>} />
        <Route path="/classement" element={<ProtectedRoute><Classement /></ProtectedRoute>} />
        <Route path="/error" element={<Error />} />
        <Route path="/end" element={<End />} />
        <Route path="*" element={<Unknow/>} />
      </Routes>
    </div>
  );
}

export default App;

// loading, error, 404