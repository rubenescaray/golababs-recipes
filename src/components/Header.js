
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { FaTimes } from 'react-icons/fa'
import Button from './Button'

import AuthService from '../services/authService'
import { login, logout } from '../redux/user'
import { useEffect } from 'react'

const Header = ({ onAdd, showAdd, isAuthenticated }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  const isRegistering = location.pathname === '/register'

  const handleLogin = () => {
    const currentUser = AuthService.getCurrentUser()
    if (currentUser !== null && user.username === null) {
      dispatch(login(currentUser))
    }
  }

  const handleLogOut = () => {
    alert(`You've been logged out`)
    dispatch(logout())
    navigate('/login')
  }

  useEffect(() => {
    handleLogin()
  }, [])

  return (
    <header className='header'>
      <div>
        <h1><i className="fas fa-book reader"> Recipes</i></h1>
        {isAuthenticated && <p>Welcome {user.username || ''} 
          <FaTimes 
            style={{ color: 'red', cursor: 'pointer' }} 
            onClick={handleLogOut}
            title='Log Out'
          />
        </p>}
      </div>
      {!isAuthenticated && <Link to={isRegistering ? '/login' : '/register'}>
        <Button
          color={'green'}
          text={isRegistering ? 'Log In' : 'Register'}
        />
      </Link>}
      {isAuthenticated && <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Close' : 'Add'}
        onClick={onAdd}
      />}
    </header>
  )
}

export default Header
