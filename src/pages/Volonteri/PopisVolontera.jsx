import { useContext } from 'react';
import axios from 'axios';
import AdminContext from "../../components/common/kontekst";
import { Card } from 'react-bootstrap';

function PopisVolontera({ rez, postaviVolontere }) {
  const { admin } = useContext(AdminContext);
  async function brisiPodatak() {
    const shouldRemove = confirm("Jeste li sigurni da želite obrisati podatak?")

    if (shouldRemove) {
      await axios.delete(`http://localhost:3001/volonteri/${rez.id}`);
      const rezultat = await axios.get("http://localhost:3001/volonteri");
      postaviVolontere(rezultat.data);
    }
  }

  return (
    <Card style={{ backgroundColor:'aqua', width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{rez.ime} {rez.prezime}</Card.Title>
        <Card.Text>
          Grad: {rez.grad} <br />
          Vrsta posla: {rez.vrsta_posla}
        </Card.Text>
        {admin === 'on' && (
            <>
                <button onClick={brisiPodatak}>DEL</button>  
            </>
        )}
      </Card.Body>
    </Card>
  );
}

export default PopisVolontera;
