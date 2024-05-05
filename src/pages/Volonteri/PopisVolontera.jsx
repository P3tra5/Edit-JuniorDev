import { useState, useContext } from 'react';
import axios from 'axios';
import AdminContext from "../../components/common/kontekst";
import EditVolonter from './EditVolonter';
import { Card } from 'react-bootstrap';

function PopisVolontera({ rez, postaviVolontere, updateAll }) {
    const { admin } = useContext(AdminContext);
    const [editOn, postaviEditOn] = useState(false);

    async function brisiPodatak() {
        const shouldRemove = confirm("Jeste li sigurni da želite obrisati podatak?");

        if (shouldRemove) {
            try {
                await axios.delete(`http://localhost:3001/volonteri/${rez.id}`);
                updateAll();
            } catch (error) {
                console.error("Greška prilikom brisanja volontera:", error);
            }
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
                        <div>
                            <input
                                type="checkbox"
                                id="editCheckbox" 
                                onChange={() => postaviEditOn(true)}
                            />
                            <label htmlFor="editCheckbox">Edit</label>
                        </div>  
                    </>
                )}
                {admin === 'on' && editOn && (
                    <>
                        <EditVolonter
                            volonter={rez} 
                            postaviVolontere={postaviVolontere} 
                            postaviEditOn={postaviEditOn}
                            updateAll={updateAll}
                        />
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default PopisVolontera;


/*import { useState, useContext } from 'react';
import axios from 'axios';
import AdminContext from "../../components/common/kontekst";
import EditVolonter from './EditVolonter';
import { Card } from 'react-bootstrap';

function PopisVolontera({ rez, postaviVolontere, updateAll }) {
  const { admin } = useContext(AdminContext);
  const [editOn, postaviEditOn] = useState(false);

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
                <div>
                  <input
                    type="checkbox"
                    id="editCheckbox" 
                    onChange={() => postaviEditOn(true)}
                  />
                  <label htmlFor="editCheckbox">Edit</label>
                </div>  
            </>
        )}
        {admin === 'on' && editOn && (
          <>
            <EditVolonter
                volonter={rez} 
                postaviVolontere={postaviVolontere} 
                postaviEditOn={postaviEditOn}
                updateAll={updateAll}
              />
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default PopisVolontera;*/
