import { useSnapCarousel } from "@rsagiev/react-snap-carousel-19";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, type CSSProperties } from "react";
import Arrow from "../components/Arrow";
import Logos from "../components/Logos";
import { useData } from "../provider/dataProvider";
import { useUser } from "../provider/userData";

export default function Picto() {
  const { scrollRef, pages, activePageIndex, goTo } = useSnapCarousel();
  const { data } = useData();
  const { userData } = useUser();
  const [pictos, setPictos] = useState<any[]>([]);

  const navigate = useNavigate();

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
  }, [data]);

  function goToTest(index: number) {
      navigate("/test", {
      state: {
        index: index,
      },
    });
  }

  function finalOpacity(index: number) {
    if (userData.progress && userData.progress[index]) {
      return 0.2; // Already done
    }
    return 1; // Not done yet
  }

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
      <Arrow path="/choice" />
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
          {pictos.map((item, index) => (
            <li
              key={index}
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
                src={`/pictos/picto${index}.png`}
                alt={item.name}
                style={{ width: "70%", height: "auto", marginBottom: 0, opacity: finalOpacity(index) }}
                onClick={() => goToTest(index)}
              />
              <div style={textDescriptionStyle}>{item.text}</div>
            </li>
          ))}
        </ul>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
        >
          {pages.map((_: any, i: number) => (
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
      <Logos />
    </>
  );
}
