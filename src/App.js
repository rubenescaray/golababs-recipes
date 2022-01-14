import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import Header from './components/Header'
import Recipes from './components/Recipes'
import AddRecipe from './components/AddRecipe'
import Login from './components/Login'
import Register from './components/Register'
import AuthService from './services/authService'
import { removeMsg, setMsg } from './redux/message'

const App = () => {
  const dispatch = useDispatch()
  const [showAddRecipe, setShowAddRecipe] = useState(false)
  const [recipes, setRecipes] = useState([])
  const { isAuthenticated } = useSelector(state => state.user)

  const getRecipes = async () => {
    const recipesFromServer = await fetchRecipes()
    setRecipes(recipesFromServer)
  }


  const fetchRecipes = async () => {
    const loggedData = AuthService.getCurrentUser()
    if (loggedData && loggedData.user && loggedData.user.id) {
      const res = await fetch(`http://localhost:5000/api/recipes/${loggedData.user.id}`)
      const data = await res.json()
      return data
    }

    return []
  }

  const addRecipe = async (recipe) => {
    const res = await fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })

    const data = await res.json()
    return data
  }

  const deleteRecipe = async (id) => {
    const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
      method: 'DELETE',
    })
    
    if (res.status === 200) {
      dispatch(setMsg({message: 'Recipe Deleted', completed: true }))
      setTimeout(() => {
        dispatch(removeMsg())
        getRecipes()
      }, 1500)
    } else {
      alert('Error Deleting This Recipe')
    }
  }

  useEffect(() => {
    getRecipes()
  }, [])

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddRecipe(!showAddRecipe)}
          showAdd={showAddRecipe}
          isAuthenticated={isAuthenticated}
        />
        <Routes>
          <Route
            path='/'
            element={
              <Login isAuthenticated={isAuthenticated} />
            }
          />
          <Route 
            path='/register'
            element={
              <Register isAuthenticated={isAuthenticated} />
            }
          />
          <Route
            path='/recipes'
            element={
              <>
                {showAddRecipe && <AddRecipe onAdd={addRecipe} getRecipes={getRecipes} />}
                {recipes.length > 0 ? (
                  <Recipes
                    recipes={recipes}
                    onDelete={deleteRecipe}
                  />
                ) : (
                  <div className='no-recipes'>No Recipes To Show</div>
                )}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
