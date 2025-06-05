import { doc, getDoc, type DocumentData } from "firebase/firestore/lite";
import { db } from "../firebase_config";
import React, { useContext, useEffect, useState } from "react";

interface DataProviderProps {
  children: React.ReactNode;
}

interface DataContextValue {
  data: DocumentData | null;
  loadingData: boolean;
}

export const DataContext = React.createContext<DataContextValue | null>(null);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  useEffect(() => {
    console.log(`
                              2025 made by
██╗  ██╗███████╗███╗   ██╗██████╗ ██╗    ██████╗ ██╗██╗  ██╗███████╗████████╗
██║  ██║██╔════╝████╗  ██║██╔══██╗██║    ██╔══██╗██║██║  ██║██╔════╝╚══██╔══╝
███████║█████╗  ██╔██╗ ██║██████╔╝██║    ██████╔╝██║███████║█████╗     ██║   
██╔══██║██╔══╝  ██║╚██╗██║██╔══██╗██║    ██╔═══╝ ██║██╔══██║██╔══╝     ██║   
██║  ██║███████╗██║ ╚████║██║  ██║██║    ██║     ██║██║  ██║███████╗   ██║   
╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   
                            Guindaille 2.0 🍻
  `);
    const fetchData = async () => {
      setLoadingData(true);
      try {
        // get a doc public/quizzdata
        const q = doc(db, "public", "quizzdata");
        const docSnap = await getDoc(q);
        if (docSnap.exists()) {
          //console.log("Document data:", docSnap.data());
          setData(docSnap.data());
        } else {
          console.error("No such document!");
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();

    // Preload the pictures in the backgroud for faster loading time, YAHOUUU GO FAST BABY
    const imageUrls = ["/logo.webp"];

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        loadingData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext) as DataContextValue;
};
