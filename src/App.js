import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [ repository, setRepository ] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const addRepo = await api.post('repositories', {
      title: 'Novo repository',
      url: "https://github.com/RenanTavaress/Conceitos-nodeJs",
      techs: ['ReactJS', 'nodeJs']
    })

    setRepository([...repository, addRepo.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    console.log(`o repositorio com o id ${id} foi removido`)

    setRepository(repository.filter (
      repositories => repositories.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repositories => (
          <li key={repositories.id}>
            {repositories.title}

            <button onClick={() => handleRemoveRepository(repositories.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>
       
      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
