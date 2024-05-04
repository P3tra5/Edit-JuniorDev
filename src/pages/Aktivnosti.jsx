import { useState } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AktivnostCard from "../components/AktivnostCard"

function Aktivnosti({ aktivnosti, gradovi }) {
    const sortedAktivnosti = aktivnosti.slice().sort((a, b) => {
        return new Date(b.datum_dodano) - new Date(a.datum_dodano);
    });
    
    const [formaPodaci, postaviAktivnost] = useState({
        ime: "",
        datum: "",
        datum_dodano: getFormattedDate(),
        udruga: "",
        grad: "",
        lokacija: "",
        sudionici: [],
        opis: "",
    });

    function getFormattedDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}.${month}.${year}`;
    }

    const saljiPodatke = event => {
        event.preventDefault();
        console.log(formaPodaci);

        const zaSlanje = obradiPodatke(formaPodaci)
  
        axios
            .post('http://localhost:3001/aktivnosti', zaSlanje)
            .then(rez => {
                dodaj(stanje => [...stanje, rez.data])
            })
            .catch(err => console.log(err.message));
    };

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviAktivnost({ ...formaPodaci, [name]: value });
    }

    function obradiPodatke(objekt){
        return {
            "ime": objekt.ime,
            "datum": objekt.datum,
            "datum_dodano": objekt.datum_dodano,
            "udruga": objekt.udruga,
            "grad": objekt.grad,
            "lokacija": objekt.lokacija,
            "sudionici": objekt.sudionici,
            "opis": objekt.opis,
        }
    }

    return (
      <>
        <p>Aktivnosti</p>
        {sortedAktivnosti.map(r => (
            <AktivnostCard key={r.id} rez={r} />
        ))}
        <Popup trigger={<button>Nova</button>} modal nested>
            {close => (
                <div className='modal'>
                    <form onSubmit={saljiPodatke}>
                        <label>
                            Ime:
                            <input type='text' name='ime' value={formaPodaci.ime} onChange={promjenaUlaza} required />
                        </label>
                        <label>
                            Datum:
                            <input type='date' name='datum' value={formaPodaci.datum} onChange={promjenaUlaza} required />
                        </label>
                        <label>
                            Lokacija:
                            <input type='text' name='lokacija' value={formaPodaci.lokacija} onChange={promjenaUlaza} required />
                        </label>
                        <label>
                            Grad:
                            <select name='grad' value={formaPodaci.grad} onChange={promjenaUlaza} required >
                                <option value=''>--Odaberi grad--</option>
                                    {gradovi.map(v => (
                                        <option key={v.id} value={v.grad}>
                                            {v.grad}
                                        </option>
                                    ))}
                            </select>
                        </label>
                        <label>
                            Udruga:
                            <input type='text' name='udruga' value={formaPodaci.udruga} onChange={promjenaUlaza} required />
                        </label>
                        <label>
                            Opis:
                            <input type='text' name='opis' value={formaPodaci.opis} onChange={promjenaUlaza} required />
                        </label>
                        <div>
                            <button type="submit">Dodaj</button>
                            <button onClick={() => close()}>Odustani</button>
                        </div>
                    </form>
                </div>
            )}
        </Popup>
      </>
    )
  }
  
  export default Aktivnosti
  