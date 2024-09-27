import React from 'react';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/addnote");
  return (
    <div className='container mt-4'>
      <h1 className="text-center">Welcome to iNotebook</h1>
      <Notes/>
      <div className="d-flex justify-content-end align-items-end">
        <button className="btn btn-primary" onClick={handleClick}>Add a Note</button>
      </div>
    </div>
  )
}

export default Home
