import './ProjectForm.css'
import Input from '../form/input';
import Select from '../form/select';
import SubmitButton from '../form/SubmitButton';
import { useState } from 'react';
import { useEffect } from 'react';

function ProjectForm({btnText}) {

    const [categories, setCategories] = useState([])

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


    return (
        <form className='form'>
            <div>
                <Input type={'text'} text={'Nome do Projeto'} name='name' placeholder={'Insira o nome do Projeto'}></Input>
            </div>
            <div>
                <Input type={'number'} text={'Orçamento do Projeto'} name='budget' placeholder={'Orçamento total'}></Input>
            </div>
            <div>
                <Select 
                name='category_id' 
                text='Selecione a categoria' 
                options={categories} />
            </div>
            <div>
                <SubmitButton text={btnText} />
            </div>
        </form>
    )
}

export default ProjectForm;