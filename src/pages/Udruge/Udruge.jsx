import { useState, useContext } from "react";
import axios from "axios";
import AdminContext from "../../components/common/kontekst";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopisUdruga from "./PopisUdruga"
import ZahtjeviZaUdrugu from "./ZahtjeviZaUdrugu";

function Udruge({ udruge, gradovi }) {
    const { admin } = useContext(AdminContext);
    const [sortOption, setSortOption] = useState('ime');
    const [formaPodaci, postaviUdrugu] = useState({
        ime: "",
        adresa: "",
        grad: "",
    });

    const handleSortChange = (option) => {
        setSortOption(option);
      };
    
      let sortedUdruge;
      if (sortOption === 'ime') {
        sortedUdruge = udruge.slice().sort((a, b) => a.ime.localeCompare(b.ime));
      } else if (sortOption === 'adresa') {
        sortedUdruge = udruge.slice().sort((a, b) => a.adresa.localeCompare(b.adresa));
      } else if (sortOption === 'grad') {
        sortedUdruge = udruge.slice().sort((a, b) => a.grad.localeCompare(b.grad));
      }

    const saljiPodatke = event => {
        event.preventDefault();
        console.log(formaPodaci);

        const zaSlanje = obradiPodatke(formaPodaci)
  
        axios
            .post('http://localhost:3001/zahtjev_udruge', zaSlanje)
            .then(rez => {
                alert("Zahtjev je poslan administratoru i bit će dodan u popis nakon odobrenja.");
            })
            .catch(err => console.log(err.message));
    };

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviUdrugu({ ...formaPodaci, [name]: value });
    }

    function obradiPodatke(objekt){
        return {
            "ime": objekt.ime,
            "adresa": objekt.adresa,
            "grad": objekt.grad,
        }
    }

    return (
      <>
        <p>Udruge</p>
        <h2>PopisUdruga</h2>
        <div>
            <label>
            Sortiraj po:
            <select value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
                <option value="ime">Ime</option>
                <option value="adresa">Adresa</option>
                <option value="grad">Grad</option>
            </select>
            </label>
        </div>
        {sortedUdruge.map(r => (
            <PopisUdruga key={r.id} rez={r} />
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
                            Adresa:
                            <input type='text' name='adresa' value={formaPodaci.adresa} onChange={promjenaUlaza} required />
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
                        <div>
                            <button type="submit">Dodaj</button>
                            <button onClick={() => close()}>Odustani</button>
                        </div>
                    </form>
                </div>
            )}
        </Popup>
        {admin === 'on' && (
            <>
                <ZahtjeviZaUdrugu />  
            </>
        )}
      </>
    )
  }
  
  export default Udruge