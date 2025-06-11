import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import Arrow from "../components/Arrow";
import Logos from "../components/Logos";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase_config";
import { useUser } from "../provider/userData";

export default function GuestPage() {
  const navigate = useNavigate();
  const [nickename, setNickname] = useState("");
  const [error, setError] = useState("");
  const [buttonState, setButtonState] = useState<"idle" | "loading" | "done">(
    "idle"
  );
  const { updateUserData } = useUser();

  const handleSignup = async () => {
    if (!nickename) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (buttonState !== "idle") return;

    setButtonState("loading");
    setError("");

    try {
      // Anonymous sign-in
      const result = await signInAnonymously(auth);
      const uid = result.user.uid;
      console.log("Anonymous user signed in with UID:", uid);

      updateUserData({
        uid,
        nickname: nickename,
        progress: {},
      });

      // Proceed to next step
      setButtonState("done");
      console.log("Logged in with", nickename);
      navigate("/choice");
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Erreur lors de la connexion. Veuillez réessayer.");
      setButtonState("idle");
    }
  };

  const loaderStyle: CSSProperties = {
    width: "1.2rem",
    height: "1.2rem",
    border: "3px solid rgba(255, 255, 255, 0.4)",
    borderTop: "3px solid white",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  };

  const buttonText = {
    idle: "Continuer",
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "2rem",
        fontFamily: "sans-serif",
        color: "white",
        textAlign: "center",
      }}
    >
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
      <Arrow path="/" />
      <h1
        style={{
          fontFamily: "funny",

          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          textShadow: "2px 2px 4px black",
        }}
      >
        Choisis un surnom
      </h1>
      <h1
        style={{
          fontFamily: "funny",
          fontSize: "1rem",
          marginBottom: "2rem",
          lineHeight: 1.5,
        }}
      >
        Tu joues seul ou en groupe ? Mets ton prénom, un surnom ou même le nom
        de ton kot !
      </h1>
      <div
        style={{
          width: "16rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="username"
          placeholder="Surnom"
          value={nickename}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={10}
          style={{
            padding: "0.75rem",
            marginBottom: "1rem",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />

        {error && (
          <div
            style={{
              color: "#f87171",
              marginBottom: "1rem",
              maxWidth: "300px",
              width: "100%",
              fontSize: "0.9rem",
              textAlign: "center",
              wordWrap: "break-word",
            }}
          >
            {error}
          </div>
        )}
        <button
          onClick={handleSignup}
          disabled={buttonState !== "idle"}
          style={{
            fontFamily: "funny",

            background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "999px",
            border: "none",
            marginBottom: "0.75rem",
            width: "100%",
            maxWidth: "300px",
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            cursor: buttonState === "done" ? "default" : "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {buttonText[buttonState]}
        </button>
      </div>

      <Logos />
    </div>
  );
}
