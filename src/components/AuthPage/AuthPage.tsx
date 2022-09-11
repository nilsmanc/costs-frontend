import { MutableRefObject, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthClient } from '../../api/authClient'
import './styles.css'

export const AuthPage = ({ type }: { type: 'login' | 'registration' }) => {
  const [spinner, setSpinner] = useState(false)
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>

  const currentAuthTitle = type === 'login' ? 'Войти' : 'Регистрация'

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      return
    }
    const result = await AuthClient.login(username, password)
  }

  const handleRegistration = async (username: string, password: string) => {
    if (!username || !password) {
      return
    }

    if (password.length < 4) {
      return
    }
    const result = await AuthClient.login(username, password)
  }
  return (
    <div className='container'>
      <h1>{currentAuthTitle}</h1>
      <form className='form-group'>
        <label className='auth-label'>
          Введите имя пользователя
          <input type='text' className='form-control' />
        </label>
        <label className='auth-label'>
          Введите пароль
          <input type='text' className='form-control' />
        </label>
        <button className='btn btn-primary auth-btn'>{currentAuthTitle}</button>
      </form>
      {type === 'login' ? (
        <div>
          <span className='question_text'>Ещё нет аккаунта?</span>
          <Link to={'/registration'}>Зарегистрироваться</Link>
        </div>
      ) : (
        <div>
          <span className='question_text'>Уже есть акканут?</span>
          <Link to={'/login'}>Войти</Link>
        </div>
      )}
    </div>
  )
}
