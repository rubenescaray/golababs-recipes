
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { FaTimes } from 'react-icons/fa'
import Button from './Button'

import AuthService from '../services/authService'
import { login, logout } from '../redux/user'
import { setMsg, removeMsg } from '../redux/message'
import { useEffect } from 'react'

const Header = ({ onAdd, showAdd, isAuthenticated }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  const { message, showMsg, completed } = useSelector(state => state.message)
  const isRegistering = location.pathname === '/register'

  const maintainSession = () => {
    const currentUser = AuthService.getCurrentUser()
    if (currentUser !== null && user && user.username === null) {
      dispatch(login(currentUser))
    }
  }

  const handleLogOut = () => {
    dispatch(setMsg({ message:`You've been logged out`, completed: false }))

    setTimeout(() => {
      dispatch(removeMsg())
      dispatch(logout())
      navigate('/')
    }, 1500)
  }

  useEffect(() => {
    maintainSession()
  }, [])

  return (
    <div>
      <header className='header'>
        <div>
          <h1><i className="fas fa-book reader"> Recipes</i></h1>
          {(isAuthenticated && user) && <p>Welcome {user.username || ''} 
            <FaTimes 
              style={{ color: 'red', cursor: 'pointer' }} 
              onClick={handleLogOut}
              title='Log Out'
            />
          </p>}
        </div>
        {!isAuthenticated && <Link to={isRegistering ? '/' : '/register'}>
          <Button
            color={'green'}
            text={isRegistering ? 'Log In' : 'Register'}
            name="toggle-signup-button"
          />
        </Link>}
        {isAuthenticated && <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />}
      </header>
      {showMsg && <div className='message' style={{backgroundColor: completed ? '#BFE324' : '#FF6961'}}>
        <p data-testid="message">{message}</p>
      </div>}
    </div>
  )
}

export default Header
