import { useState, useEffect } from "react";
import axios from "axios";
import PopisZahtjeva from "./PopisZahtjeva";

function ZahtjeviZaUdrugu() {
    const [zahtjevi, postaviZahtjeve] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/zahtjev_udruge")
      .then(rez => postaviZahtjeve(rez.data))
      .catch(err => console.log(err.message));
  }, []);

  console.log(zahtjevi)

    return (
      <>
        <h2>Zahtjevi za odobrenje</h2>
        {zahtjevi.map(r => (
            <PopisZahtjeva key={r.id} rez={r} postaviZahtjeve={postaviZahtjeve} />
        ))}
      </>
    )
  }
  
  export default ZahtjeviZaUdrugu