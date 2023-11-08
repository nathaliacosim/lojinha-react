import React, { useState, useEffect } from 'react';
import { getUsuarios, getUsuario, postUsuario, updateUsuario, deleteUsuario } from './http/api';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [newUsuario, setNewUsuario] = useState({ nome: '', email: '', senha: '' });
  const [updatedUsuario, setUpdatedUsuario] = useState({ id: '', nome: '', email: '', senha: '' });
  const [usuarioId, setUsuarioId] = useState('');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await getUsuarios();
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    }
  };

  const handleGetUsuarioById = async () => {
    try {
      const response = await getUsuario(usuarioId);
      setUsuario(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário por ID', error);
    }
  };

  const handleCreateUsuario = async () => {
    try {
      await postUsuario(newUsuario);
      setNewUsuario({ nome: '', email: '', senha: '' });
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao criar usuário', error);
    }
  };

  const handleUpdateUsuario = async () => {
    try {
      await updateUsuario(updatedUsuario.id, updatedUsuario);
      setUpdatedUsuario({ id: '', nome: '', email: '', senha: '' });
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao atualizar usuário', error);
    }
  };

  const handleDeleteUsuario = async (id) => {
    try {
      await deleteUsuario(id);
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao excluir usuário', error);
    }
  };

  return (
    <div className="app-container">
      <div className="left-column">
        <h1>Cadastro de Usuários</h1>
        <input
          type="text"
          placeholder="Nome"
          value={newUsuario.nome}
          onChange={(e) => setNewUsuario({ ...newUsuario, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUsuario.email}
          onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Senha"
          value={newUsuario.senha}
          onChange={(e) => setNewUsuario({ ...newUsuario, senha: e.target.value })}
        />
        <button onClick={handleCreateUsuario}>Criar Usuário</button>
        <h2>Atualização de Usuário</h2>
        <input
          type="text"
          placeholder="ID do Usuário"
          value={updatedUsuario.id}
          onChange={(e) => setUpdatedUsuario({ ...updatedUsuario, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nome"
          value={updatedUsuario.nome}
          onChange={(e) => setUpdatedUsuario({ ...updatedUsuario, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={updatedUsuario.email}
          onChange={(e) => setUpdatedUsuario({ ...updatedUsuario, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Senha"
          value={updatedUsuario.senha}
          onChange={(e) => setUpdatedUsuario({ ...updatedUsuario, senha: e.target.value })}
        />
        <button onClick={handleUpdateUsuario}>Atualizar Usuário</button>
      </div>
      <div className="right-column">
        <h1>Lista de Usuários</h1>
        <input
          type="text"
          placeholder="ID do Usuário"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        />
        <button onClick={handleGetUsuarioById}>Buscar por ID</button>
        {usuario && (
          <div className="user-list">
            <p className="json-preview json-text">
                {JSON.stringify({ id: usuario.id, nome: usuario.nome }, null, 2)}
              </p>
          </div>
        )}
        <div className="user-list">
          {usuarios.map((user) => (
            <div key={user.id}>
              <p className="json-preview json-text">
                {JSON.stringify({ id: user.id, nome: user.nome }, null, 2)}
              </p>
              <button onClick={() => handleDeleteUsuario(user.id)}>Excluir</button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => fetchUsuarios()}>Listar todos</button>
    </div>
  );
}

export default App;
