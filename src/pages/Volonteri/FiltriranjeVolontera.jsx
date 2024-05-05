import { useState } from "react";

function FiltriranjeVolontera({ volonteri, gradovi, poslovi, postaviFiltriraneVolontere }) {
    const [odabraniGradovi, postaviOdabraneGradove] = useState([]);
    const [nemaFiltriranihVolontera, postaviNemaFiltriranihVolontera] = useState(false);

    const odaberiGrad = (grad) => {
        if (odabraniGradovi.includes(grad)) {
            postaviOdabraneGradove(odabraniGradovi.filter((g) => g !== grad));
        } else {
            postaviOdabraneGradove([...odabraniGradovi, grad]);
        }
    };

    const filtrirajVolontere = () => {
        const filtriraniVolonteri = volonteri.filter((volonter) =>
            odabraniGradovi.includes(volonter.grad)
        );
        postaviFiltriraneVolontere(filtriraniVolonteri);
        if (filtriraniVolonteri.length === 0 && odabraniGradovi.length > 0) {
            postaviNemaFiltriranihVolontera(true);
        } else {
            postaviNemaFiltriranihVolontera(false);
        }
    };

    const ukloniFiltriranje = () => {
        postaviOdabraneGradove([]);
        postaviFiltriraneVolontere(volonteri);
        postaviNemaFiltriranihVolontera(false);
    };

    return (
        <>
            <p>Filter</p>
            <div>
                {gradovi.map((grad) => (
                    <label key={grad.id}>
                        <input
                            type="checkbox"
                            name="grad"
                            value={grad.grad}
                            checked={odabraniGradovi.includes(grad.grad)}
                            onChange={() => odaberiGrad(grad.grad)}
                        />
                        {grad.grad}
                    </label>
                ))}
            </div>
            <button onClick={filtrirajVolontere}>Filtriraj</button>
            <button onClick={ukloniFiltriranje}>Ukloni</button>
            {nemaFiltriranihVolontera && <p>Nema volontera za prikazivanje</p>}
        </>
    );
}

export default FiltriranjeVolontera;
