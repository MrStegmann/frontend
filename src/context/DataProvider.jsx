import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({children}) => {
  const [ players, setPlayers ] = useState(0);
  const [ difficulty, setDifficulty ] = useState('');
  const [ zombies, setZombies ] = useState([]);

  useEffect(() => {
    if (players) {
      localStorage.setItem('players', players);
    };

    if (difficulty) {
      localStorage.setItem('difficulty', difficulty);
    };

    if (zombies.length) {
      localStorage.setItem('zombies', zombies);
    };

  }, [players, difficulty, zombies]);

  return (
    <>
        <DataContext.Provider value={{players, setPlayers, difficulty, setDifficulty, zombies, setZombies}}>
            {children}
        </DataContext.Provider>
    </>
  )
}

export {
  DataProvider
}

export default DataContext