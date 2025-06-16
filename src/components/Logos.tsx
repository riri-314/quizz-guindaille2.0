import universSante from "/univers-sante.png";
import guindaille from "/guindaille.png";
import type { CSSProperties } from "react";

export default function logos() {
  const logoLeftStyle: CSSProperties = {
    zIndex: 10,
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
  };

  const logoRightStyle: CSSProperties = {
    zIndex: 10,
    position: "absolute",
    bottom: "1.5rem",
    right: "1rem",
  };

  const logoImageStyleL: CSSProperties = {
    height: "50px",
    width: "auto",
    objectFit: "contain" as const,
    cursor: "pointer",
    
  };

  const logoImageStyleR: CSSProperties = {
    height: "40px",
    width: "auto",
    objectFit: "contain" as const,
    cursor: "pointer",
  };

  function handleLogoClick(url: string) {
    console.log("Logo clicked, opening:", url);
    window.open(url, "_blank");
  }
  return (
    <>
      <div style={logoLeftStyle}>
        <img
          onClick={() => handleLogoClick("https://univers-sante.be/")}
          src={universSante}
          alt="Univers Santé logo"
          style={logoImageStyleL}
        />
      </div>
      <div style={logoRightStyle}>
        <img
          onClick={() => handleLogoClick("https://www.instagram.com/guindaille2.0/")}
          src={guindaille}
          alt="Guindaille 2.0 logo"
          style={logoImageStyleR}
        />
      </div>
    </>
  );
}
