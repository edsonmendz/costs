import './ProjectForm.css'
import Input from '../form/input';
import Select from '../form/select';
import SubmitButton from '../form/SubmitButton';
import { useState } from 'react';
import { useEffect } from 'react';

function ProjectForm({ handleCategory, btnText, projectData}) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((resposta) => resposta.json())
    .then((data) => {
        setCategories(data)
    })
    .catch((erro) => console.log(erro))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        setProject({ 
            ...project,
            category:{
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        })
    }


    return (
        <form onSubmit={submit} className='form'>
            <div>
                <Input value={project.name ? project.name : ''} type={'text'} text={'Nome do Projeto'} name='name' placeholder={'Insira o nome do Projeto'} handleOnchange={handleChange}></Input>
            </div>
            <div>
                <Input value={project.budget ? project.budget : ''} type={'number'} text={'Orçamento do Projeto'} name='budget' placeholder={'Orçamento total'} handleOnchange={handleChange}></Input>
            </div>
            <div>
                <Select 
                name='category_id' 
                text='Selecione a categoria' 
                options={categories} 
                handleOnchange={handleCategory}
                value={project.category ? project.category.id : ''}/>
            </div>
            <div>
                <SubmitButton text={btnText} />
            </div>
        </form>
    )
}

export default ProjectForm;