import CocaCola from '../assets/images/drinks-images/coca-cola-classic.jpeg'
import AquafinaPurified from '../assets/images/drinks-images/Aquafina Purified.jpeg'
//Pasta
import ChickenAlfredo from '../assets/images/pasta-images/Chicken Alfredo.jpeg'
import MacCheese from '../assets/images/pasta-images/Italian Mac and Cheese.jpeg'
//Pizza
import MargheritaPizza from '../assets/images/margherita-pizza.jpg'
import CaliforniaStyle from '../assets/images/California-Style.jpeg'
//Sushi
import BlissfulEel from '../assets/images/sushi-images/sushi-2.jpeg'
import SushiOne from '../assets/images/sushi-images/sushi-1.jpeg'

export const allProductsData = [
  
  {
    id: 'margherita-pizza',
    ItemImg: MargheritaPizza,
    ItemName: 'Margherita Pizza',
    ItemIngredients:
      'Pizza dough, tomato sauce, fresh mozzarella, olive oil, basil leaves.',
    ItemPrice: (8).toFixed(2),
    Category: 'Pizza',
    attributes: [
      {
        id: 'size',
        name: 'size',
        items: [
          { id: 'small', value: 'small', slices: '6' },
          { id: 'medium', value: 'medium', slices: '8' },
          { id: 'large', value: 'large', slices: '10' },
          { id: 'x-large', value: 'x-large', slices: '12' },
        ],
      },
    ],
  },
  {
    id: 'california-style-pizza',
    ItemImg: CaliforniaStyle,
    ItemName: 'California-Style Pizza',
    ItemIngredients:
      'Feta cheese, marinated artichoke hearts, pizza crust, red bell pepper, red onion.',
    ItemPrice: (15).toFixed(2),
    Category: 'Pizza',
    attributes: [
      {
        id: 'size',
        name: 'size',
        items: [
          { id: 'small', value: 'small', slices: '6' },
          { id: 'medium', value: 'medium', slices: '8' },
          { id: 'large', value: 'large', slices: '10' },
          { id: 'x-large', value: 'x-large', slices: '12' },
        ],
      },
    ],
  },
  {
    id: 'chicken-alfredo',
    ItemImg: ChickenAlfredo,
    ItemName: 'Chicken Alfredo',
    ItemIngredients:
      'Skinless chicken breast, heavy cream, olive oil, parmigiano reggiano, black pepper.',
    ItemPrice: (2).toFixed(2),
    Category: 'Pasta',
    attributes: [],
  },
  {
    id: 'italian-mac-and-cheese',
    ItemImg: MacCheese,
    ItemName: 'Italian Mac and Cheese',
    ItemIngredients:
      'Italian sausage, pasta, cheese sauce, cream, baby spinach.',
    ItemPrice: (8).toFixed(2),
    Category: 'Pasta',
    attributes: [],
  },
  {
    id: 'chicken-alfredo-second',
    ItemImg: ChickenAlfredo,
    ItemName: 'Chicken Alfredo',
    ItemIngredients:
      'Skinless chicken breast, heavy cream, olive oil, parmigiano reggiano, black pepper.',
    ItemPrice: (2).toFixed(2),
    Category: 'Pasta',
    attributes: [],
  },
  {
    id: 'blissful-eel-roll-8-pcs',
    ItemImg: BlissfulEel,
    ItemName: 'Blissful Eel Roll 8Pcs',
    ItemIngredients:
      'Eel kinda blissful, Cream Cheese, Avocado, Tobico, Sesame, Rice, Nori.',
    ItemPrice: (14).toFixed(2),
    Category: 'Sushi',
    attributes: [],
  },
  {
    id: 'avocado-maki-raki-8-pcs',
    ItemImg: SushiOne,
    ItemName: 'Avocado Maki Raki 8Pcs',
    ItemIngredients: 'Avocado, Cream Cheese, Rice, Nori.',
    ItemPrice: (5).toFixed(2),
    Category: 'Sushi',
    attributes: [],
  },
  {
    id: 'coca-cola-original-soda-pop',
    ItemImg: CocaCola,
    ItemName: 'Coca-Cola Original Soda Pop',
    ItemPrice: (1).toFixed(2),
    Category: 'Drinks',
    attributes: [],
  },
  {
    id: 'aquafina-purified-bottled-drinking-water',
    ItemImg: AquafinaPurified,
    ItemName: 'Aquafina Purified Bottled Drinking Water',
    ItemPrice: (2).toFixed(2),
    Category: 'Drinks',
    attributes: [],
  },
  {
    id: 'margherita-pizza-sale',
    ItemImg: MargheritaPizza,
    ItemName: 'Margherita Pizza',
    ItemIngredients:
      'Pizza dough, tomato sauce, fresh mozzarella, olive oil, basil leaves.',
    ItemPriceBefore: (8).toFixed(2),
    ItemPrice: (7).toFixed(2),
    Category: 'Sale',
    sale: true,
    attributes: [],
  },
  {
    id: 'margherita-pizza-sale-second',
    ItemImg: MargheritaPizza,
    ItemName: 'Margherita Pizza',
    ItemIngredients:
      'Pizza dough, tomato sauce, fresh mozzarella, olive oil, basil leaves.',
    ItemPriceBefore: (8).toFixed(2),
    ItemPrice: (7).toFixed(2),
    Category: 'Sale',
    sale: true,
    attributes: [],
  }
]
