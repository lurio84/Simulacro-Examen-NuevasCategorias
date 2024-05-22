import { RestaurantCategory } from '../../models/models.js'
import { check } from 'express-validator'

const checkCategoryExists = async (value, { req }) => {
  try {
    const restaurantCategory = await RestaurantCategory.findOne({ where: { name: value } })
    if (restaurantCategory) {
      return Promise.reject(new Error("You can only create a restaurant category that doesn't exist already"))
    }
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const create = [

  check('name').exists().isString().isLength({ min: 1, max: 50 }).trim(),
  check('name').custom(checkCategoryExists)

]

export { create }
