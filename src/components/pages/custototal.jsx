import { useState, useEffect } from 'react';
import ServiceCard from '../service/ServiceCard';

function CustoTotal() {
    const [dados, setDados] = useState()

    useEffect(() => {
        fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resposta) => resposta.json())
        .then((data) => { 
            setDados(data)
            console.log(data)            
        })
        .catch((erro) => console.log(erro));
    }, []);

    return (
        <div>
            {console.log(dados)}
            <ServiceCard
            name={dados.name}
            cost={dados.cost}
            description={dados.description}
            key={dados.id}           
            
            />
        </div>
    );
}

export default CustoTotal;