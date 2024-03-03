import { useState, useEffect } from 'react';


function CustoTotal() {
    const [projects, setProjects] = useState([]);

    

    useEffect(() =>{

        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }}).then((resposta) => resposta.json())
            .then((data) => {
                setProjects(data)
                console.log('interação')              
            })
            .catch((erro) => console.log(erro))
        }, 0)

        }, [])


    return (
        <div>
            {projects}
            
        </div>
    )
}

export default CustoTotal