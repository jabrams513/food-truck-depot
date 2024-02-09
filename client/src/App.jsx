import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
