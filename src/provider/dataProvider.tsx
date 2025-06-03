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
    const fetchData = async () => {
      setLoadingData(true);
      try {
        // get a doc public/quizzdata
        const q = doc(db, "public", "quizzdata");
        const docSnap = await getDoc(q);
        if (docSnap.exists()) {
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
  }, []);

  //const RouterContent = (children: any) => {
  //  //load the full app only of the scanner data is loaded (we need the current edition id)
  //  if (!data && loadingData) {
  //    return <div>Loading</div>;
  //  } else if (!data && !loadingData) {
  //    return <div>error charging data</div>;
  //  } else {
  //    return children;
  //  }
  //};

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