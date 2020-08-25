import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository() {
    const update = async () => {
      try {
        const { data: project } = await api.post('repositories', {
          title: `New project ${Date.now()}`,
          url: '',
          techs: '',
        });
        setRepositories([...repositories, project]);
      } catch (error) {
        alert(error);
      }
    };
    update();
  }

  async function handleRemoveRepository(id) {
    const remove = async () => {
      try {
        await api.delete(`repositories/${id}`);
        const filtered = [
          ...repositories.filter(project => project.id !== id),
        ];
        setRepositories(filtered);
      } catch (error) {
        alert(error);
      }
    };
    remove();
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: repositories } = await api.get('repositories');
        setRepositories(repositories);
      } catch (error) {
        alert(error);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
