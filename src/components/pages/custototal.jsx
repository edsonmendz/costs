import { useState, useEffect } from 'react';
import ServiceCard from '../service/ServiceCard';

function CustoTotal() {
    const [dados, setDados] = useState()

    useEffect(() => {
        fetch("http://localhost:5000/projects/id:5d0f", {
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
            
            key={dados.id}           
            
            />
        </div>
    );
}

export default CustoTotal;