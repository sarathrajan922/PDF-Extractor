import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <h3 className="text-gray-600 opacity-25">PDF Extractor</h3>
      </div>
      <Outlet />
    </>
  );
}

export default App;
