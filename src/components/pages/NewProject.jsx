import './NewProject.css'
import { Navigate, useNavigate } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';

function NewProject() {
    
    const history = useNavigate();

    function createPost(project) {
        //initialize cost and sets
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(project)
            }
        ).then((resposta) => resposta.json())
            .then((data) => {
                console.log(data)
                //redirecionamento
                Navigate("/projects", { message: "Projeto criado com sucesso!" });
            }
        ).catch((e) => {console.log(e)})
    }
    
    
    
    return (   
        <div className='newProject_container'>
            <h1>Criar Projeto</h1>
            <p>Crie seus projetos para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText={'Criar Projeto'} />
        </div>
    )
}

export default NewProject;