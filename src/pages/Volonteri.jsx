import { useState } from "react";
import FiltriranjeVolontera from "../components/FiltriranjeVolontera"
import PopisVolontera from "../components/PopisVolontera"

function Volonteri({ volonteri, gradovi, poslovi }) {
    const [filtriraniVolonteri, postaviFiltriraneVolontere] = useState(volonteri);

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