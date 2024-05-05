import { useState, useContext } from "react";
import axios from "axios";
import AdminContext from "../../components/common/kontekst";
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import BrisanjePrijave from "./BrisanjePrijave";

function AktivnostCard({ rez, postaviAktivnosti }) {
    const { admin } = useContext(AdminContext);
    const [noviSudionik, postaviNovogSudionika] = useState({ ime: "", prezime: "" });

    const saljiPodatke = event => {
        event.preventDefault();

        const noviSudionikTrimmed = {
            id: uuidv4(),
            ime: noviSudionik.ime.trim(), 
            prezime: noviSudionik.prezime.trim()
        };

        if (noviSudionikTrimmed.ime !== "" && noviSudionikTrimmed.prezime !== "") {
            const noviPopisSudionika = [...rez.sudionici, noviSudionikTrimmed];

            axios
                .patch(`http://localhost:3001/aktivnosti/${rez.id}`, { sudionici: noviPopisSudionika })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => console.error('Greška prilikom slanja podataka:', error));

            postaviNovogSudionika({ id: "", ime: "", prezime: "" });
        }
    };

    async function brisiPodatak() {
        const shouldRemove = confirm("Jeste li sigurni da želite obrisati podatak?")
    
        if (shouldRemove) {
          await axios.delete(`http://localhost:3001/aktivnosti/${rez.id}`);
          const rezultat = await axios.get("http://localhost:3001/aktivnosti");
          postaviAktivnosti(rezultat.data);
        }
      }

    return (
        <>
            <Popup trigger={<p>
                                <button>{rez.ime} {rez.datum}</button>
                                {admin === 'on' && (
                                    <>
                                        <button onClick={brisiPodatak}>DEL</button>
                                    </>
                                )}
                            </p>} modal nested>
                {close => (
                    <div className='modal'>
                        <p>Opis: {rez.opis}</p>
                        <p>Udruga: {rez.udruga}</p>
                        <p>Lokacija: {rez.lokacija}, {rez.grad}</p>
                        <div>
                            Sudionici:&nbsp;
                            {rez.sudionici.map((sudionik, index) => (
                                <span key={index}>
                                    <p>
                                        {sudionik.ime} {sudionik.prezime}
                                        {admin === 'on' && (
                                            <>
                                                <BrisanjePrijave aktivnost={rez} postaviAktivnosti={postaviAktivnosti} sudionikId={sudionik.id} />
                                            </>
                                        )}
                                    </p>
                                </span>
                            ))}
                        </div>
                        <form onSubmit={saljiPodatke}>
                            <label>
                                Ime:
                                <input 
                                    type='text' 
                                    value={noviSudionik.ime} 
                                    onChange={(e) => postaviNovogSudionika({ ...noviSudionik, ime: e.target.value })} 
                                    required 
                                />
                            </label>
                            <label>
                                Prezime:
                                <input 
                                    type='text' 
                                    value={noviSudionik.prezime} 
                                    onChange={(e) => postaviNovogSudionika({ ...noviSudionik, prezime: e.target.value })} 
                                    required 
                                />
                            </label>
                            <button type="submit">Prijava</button>
                        </form>
                        <div>
                            <button onClick={() => close()}>Zatvori</button>
                        </div>
                    </div>
                )}
            </Popup>
        </>
    );
}

export default AktivnostCard;