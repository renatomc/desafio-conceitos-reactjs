import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }
    getRepositories();
  },[]);

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/Rocketseat/unform",
      title: "Unform",
      techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
    };

    const response = await api.post('/repositories',  repository );

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repos = repositories.filter(repository => repository.id !== id);
    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 && (
          repositories.map(repository => (
            <li key={repository.id}>
             {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
