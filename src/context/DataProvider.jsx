import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({children}) => {
  const getCharacters = () => {
    const stringChars = localStorage.getItem("characters");
    if (stringChars) {
      const parsedChars = JSON.parse(stringChars);
      return parsedChars;
    };
    return [];
  };

  return (
    <>
      <DataContext.Provider value={{getCharacters}}>
        {children}
      </DataContext.Provider>
    </>
  )
}

export {
    DataProvider
}

export default DataContext