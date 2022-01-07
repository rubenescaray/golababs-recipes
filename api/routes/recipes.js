const express = require('express')
const router = express.Router()

const Recipe = require('../models/Recipe')

// @desc Process add form
// @route POST /recipes
router.post('/', async (req, res) => {
  try {
    await Recipe.create(req.body)
    res.status(200).json({ msg: 'Deleted Added Succesfully!' })
  } catch (err) {
    console.error(err)
  }
})

// @desc Show all recipes for logged in user
// @route GET /stories/add/:userId
router.get('/:userId', async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.params.userId })
      .sort({ createdAt: 'desc' })
      .lean()

    res.json(recipes)
  } catch(err) {
    console.error(err)
  }
})

// @desc Show single recipe
// @route GET /recipes/:id
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .lean()

    if (!recipe) {
      res.render('error/404')
    }

    res.json(recipe);
  } catch(err) {
    console.error(err)
  }
})

// @desc Delete recipe
// @route DELETE /stories/:id
router.delete('/:id', async (req, res) => {
  try { 
    await Recipe.remove({ _id: req.params.id })
    res.status(200).json({ msg: 'Deleted Recipe Succesfully!' })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router