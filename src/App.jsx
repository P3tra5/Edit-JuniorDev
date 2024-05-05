import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import axios from "axios"
import AdminContext from './components/common/kontekst'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Aktivnosti from './pages/Aktivnosti/Aktivnosti'
import Volonteri from './pages/Volonteri/Volonteri'
import Udruge from './pages/Udruge/Udruge'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [admin, setAdmin] = useState(false);
  const adminValue = useMemo(() => ({admin, setAdmin}), [admin, setAdmin]);
  const [aktivnosti, postaviAktivnosti] = useState([]);
  const [udruge, postaviUdruge] = useState([]);
  const [gradovi, postaviGradove] = useState([]);
  const [poslovi, postaviPoslove] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/aktivnosti/")
      .then(res => postaviAktivnosti(res.data))
      .catch(err => console.log(err))
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
      <AdminContext.Provider value={adminValue}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/aktivnosti' element={<Aktivnosti aktivnosti={aktivnosti} postaviAktivnosti={postaviAktivnosti} gradovi={gradovi} />} />
          <Route path='/volonteri' element={<Volonteri gradovi={gradovi} poslovi={poslovi} />} />
          <Route path='/udruge' element={<Udruge udruge={udruge} gradovi={gradovi} />} />
        </Routes>
      </AdminContext.Provider>
    </>
  )
}

export default App
