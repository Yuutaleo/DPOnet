import './style.css';
import { useEffect, useState, useRef } from 'react';
import api from '../../services/api';

function ConsentimentoFinalidade() {
  const [users, setUsers] = useState([]);
  const [finalidades, setFinalidades] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedFinalidadeId, setSelectedFinalidadeId] = useState('');
  const inputTitle = useRef();
  const inputDescription = useRef();

  useEffect(() => {
    async function fetchData() {
      const usersRes = await api.get('/users');
      setUsers(usersRes.data);
      const finalidadesRes = await api.get('/finalidades');
      setFinalidades(finalidadesRes.data);
    }
    fetchData();
    document.title = 'Gerenciar Finalidades e Consentimentos';
  }, []);
  async function deleteFinalidade(id) {
    await api.delete(`/finalidades/${id}`);
    const finalidadesRes = await api.get('/finalidades');
    setFinalidades(finalidadesRes.data);
  }
  async function createFinalidade() {
    await api.post('/finalidades', {
      title: inputTitle.current.value,
      description: inputDescription.current.value
    });
    alert('Finalidade criado com sucesso!');
    const finalidadesRes = await api.get('/finalidades');
    setFinalidades(finalidadesRes.data);
  }
  async function createConsentimento() {
    await api.post('/consentimentos', {
      userId: selectedUserId,
      finalidadeId: selectedFinalidadeId
    });
    alert('Consentimento criado com sucesso!');
  }
  return (
    <div className="container">
      <h1>Gerenciar Finalidades e Consentimentos</h1>
      <form onSubmit={(e) => e.preventDefault()} className="form-section">
        <h2>Criar Finalidade</h2>
        <input placeholder='Finalidade' type="text" ref={inputTitle} />
        <input placeholder='Descrição' type="text" ref={inputDescription} />
        <button type='button' onClick={createFinalidade} className='botaocriar' >Criar Finalidade</button>
      </form>
      <form onSubmit={(e) => e.preventDefault()} className="form-section">
        <h2>Dar Consentimento</h2>
        <select onChange={(e) => setSelectedUserId(e.target.value)} defaultValue="" className='classic'>
          <option value="" disabled>Selecione um usuário</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <select onChange={(e) => setSelectedFinalidadeId(e.target.value)} defaultValue="" className='classic'>
          <option value="" disabled>Selecione uma finalidade</option>
          {finalidades.map(finalidade => (
            <option key={finalidade.id} value={finalidade.id}>{finalidade.title}</option>
          ))}
        </select>
        <button type='button' onClick={createConsentimento} className='botaocriar'>Dar Consentimento</button>
      </form>
      <div className="lista-finalidades">
        <h2>Finalidades Cadastradas</h2>
        <ul>
          {finalidades.map(finalidade => (
            <li key={finalidade.id}>
              <strong>{finalidade.title}:</strong>  {finalidade.description}
              <button onClick={() => deleteFinalidade(finalidade.id)} className="btn-delete">
                Deletar
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
export default ConsentimentoFinalidade;
