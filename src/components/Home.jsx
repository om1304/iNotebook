import React from 'react';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as AddNoteIcon } from "./icons/add.svg";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/addnote");
  return (
    <div className='container mt-4'>
      <h1 className="text-center">Welcome to iNotebook</h1>
      <Notes/>
      <div className="d-flex justify-content-center align-items-end">
        <button className="btn btn-dark mt-4" style={{borderRadius:20,}}onClick={handleClick}><AddNoteIcon /> Add Note</button>
      </div>
    </div>
  )
}

export default Home
