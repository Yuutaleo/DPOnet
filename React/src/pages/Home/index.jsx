import './style.css'
import { useEffect, useState, useRef } from 'react'
import Trash from './assets/trash.svg'
import api from '../../services/api'
import AppRoutes from '../Rotas/Index'


function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  const inputPassword = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/users')
    setUsers(usersFromApi.data)
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)
    getUsers()
  }

  async function createUsers() {
    await api.post('/users', {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value),
      email: inputEmail.current.value,
      password: inputPassword.current.value
    });  
    getUsers(); 
  }
  

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className='container'>
        <form >
          <h1>Cadastro de usuários</h1>
          <input placeholder='Nome' name='nome' type="text" ref={inputName} />
          <input placeholder='Idade' name='idade' type="number" ref={inputAge} class="input-number" />
          <input placeholder='Email' name='email' type="email" ref={inputEmail} />
          <input placeholder='Senha' name='senha' type="password" ref={inputPassword} />
          <button type='button' onClick={createUsers}  >Cadastrar</button>
        </form>

        {users.map(user => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: {user.name}</p>
              <p>Idade: {user.age}</p>
              <p>Email: {user.email}</p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} />
            </button>
          </div>
        ))}

      </div>

    </>
  )
}

export default Home