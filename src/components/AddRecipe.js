import { useState } from 'react'
import { useSelector } from 'react-redux'

const AddRecipe = ({ onAdd, getRecipes }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cookingTime, setCookingTime] = useState(0)
  const userId = useSelector(state => state.user.user["id"])

  const onSubmit = (e) => {
    e.preventDefault()

    if (!title) {
      alert('Please add a recipe title')
      return
    }

    if (!description) {
      alert('Please add a recipe description or instructions')
      return
    }

    if (typeof Number(description) != 'number') {
      alert('Please specify the number of minutes it takes to cook')
      return
    }

    const resp = onAdd({ title, description, cookingTime, userId })

    alert('Reciped added')
    setTitle('')
    setDescription('')
    setCookingTime(0)
    getRecipes()
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
