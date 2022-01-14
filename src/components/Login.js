import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/authService'
import { login } from '../redux/user'
import { useDispatch } from 'react-redux'
import { setMsg, removeMsg } from '../redux/message'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(removeMsg())

    if (!username || !password) {
      dispatch(setMsg({ message: 'Please enter all fields', completed: false }))
    }

    const resp = await AuthService.login(username, password)

    if (resp.msg) {
      const payload = { message: resp.msg, completed: false }
      dispatch(setMsg(payload))
      return
    }

    const payload = { message: `Welcome back, ${resp.user.username}!`, completed: true }
    dispatch(setMsg(payload))

    setTimeout(() => {
      dispatch(login(resp))
      dispatch(removeMsg())
      navigate('/recipes')
    }, 1500)
  }

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (currentUser !== null) {
      dispatch(login(currentUser))
      navigate('/recipes')
    }
  }, [])

  return (
    <div className="login-page">
      <div className="divider"></div>
      <div className="section">
      <form className='add-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type='submit' value='Login' data-testid="login-submit" className='btn btn-block' />
      </form>
      </div>
    </div>
  )
}

export default Login