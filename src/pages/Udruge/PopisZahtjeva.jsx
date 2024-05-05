import axios from "axios";

function PopisZahtjeva({ rez, postaviZahtjeve }) {
    async function brisiZahtjev(odbaciZahtjev = true) {
        if (odbaciZahtjev) {
            const shouldRemove = confirm("Jeste li sigurni da želite obrisati podatak?")
            if (!shouldRemove) {
                return;
            }
        }

        await axios.delete(`http://localhost:3001/zahtjev_udruge/${rez.id}`);
        const rezultat = await axios.get("http://localhost:3001/zahtjev_udruge");
        postaviZahtjeve(rezultat.data);
      }

    async function dodajZahtjev() {
        try {
            await axios.post(`http://localhost:3001/udruge`, {
                id: rez.id,
                ime: rez.ime,
                adresa: rez.adresa,
                grad: rez.grad
            });

            brisiZahtjev(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
      <>
        <p>
          {rez.ime}, {rez.adresa}, {rez.grad}
          <button onClick={dodajZahtjev}>ADD</button>
          <button onClick={() => brisiZahtjev()}>DEL</button>
        </p>
      </>
    )
  }
  
  export default PopisZahtjeva