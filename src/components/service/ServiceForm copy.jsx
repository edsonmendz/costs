import { useState } from 'react'
import Input from '../form/input'
import SubmitButton from '../form/SubmitButton'

import '../project/ProjectForm.css'

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({ name: '', cost: '', description: '' })

  const submit = (e) => {
    e.preventDefault()
    
    // Não é recomendado modificar diretamente o estado anterior
    // Em vez disso, você pode criar um novo objeto com os valores atualizados
    const updatedProjectData = {
      ...projectData,
      services: [...projectData.services, service]
    }
    
    handleSubmit(updatedProjectData)
  }

  function handleChange(e) {
    // Atualiza o estado do serviço conforme os valores dos campos mudam
    setService({ ...service, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={submit} className='form'>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnchange={handleChange}
        value={service.name}  // Corrige o valor do campo
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor total"
        handleOnchange={handleChange}
        value={service.cost}  // Corrige o valor do campo
      />
      <Input
        type="text"
        text="Descrição do projeto"
        name="description"
        placeholder="Descreva o serviço"
        handleOnchange={handleChange}
        value={service.description}  // Corrige o valor do campo
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ServiceForm
