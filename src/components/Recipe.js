import { FaTimes } from 'react-icons/fa'

const Recipe = ({ recipe, onDelete }) => {
  return (
    <div
      className="recipe"
    >
      <h3>
        {recipe.title}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(recipe._id)}
        />
      </h3>
      <p>{recipe.description}</p>
      <p>Cooking Time: {recipe.cookingTime} minutes</p>
    </div>
  )
}

export default Recipe
