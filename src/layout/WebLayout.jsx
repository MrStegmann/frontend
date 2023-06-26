import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const WebLayout = () => {
  return (
    <>
        <Header />
        <main className="w-full flex flex-col justify-between items-center p-5"><Outlet /></main>
        
    </>
  )
}

export default WebLayout