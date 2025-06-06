import { useEffect, useState, type CSSProperties } from "react";
import { FixedSizeList as List } from "react-window";
import universSante from "/univers-sante.png";
import guindaille from "/guindaille.png";
import { useNavigate, useLocation } from "react-router-dom";
import Arrow from "../components/Arrow";
import { useData } from "../provider/dataProvider";
import { db } from "../firebase_config";
import { doc, updateDoc } from "firebase/firestore/lite";
import { useUser } from "../provider/userData";

export default function Classement() {
  const { data } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const { score, question, timeDiff } = location.state || {};
  //console.log("Score:", score, "Question:", question, "Time diff:", timeDiff);
  const [sortedScores, setSortedScores] = useState<any[]>([]);
  const [personalScore, setPersonalScore] = useState<number>(0);
  const [publishScore, setPublishScore] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { userData } = useUser();

  type ScoreData = Record<string, number>;

  function sortScores(data: ScoreData) {
    try {
      if (typeof data !== "object" || data === null)
        throw new Error("Data is not a valid object");

      const entries = Object.entries(data).filter(
        ([key, value]) =>
          typeof key === "string" &&
          typeof value === "number" &&
          Number.isFinite(value)
      );

      if (entries.length === 0) throw new Error("No valid entries to sort");

      const sorted = entries
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
        .map(([name, score], index) => ({
          position: index + 1,
          name,
          score,
        }));

      return sorted;
    } catch (e) {
      console.warn("sortScores failed:", e);
      return [
        {
          position: 1,
          name: userData.nickname || "anonymous",
          score: finalScore(),
        },
      ];
    }
  }

  function finalScore() {
    const accuracy = score / question + 1;
    const rawScore = accuracy * (100000 / timeDiff);
    const intScore = Math.round(rawScore * 100000);
    //console.log("Final score:", intScore);
    return intScore;
  }

  function getPositionFor(
    data: any[],
    targetName: string,
    targetScore: number
  ): number | null {
    const entry = data.find(
      (item) => item.name === targetName && item.score === targetScore
    );
    return entry ? entry.position : null; // null if not found
  }

  useEffect(() => {
    try {
      let classement = data?.classement;
      const personalScore = finalScore();
      classement[userData.nickname || "anonymous"] = personalScore; // Add personal score to classement
      const sortedClassement: any = sortScores(classement);
      const myIndex = getPositionFor(
        sortedClassement,
        userData.nickname || "anonymous",
        personalScore
      );
      setSortedScores(sortedClassement);
      setPersonalScore(myIndex || 0); // Set personal score position, default to 0 if not found
    } catch (error) {
      console.error("Error in DesoulerQuestion component:", error);
      navigate("/error");
    }
  }, []);

  async function updateScore() {
    const personalScore = finalScore();
    // Update the score in the database
    try {
      await updateDoc(doc(db, "public", "quizzdata"), {
        [`classement.${userData.nickname}`]: personalScore,
      });
    } catch (error) {
      console.log("Error updating score in database:", error);
    }
  }

  const handleNext = async () => {
    setLoading(true);
    if (publishScore) {
      await updateScore();
    }
    navigate("/end");
  };

  const loaderStyle: CSSProperties = {
    width: "1.2rem",
    height: "1.2rem",
    border: "3px solid rgba(255, 255, 255, 0.4)",
    borderTop: "3px solid white",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  };
  const titleStyle = {
    fontFamily: "funny",
    marginBottom: "1.5rem",
    color: "white",
    fontWeight: "bold",
    fontSize: "2.5rem",
    padding: "1rem",
    textShadow: "3px 3px 0px black",
    textAlign: "center",
    paddingTop: "5rem",
  } as const;

  const classementStyle = {
    fontFamily: "funny",
    marginBottom: "1.5rem",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.5rem",
    padding: "1rem",
    textAlign: "center",
    textWrap: "wrap",
  } as const;

  const entryContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    overflow: "hidden",
    //    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    //    background: "rgba(255,255,255,0.9)",
    transition: "transform 0.2s",
    fontFamily: "funny",
  } as const;

  const positionStyle = {
    backgroundColor: "#f72585",
    color: "white",
    padding: "0.75rem 1rem",
    fontWeight: "bold",
    fontSize: "1.2rem",
    minWidth: "3rem",
    borderRadius: "12px 0 0 12px",
    textAlign: "center",
  } as const;

  const nameStyle = {
    backgroundColor: "white",
    color: "#333",
    padding: "0.75rem 1rem",
    flexGrow: 1,
    fontSize: "1.1rem",
    textAlign: "left",
    borderRadius: "0 12px 12px 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as const;

  const logoImageStyleL = {
    height: "50px",
    width: "auto",
    objectFit: "contain",
  } as const;

  const logoImageStyleR = {
    height: "40px",
    width: "auto",
    objectFit: "contain",
  } as const;

  const buttonStyle: CSSProperties = {
    fontFamily: "funny",
    marginTop: "0rem",
    fontSize: "1.4rem",
    width: "16rem",
    height: "5rem",
    background: "linear-gradient(135deg,rgb(31, 160, 117), #34d399)",
    color: "white",
    fontWeight: "bold",
    padding: "0.75rem",
    //padding: "0.5rem 2rem",
    border: "none",
    borderRadius: "999px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    zIndex: 10,
    marginBottom: "5.5rem",
  };

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const entry = sortedScores[index];
    return (
      <div
        style={{ ...entryContainerStyle, ...style }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div style={positionStyle}>{entry.position}</div>
        <div style={nameStyle}>{entry.name}</div>
      </div>
    );
  };

  return (
    <>
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
      <Arrow
        path="/score"
        args={{
          state: {
            score: score,
            question: question,
            timeDiff: timeDiff,
          },
        }}
      />
      <div
        style={{
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          maxWidth: "500px",
        }}
      >
        <div style={titleStyle}>CLASSEMENT</div>
        <div style={classementStyle}>
          Ton classement {personalScore}/{sortedScores.length}
        </div>

        <List
          height={500}
          itemCount={sortedScores.length}
          itemSize={60}
          width={300}
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 60%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 60%, transparent 100%)",
            WebkitMaskSize: "60% 100%",
            maskSize: "60% 100%",
            marginBottom: "2rem",
          }}
        >
          {Row}
        </List>
        <button
          style={buttonStyle}
          onClick={handleNext}
          disabled={loading}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
              }}
            >
              <div style={loaderStyle}></div>
              <span>chargement</span>
            </div>
          ) : (
            "Terminer"
          )}{" "}
        </button>
        <div
          style={{
            marginTop: "-5rem",
            marginBottom: "5rem",
            textAlign: "center",
          }}
        >
          <label
            style={{ fontFamily: "funny", color: "white", fontSize: "1rem" }}
          >
            <input
              type="checkbox"
              checked={publishScore}
              onChange={(e) => setPublishScore(e.target.checked)}
              style={{ marginRight: "0.5rem" }}
            />
            publier mon résultat en public
          </label>
        </div>
        {/* Fixed logos that never move */}
        <div style={{ position: "fixed", bottom: "1rem", left: "1rem" }}>
          <img
            src={universSante}
            alt="Univers Santé logo"
            style={logoImageStyleL}
          />
        </div>
        <div style={{ position: "fixed", bottom: "1.2rem", right: "1rem" }}>
          <img
            src={guindaille}
            alt="Guindaille 2.0 logo"
            style={logoImageStyleR}
          />
        </div>
      </div>
    </>
  );
}
