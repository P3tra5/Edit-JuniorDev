import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdminContext from "../../components/common/kontekst";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FiltriranjeVolontera from "./FiltriranjeVolontera"
import PopisVolontera from "./PopisVolontera"

function Volonteri({ gradovi, poslovi }) {
    const { admin } = useContext(AdminContext);
    const [volonteri, postaviVolontere] = useState([]);
    const [filtriraniVolonteri, postaviFiltriraneVolontere] = useState([]);
    const [formaPodaci, postaviVolontera] = useState({
        ime: "",
        prezime: "",
        grad: "",
        vrsta_posla: "",
    });

    useEffect(() => {
        axios
          .get("http://localhost:3001/volonteri")
          .then(res => {
            postaviVolontere(res.data);
            postaviFiltriraneVolontere(res.data);
            })
          .catch(err => console.log(err.message));
      }, []);

    const saljiPodatke = event => {
        event.preventDefault();
        console.log(formaPodaci);

        const zaSlanje = obradiPodatke(formaPodaci)
  
        axios
            .post('http://localhost:3001/volonteri', zaSlanje)
            .then(rez => {
                postaviVolontere(stanje => [...stanje, rez.data]);
            })
            .catch(err => console.log(err.message));
    };

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviVolontera({ ...formaPodaci, [name]: value });
    }

    function obradiPodatke(objekt){
        return {
            "ime": objekt.ime,
            "prezime": objekt.prezime,
            "grad": objekt.grad,
            "vrsta_posla": objekt.vrsta_posla,
        }
    }

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
                <PopisVolontera key={volonter.id} rez={volonter} postaviVolontere={postaviVolontere} />
            ))}
            {admin === 'on' && (
                <>
                    <Popup trigger={<button>Nova</button>} modal nested>
                        {close => (
                            <div className='modal'>
                                <form onSubmit={saljiPodatke}>
                                    <label>
                                        Ime:
                                        <input type='text' name='ime' value={formaPodaci.ime} onChange={promjenaUlaza} required />
                                    </label>
                                    <label>
                                        Prezime:
                                        <input type='text' name='prezime' value={formaPodaci.prezime} onChange={promjenaUlaza} required />
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
                                        Posao:
                                        <select name='vrsta_posla' value={formaPodaci.vrsta_posla} onChange={promjenaUlaza} required >
                                            <option value=''>--Odaberi posao--</option>
                                                {poslovi.map(v => (
                                                    <option key={v.id} value={v.vrsta_posla}>
                                                        {v.vrsta_posla}
                                                    </option>
                                                ))}
                                        </select>
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
            )}
        </>
    )
  }
  
  export default Volonteri