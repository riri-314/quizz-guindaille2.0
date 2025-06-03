import arrowImage from "/arrow2.png";
import { useNavigate } from "react-router-dom";

type ArrowProps = {
  path: string;
};

export default function Arrow({ path }: ArrowProps) {
  const navigate = useNavigate();
  return (
    <>
      <img
        src={arrowImage}
        alt="Retour"
        onClick={() => navigate(path)}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          height: "2.5rem",
          width: "auto",
          cursor: "pointer",
          zIndex: 10,
          transform: "scaleX(-1)",
        }}
      />
    </>
  );
}
