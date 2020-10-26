import { FaPepperHot  as icon} from 'react-icons/fa';

export default {
  name: 'topping',
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name', 
      title: 'Topping',
      type: 'string',
      description: 'Name of the topping'
    }, 
    {
      name: 'vegetarian', 
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Please select the topping type',
      options: {
        layout: 'checkbox'
      }
    }
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian'
    }, 
    prepare: (field) => ({
      title: `Add extra ${field.name}${field.vegetarian ? '🌱' : '' }`
    })
  }
}