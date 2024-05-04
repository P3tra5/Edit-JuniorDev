import { Card } from 'react-bootstrap';

function PopisVolontera({ rez }) {
  return (
    <Card style={{ backgroundColor:'aqua', width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{rez.ime} {rez.prezime}</Card.Title>
        <Card.Text>
          Grad: {rez.grad} <br />
          Vrsta posla: {rez.vrsta_posla}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PopisVolontera;
