import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import AddNote from "./components/addnote/AddNote";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/addnote" element={<AddNote />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
