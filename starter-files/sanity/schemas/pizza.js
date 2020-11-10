import { MdLocalPizza  as icon} from 'react-icons/md';
import PriceInput from '../components/PriceInput'

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name', 
      title: 'Pizza',
      type: 'string',
      description: 'Name of the pizza'
    }, 
    {
      name: 'slug', 
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100
      }
    },
    {
      name: 'image', 
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'price', 
      title: 'Price',
      type: 'number',
      inputComponent: PriceInput,
      description: 'Price of the pizza in cents',
      validation: Rule => Rule.min(1000).max(50000)
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array', 
      of: [{
        type: 'reference', 
        to: [{ type: 'topping' }]
      }]
    }
  ],
  preview: {
    select: {
      title: 'name', 
      media: 'image',
      toppings0: 'toppings.0.name',
      toppings1: 'toppings.1.name',
      toppings2: 'toppings.2.name',
      toppings3: 'toppings.3.name',
    }, 
    prepare: ({ title, media, ...toppings}) => {
      // 1. Filter undefined toppings out 
      const tops = Object.values(toppings).filter(topping => 
        topping !== undefined)

      // 2. Return the preview obj for the Pizza 
      return { 
        title, 
        media, 
        subtitle: Object.values(tops).join(', ')
      }
    }
  }
}