import { useState } from "react";
import axios from "axios";

function BrisanjePrijave({ aktivnost, postaviAktivnosti, sudionikId }) {
    const [brisanjeState, postaviBrisanjeState] = useState(false);

    const brisanjeSudionika = async (sudionikId) => {
        try {
            const sudionikIndex = aktivnost.sudionici.findIndex(sudionik => sudionik.id === sudionikId);
            
            if (sudionikIndex !== -1) {
                const noviSudionici = [...aktivnost.sudionici];
                noviSudionici.splice(sudionikIndex, 1);
                
                const novaAktivnost = { ...aktivnost, sudionici: noviSudionici };
                
                await axios.put(`http://localhost:3001/aktivnosti/${aktivnost.id}`, novaAktivnost);
    
                const noveAktivnostiRes = await axios.get("http://localhost:3001/aktivnosti");
                postaviAktivnosti(noveAktivnostiRes.data);
                postaviBrisanjeState(false);
            } else {
                console.error(`Volonter s ID-om ${sudionikId} nije pronađen.`);
            }
        } catch (error) {
            console.error('Greška prilikom brisanja volontera:', error);
        }
    }

    return (
        <>
            {brisanjeState ? (
                <span>
                    Jeste li sigurni da želite obrisati podatak?
                    <button onClick={() => brisanjeSudionika(sudionikId)}>Da</button>
                    <button onClick={() => postaviBrisanjeState(false)}>Ne</button>
                </span>
            ) : (
                <button onClick={() => postaviBrisanjeState(true)}>DEL</button>
            )}
      </>
    )
  }
  
  export default BrisanjePrijave