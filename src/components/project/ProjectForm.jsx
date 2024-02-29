import './ProjectForm.css'
import Input from '../form/input';
import Select from '../form/select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm({btnText}) {
    return (
        <form className='form'>
            <div>
                <Input type={'text'} text={'Nome do Projeto'} name='name' placeholder={'Insira o nome do Projeto'}></Input>
            </div>
            <div>
                <Input type={'number'} text={'Orçamento do Projeto'} name='budget' placeholder={'Orçamento total'}></Input>
            </div>
            <div>
                <Select name='category_id' text='Selecione a categoria' />
            </div>
            <div>
                <SubmitButton text={btnText} />
            </div>
        </form>
    )
}

export default ProjectForm;