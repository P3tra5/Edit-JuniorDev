import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from "axios"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Aktivnosti from './pages/Aktivnosti'
import Volonteri from './pages/Volonteri'
import Udruge from './pages/Udruge'
import './App.css'

function App() {
  const [aktivnosti, postaviAktivnosti] = useState([]);
  const [volonteri, postaviVolontere] = useState([]);
  const [udruge, postaviUdruge] = useState([]);
  const [gradovi, postaviGradove] = useState([]);
  const [poslovi, postaviPoslove] = useState([]);
  //const [filtrirano, postaviFiltrirano] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/aktivnosti/")
      .then(res => postaviAktivnosti(res.data))
      .catch(err => console.log(err))
    axios
      .get("http://localhost:3001/volonteri")
      .then(rez => postaviVolontere(rez.data))
      .catch(err => console.log(err.message));
    axios
      .get("http://localhost:3001/udruge")
      .then(rez => postaviUdruge(rez.data))
      .catch(err => console.log(err.message));
    axios
      .get("http://localhost:3001/gradovi")
      .then(rez => postaviGradove(rez.data))
      .catch(err => console.log(err.message));
    axios
      .get("http://localhost:3001/vrste_posla")
      .then(rez => postaviPoslove(rez.data))
      .catch(err => console.log(err.message));
  }, []);


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/aktivnosti' element={<Aktivnosti aktivnosti={aktivnosti} gradovi={gradovi} />} />
        <Route path='/volonteri' element={<Volonteri volonteri={volonteri} gradovi={gradovi} poslovi={poslovi} />} />
        <Route path='/udruge' element={<Udruge udruge={udruge} gradovi={gradovi} />} />
      </Routes>
    </>
  )
}

export default App
