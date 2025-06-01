import React from "react";
import { useSnapCarousel } from "@rsagiev/react-snap-carousel-19";
import testImage from "/logo.webp";
import arrowImage from "/arrow2.png";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import universSante from "/univers-sante.png";
import guindaille from "/guindaille.png";

const items = [
  {
    id: 1,
    imageUrl: testImage,
    description: "This is the first image",
  },
  {
    id: 2,
    imageUrl: testImage,
    description: "This is the second image",
  },
  {
    id: 3,
    imageUrl: testImage,
    description:
      "This is the third image This is the first image This is the first image",
  },
  {
    id: 4,
    imageUrl: testImage,
    description: "Pour guindailler avec dignité, reste hydraté.e !",
  },
  {
    id: 5,
    imageUrl: testImage,
    description: "This is the third image",
  },
  {
    id: 6,
    imageUrl: testImage,
    description: "This is the third image",
  },
  {
    id: 7,
    imageUrl: testImage,
    description: "This is the third image",
  },
  // Add more items as needed
];

export default function Picto() {
  const { scrollRef, pages, activePageIndex, goTo } = useSnapCarousel();
  const navigate = useNavigate();
  const textTitleStyle: CSSProperties = {
    fontFamily: "funny",
    // position: "absolute", // ❌ remove this line
    marginBottom: "-1rem", // ✅ space below the title
    color: "white",
    fontWeight: "bold",
    fontSize: "2.5rem",
    lineHeight: 1.5,
    padding: "1rem",
    textShadow: "3px 3px 0px black",
    textAlign: "center",
  };
    const textSubTitleStyle: CSSProperties = {
    fontFamily: "funny",
    // position: "absolute", // ❌ remove this line
    marginBottom: "2rem", // ✅ space below the title
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    lineHeight: 1.5,
    padding: "1rem",
    textAlign: "center",
  };
  const logoLeftStyle: CSSProperties = {
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
  };

  const logoRightStyle: CSSProperties = {
    position: "absolute",
    bottom: "1.5rem",
    right: "1rem",
  };

  const logoImageStyleL: CSSProperties = {
    height: "50px",
    width: "auto",
    objectFit: "contain" as const,
  };

  const logoImageStyleR: CSSProperties = {
    height: "40px",
    width: "auto",
    objectFit: "contain" as const,
  };

  const textDescriptionStyle: CSSProperties = {
    fontFamily: "funny",
    // position: "absolute", // ❌ remove this line
    marginBottom: "1rem", // ✅ space below the title
    color: "white",
    fontWeight: "bold",
    lineHeight: 1.5,
    padding: "1rem",
    textAlign: "center",
  };


  return (
    <>
      <img
        src={arrowImage}
        alt="Retour"
        onClick={() => navigate("/choice")}
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
      <div style={textTitleStyle}>Fait un choix !</div>
      <div style={textSubTitleStyle}>Click sur un picto pour te tester</div>

      <div style={{ width: "100%", maxWidth: 1000, margin: "0 auto" }}>
        <ul
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "scroll", // keep scrolling functionality
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
            scrollSnapType: "x mandatory",
            padding: 0,
            margin: 0,
            listStyle: "none",
          }}
        >
          {items.map((item, index) => (
            <li
              key={item.id}
              style={{
                flex: "0 0 auto",
                width: 300,
                marginRight: 15,
                scrollSnapAlign: "start",
                borderRadius: 8,
                padding: 1,
                boxSizing: "border-box",
                textAlign: "center",
              }}
            >

              <img
                src={item.imageUrl}
                alt={`Image ${index + 1}`}
                style={{ width: "100%", height: "auto", marginBottom: 8 }}
                onClick={() => navigate(`/test`)}
              />
              <div style={textDescriptionStyle}>{item.description}</div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
        >
          {pages.map((_: any, i: React.Key | null | undefined) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                margin: "0 4px",
                backgroundColor: activePageIndex === i ? "#333" : "#ccc",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
      <div style={logoLeftStyle}>
        <img
          src={universSante}
          alt="Univers Santé logo"
          style={logoImageStyleL}
        />
      </div>
      <div style={logoRightStyle}>
        <img
          src={guindaille}
          alt="Guindaille 2.0 logo"
          style={logoImageStyleR}
        />
      </div>
    </>
  );
}
