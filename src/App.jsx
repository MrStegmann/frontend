import { BrowserRouter, Routes, Route} from "react-router-dom";
import UiLayout from "./layout/UiLayout";
import TestPage from "./pages/TestPage";

function App() {

  return (
    
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<UiLayout />}>
                <Route index element={<TestPage />} />
              </Route>
            </Routes>
      </BrowserRouter>
  )
}

export default App
