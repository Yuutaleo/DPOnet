import './style.css'
import { useEffect, useState, useRef } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom';

function Home() {
  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function createUsers() {
    await api.post('/users', {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value),
      email: inputEmail.current.value,
    });
  }
  return (
    <>
      <div className='container'>
        <form >
          <h1>Cadastrar</h1>
          <input placeholder='Nome' name='nome' type="text" ref={inputName} />
          <input placeholder='Idade' name='idade' type="age" ref={inputAge} class="input-number" />
          <input placeholder='Email' name='email' type="email" ref={inputEmail} />
          <Link to="/Registro" className="link">
            <button type='button' className='botao-cadastrar' onClick={createUsers} >Cadastrar</button>
          </Link>
        </form>
      </div>
    </>
  )
}
export default Home