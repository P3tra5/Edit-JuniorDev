import PopisVolontera from "../components/PopisVolontera"

function Volonteri({ volonteri, gradovi, poslovi }) {
    return (
      <>
        <h2>Volonteri</h2>
        {volonteri.map(r => (
            <PopisVolontera key={r.id} rez={r} />
        ))}
      </>
    )
  }
  
  export default Volonteri