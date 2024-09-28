import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import AddNote from "./components/addnote/AddNote";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import AlertState from "./context/alert/AlertState";

function App() {
  return (
    <NoteState>
      <AlertState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/addnote" element={<AddNote />} />
          </Routes>
        </Router>
      </AlertState>
    </NoteState>
  );
}

export default App;
