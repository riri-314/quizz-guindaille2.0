import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Arrow from "../components/Arrow";
import Logos from "../components/Logos";
import { useData } from "../provider/dataProvider";
import { useUser } from "../provider/userData";

export default function BooleanPage() {
  const navigate = useNavigate();
  const { data } = useData();
  const { updateUserData, userData } = useUser();
  const location = useLocation();
  const { index } = location.state || { index: 0 }; // Default to 0 if index is not provided
  const [pictos, setPictos] = useState<any[]>([]);

  const [buttonState, setButtonState] = useState<"idle" | "loading" | "done">(
    "idle"
  );

  useEffect(() => {
    if (
      data &&
      typeof data === "object" &&
      data.pictos &&
      typeof data.pictos === "object" &&
      !Array.isArray(data.pictos)
    ) {
      const pictosArray = Object.values(data.pictos);
      // Only update state if data has changed
      setPictos((prev) => {
        const prevString = JSON.stringify(prev);
        const nextString = JSON.stringify(pictosArray);
        return prevString !== nextString ? pictosArray : prev;
      });
    }
    if (userData.progress && userData.progress[index]) {
      setButtonState("done");
    }
  }, [data]);

  function handleClick(index: number) {
    if (buttonState !== "idle") return;
    setButtonState("loading");
    updateUserData({
      progress: {
        ...userData.progress,
        [index]: true,
      },
    });
    setButtonState("done");
  }

  function next() {
    if (index + 1 < pictos.length) {
      // reset some states
      if (userData.progress && userData.progress[index + 1]) {
        setButtonState("done");
      } else {
        setButtonState("idle");
      }
      navigate("/test", {
        state: {
          index: index + 1,
        },
      });
    } else {
      navigate("/test", {
        state: {
          index: 0,
        },
      });
    }
  }

  function about() {
    navigate("/end");
  }

  const loaderStyle: CSSProperties = {
    width: "1.2rem",
    height: "1.2rem",
    border: "3px solid rgba(255, 255, 255, 0.4)",
    borderTop: "3px solid white",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  };

  const buttonText = {
    idle: "Fait",
    loading: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <div style={loaderStyle}></div>
        <span>Chargement...</span>
      </div>
    ),
    done: "Validé 🎉",
  };

  const contentStyle: CSSProperties = {
    position: "relative",
    maxWidth: "400px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const bubbleStyle: CSSProperties = {
    width: "21rem",
    height: "21rem",
    position: "relative",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const bubbleImageStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    position: "absolute" as const,
    top: 0,
    left: 0,
    opacity: 0.2,
  };

  const textOverlayStyle: CSSProperties = {
    fontFamily: "funny",
    position: "relative",
    zIndex: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: "1.4rem",
    lineHeight: 1.5,
    padding: "1rem",
    textShadow: "3px 3px 0px black",
  };

  const buttonStyle: CSSProperties = {
    fontFamily: "funny",
    marginTop: "2rem",
    fontSize: "1.4rem",
    width: "16rem",
    height: "4rem",
    background:
      buttonState === "done"
        ? "linear-gradient(135deg,rgb(31, 160, 117), #34d399)"
        : "linear-gradient(135deg, #3b82f6, #60a5fa)",
    color: "white",
    fontWeight: "bold",
    padding: "0.75rem",
    //padding: "0.5rem 2rem",
    border: "none",
    borderRadius: "999px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: buttonState === "done" ? "default" : "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <Arrow path="/picto" />

      <div style={contentStyle}>
        <div style={bubbleStyle}>
          <img
            src={`/pictos/picto${index}.png`}
            alt="Recap illustration"
            style={bubbleImageStyle}
          />
          <div style={textOverlayStyle}>
            <p>{pictos[index] ? pictos[index].question : "Chargement..."}</p>
          </div>
        </div>

        <button
          style={buttonStyle}
          onClick={() => handleClick(index)}
          disabled={buttonState !== "idle"}
        >
          {buttonText[buttonState]}
        </button>

        {buttonState === "done" && (
          <>
            <div
              style={{
                fontFamily: "funny",
                marginTop: "1rem",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#fff",
                animation: "fadeInUp 0.8s ease-out forwards",
                cursor: "pointer",
              }}
              onClick={() => about()} // ← Change this if needed
            >
              En savoir plus
            </div>
            <div
              style={{
                fontFamily: "funny",
                marginTop: "1rem",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#fff",
                animation: "fadeInUp 0.8s ease-out forwards",
                cursor: "pointer",
              }}
              onClick={() => next()} // ← Change this if needed
            >
              Suivant →
            </div>
          </>
        )}
      </div>

      <Logos />
    </div>
  );
}
