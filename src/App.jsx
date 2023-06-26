import { BrowserRouter, Routes, Route} from "react-router-dom";
import WebLayout from "./layout/WebLayout";
import { DataProvider } from "./context/DataProvider";
import SpawnZombie from "./pages/SpawnZombie";
import Game from "./pages/Game";

function App() {

  return (
    
      <BrowserRouter>
        <DataProvider>
          <Routes>
              <Route path="/" element={<WebLayout />}>
                <Route index element={<SpawnZombie />} />
                <Route path="start_game" element={<Game />} />
              </Route>
          </Routes>
        </DataProvider>
      </BrowserRouter>
  )
}

export default App
