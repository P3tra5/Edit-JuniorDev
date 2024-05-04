import { useState, useEffect } from "react";
import axios from "axios";
import FiltriranjeVolontera from "../components/FiltriranjeVolontera"
import PopisVolontera from "../components/PopisVolontera"

function Volonteri({ gradovi, poslovi }) {
    const [volonteri, postaviVolontere] = useState([]);
    const [filtriraniVolonteri, postaviFiltriraneVolontere] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:3001/volonteri")
          .then(res => {
            postaviVolontere(res.data);
            postaviFiltriraneVolontere(res.data);
            })
          .catch(err => console.log(err.message));
      }, []);

    return (
        <>
            <h2>Volonteri</h2>
            <FiltriranjeVolontera
                volonteri={volonteri}
                gradovi={gradovi}
                poslovi={poslovi}
                postaviFiltriraneVolontere={postaviFiltriraneVolontere}
            />
            {filtriraniVolonteri.map((volonter) => (
                <PopisVolontera key={volonter.id} rez={volonter} />
            ))}
        </>
    )
  }
  
  export default Volonteri