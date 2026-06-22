import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Jogos from './pages/Jogos'; // 1. Importação da nova tela

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* 2. Definição do caminho na URL */}
        <Route path="/jogos" element={<Jogos />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;