import React from 'react';
import './App.css';
import InputField from './Componets/InputField';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecordShow from './Componets/RecordShow';

function App() {   

  return (
    <div className="App">
       <Router> 
    <Routes >
    <Route path="/" element={<InputField/>} />
    <Route path="/recordshow" element={<RecordShow/>} />
    </Routes>
  </Router>
    </div>
  );
}

export default App;
