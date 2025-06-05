import { useSnapCarousel } from "@rsagiev/react-snap-carousel-19";
import testImage from "/logo.webp";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import Arrow from "../components/Arrow";
import Logos from "../components/Logos";

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
    marginBottom: "-1rem",
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
    marginBottom: "0.5rem",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    lineHeight: 1.5,
    padding: "1rem",
    textAlign: "center",
  };

  const textDescriptionStyle: CSSProperties = {
    fontFamily: "funny",
    marginBottom: "0.5rem",
    color: "white",
    fontWeight: "bold",
    lineHeight: 1.5,
    paddingTop: "0.5rem",
    textAlign: "center",
  };

  return (
    <>
      <Arrow path="/choice"/>
      <div style={textTitleStyle}>Fait un choix !</div>
      <div style={textSubTitleStyle}>Click sur un picto pour te tester</div>

      <div style={{ width: "100%", maxWidth: 1000, margin: "0 auto" }}>
        <ul
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
            scrollPadding: "0 50%", 
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
                width: 250,
                marginRight: 1,
                scrollSnapAlign: "center", 
                borderRadius: 8,
                padding: 1,
                paddingBottom: 0,
                paddingTop: 0,
                boxSizing: "border-box",
                textAlign: "center",
              }}
            >
              <img
                src={item.imageUrl}
                alt={`Image ${index + 1}`}
                style={{ width: "70%", height: "auto", marginBottom: 0 }}
                onClick={() => navigate(`/test`)}
              />
              <div style={textDescriptionStyle}>{item.description}</div>
            </li>
          ))}
        </ul>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
        >
          {pages.map((_: any, i: any) => (
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
      <Logos/>
    </>
  );
}
