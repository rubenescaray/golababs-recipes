import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeMsg, setMsg } from '../redux/message'

const AddRecipe = ({ onAdd, getRecipes }) => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.user["id"])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cookingTime, setCookingTime] = useState(0)

  const setMessage = (message, completed = true) => {
    dispatch(setMsg({ message, completed }))
  }

  const onSubmit = (e) => {
    dispatch(removeMsg())
    e.preventDefault()

    if (!title) {
      setMessage('Please add a recipe title', false)
      return
    }

    if (!description) {
      setMessage('Please add a recipe description or instructions', false)
      return
    }

    if (typeof Number(description) != 'number') {
      setMessage('Please specify the number of minutes it takes to cook', false)
      return
    }

    onAdd({ title, description, cookingTime, userId })

    setMessage(`Recipe ${title} added!`)
    setTitle('')
    setDescription('')
    setCookingTime(0)

    setTimeout(() => {
      dispatch(removeMsg())
      getRecipes()
    }, 1000)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Recipe</label>
        <input
          type='text'
          placeholder='Add Recipe Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Description</label>
        <input
          type='text'
          placeholder='Add Recipe Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Add Cooking Time</label>
        <input
          type='text'
          placeholder='Add Cooking Time (minutes)'
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
        />
      </div>

      <input type='submit' value='Save Recipe' className='btn btn-block' />
    </form>
  )
}

export default AddRecipe
