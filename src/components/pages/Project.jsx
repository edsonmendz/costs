import { parse, v4 as uuidv4 } from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './Project.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {
  let { id } = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [services, setServices] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')

  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch(`http://localhost:5000/projects/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)            
            setServices(data.services)                 
          }),
      1000,
    )
  }, [id])

  function editPost(project) {
    setMessage('')
    // budget validation
    if (project.budget < project.cost) {
      setMessage('O Orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(!showProjectForm)
        setMessage('Projeto atualizado!')
        setType('success')
      })
  }

  function calcularTotalCost(services) {
    if (!services || !services.length) {
      return 0; // Retorna 0 se o array de serviços estiver vazio ou indefinido
    }
    
    let total = 0;
    for (let i = 0; i < services.length; i++) {
      total += parseFloat(services[i].cost); // Converte o valor de cost para um número e soma ao total
    }
    return total;
  }
  
  // Exemplo de uso:
  if (project.services) {
    const totalCost = calcularTotalCost(project.services);
    console.log("O custo total dos serviços é:", totalCost);
  } else {
    console.log("Nenhum serviço encontrado.");
  }
    
  

  function createService(project) {
    // last service
    const lastService = project.services[project.services.length - 1]
   
    lastService.id = uuidv4()    

    const lastServiceCost = lastService.cost

    let a = parseFloat(project.cost)
    let b = parseFloat(lastServiceCost)

    const budget = parseFloat(project.budget);
    const newCost = a + b    
    
    // maximum value validation
    if (newCost > budget) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
      setType('error')
      project.services.pop()
      return false
    }

    // add service cost to project cost total
    project.cost = newCost    

    // Atualizar o estado do projeto com o novo objeto project
    setProject(project);    

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data.services)
        setShowServiceForm(!showServiceForm)
        setMessage('Serviço adicionado!')
        setType('success')
      })
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id,
    )

    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso!')
      })
  }
  

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return (
    <>
      {project.name ? (
        <div className='project_details'>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className='details_container form'>
              <h1>Projeto: {project.name}</h1>
              <button className='btn' onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className='form'>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total do orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R$ {calcularTotalCost(services)}
                  </p>
                </div>
              ) : (
                <div className='form'>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}  // Certifique-se de passar o estado atualizado do projeto
                  />
                </div>
              )}
            </div>
            <div className='service_form_container form'>
              <h2>Adicione um serviço:</h2>
              <button className='btn' onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>
              <div className='form'>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}  // Certifique-se de passar o estado atualizado do projeto
                  />
                )}
              </div>
            </div>
            <h2>Serviços:</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (                  
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                    project={project}  // Certifique-se de passar o estado atualizado do projeto
                  /> 
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project