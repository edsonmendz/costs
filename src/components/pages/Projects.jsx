import './Projects.css'
import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
import Container from "../layout/Container";
import Loading from '../layout/Loading';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';
import { useState, useEffect } from 'react';

function Projects() {

    const [projects, setProjects] = useState([]);
    const [ removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''

    if (location.state) {
        message = location.state 
    }

    useEffect(() =>{

        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }}).then((resposta) => resposta.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((erro) => console.log(erro))
        }, 420)

        }, [])

        function removeProject(id) {
            setProjectMessage('')
            fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }}).then((resposta) => resposta.json())
            .then(data => {
                setProjects(projects.filter((project) => project.id !== id))
                //mensagem de remoção
                setProjectMessage('Projeto removido com sucesso.')
            })
            .catch((erro) => console.log(erro))
        }

    return (
        <div className='project_container'>
            <div className='title_container'>
                <h1>Meus Projetos</h1>    
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>                  
            { message && <Message msg={message} type='success' />}
            { projectMessage && <Message msg={projectMessage} type='success' />}
            <Container>
                <div className='ajuste_card project_container title_container'>
                    {projects.length > 0 &&
                        projects.map((project) => (
                        <ProjectCard 
                        name={project.name}
                        id={project.id} 
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeProject}
                         />
                    ))}
                    {!removeLoading && <Loading />}
                    {
                        removeLoading && projects.length === 0 && (
                            <p>Não há projetos cadastrados!</p>
                        )

                    }
                </div>
            </Container>
        </div>
    )
}

export default Projects