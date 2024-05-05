import { useState } from 'react';
import axios from 'axios';

function EditVolonter({ volonter, postaviVolontere, postaviEditOn, updateAll }) {
    const [editPodaci, postaviEditPodatke] = useState({
        ime: volonter.ime,
        prezime: volonter.prezime,
        grad: volonter.grad,
        vrsta_posla: volonter.vrsta_posla
    });

    function promjenaPodataka(event) {
        const { name, value } = event.target;
        postaviEditPodatke({ ...editPodaci, [name]: value });
    }

    async function spremiIzmjene() {
        try {
            await axios.put(`http://localhost:3001/volonteri/${volonter.id}`, editPodaci);
            updateAll();
            postaviEditOn(false);
        } catch (error) {
            console.error("Greška prilikom spremanja izmjena:", error);
        }
    }

    return (
        <>
            <form onSubmit={spremiIzmjene}>
                <label>
                    Ime:
                    <input type="text" name="ime" value={editPodaci.ime} onChange={promjenaPodataka} required />
                </label>
                <label>
                    Prezime:
                    <input type="text" name="prezime" value={editPodaci.prezime} onChange={promjenaPodataka} required />
                </label>
                <label>
                    Grad:
                    <input type="text" name="grad" value={editPodaci.grad} onChange={promjenaPodataka} required />
                </label>
                <label>
                    Vrsta posla:
                    <input type="text" name="vrsta_posla" value={editPodaci.vrsta_posla} onChange={promjenaPodataka} required />
                </label>
                <button type="submit">Spremi</button>
                <button onClick={() => postaviEditOn(false)}>Odustani</button>
            </form>
        </>
    );
}

export default EditVolonter;
