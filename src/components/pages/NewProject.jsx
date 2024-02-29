import './NewProject.css'
import ProjectForm from '../project/ProjectForm';

function NewProject() {
    return (
        <div className='newProject_container'>
            <h1>Criar Projeto</h1>
            <p>Crie seus projetos para depois adicionar os serviços</p>
            <ProjectForm btnText={'Criar Projeto'} />
        </div>
    )
}

export default NewProject;