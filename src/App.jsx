import { BrowserRouter, Routes, Route} from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthProvider";
import UiLayout from "./layout/UiLayout";
import MainMenu from "./pages/MainMenu";
import { DataProvider } from "./context/DataProvider";
import CreateChar from "./pages/CreateChar";

function App() {

  return (
    
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route path="/ui" element={<UiLayout />}>
                <Route index element={<MainMenu />} />
                <Route path="/ui/new-character" element={<CreateChar />} />
              </Route>
            </Routes>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
