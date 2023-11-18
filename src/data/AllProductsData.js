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
    ItemName: 'Pizza Margherita',
    ItemIngredients:
      'Massa de pizza, molho de tomate, mussarela fresca, azeite de oliva, folhas de manjericão.',
    ItemPrice: (8).toFixed(2),
    Category: 'Pizza',
    attributes: [
      {
        id: 'size',
        name: 'size',
        items: [
          { id: 'small', value: 'pequena', slices: '6' },
          { id: 'medium', value: 'média', slices: '8' },
          { id: 'large', value: 'grande', slices: '10' },
          { id: 'x-large', value: 'extra-grande', slices: '12' },
        ],
      },
    ],
  },
  {
    id: 'california-style-pizza',
    ItemImg: CaliforniaStyle,
    ItemName: 'Pizza Estilo Califórnia',
    ItemIngredients:
      'Queijo feta, corações de alcachofra marinados, massa de pizza, pimentão vermelho, cebola roxa.',
    ItemPrice: (15).toFixed(2),
    Category: 'Pizza',
    attributes: [
      {
        id: 'size',
        name: 'size',
        items: [
          { id: 'small', value: 'pequena', slices: '6' },
          { id: 'medium', value: 'média', slices: '8' },
          { id: 'large', value: 'grande', slices: '10' },
          { id: 'x-large', value: 'extra-grande', slices: '12' },
        ],
      },
    ],
  },
  {
    id: 'chicken-alfredo',
    ItemImg: ChickenAlfredo,
    ItemName: 'Frango Alfredo',
    ItemIngredients:
      'Peito de frango sem pele, creme de leite, azeite de oliva, queijo parmigiano reggiano, pimenta preta.',
    ItemPrice: (2).toFixed(2),
    Category: 'Massas',
    attributes: [],
  },
  {
    id: 'italian-mac-and-cheese',
    ItemImg: MacCheese,
    ItemName: 'Macarrão com Queijo ao Estilo Italiano',
    ItemIngredients:
      'Linguiça italiana, massa, molho de queijo, creme, espinafre bebê.',
    ItemPrice: (8).toFixed(2),
    Category: 'Massas',
    attributes: [],
  },
  {
    id: 'chicken-alfredo-second',
    ItemImg: ChickenAlfredo,
    ItemName: 'Frango Alfredo',
    ItemIngredients:
      'Peito de frango sem pele, creme de leite, azeite de oliva, queijo parmigiano reggiano, pimenta preta.',
    ItemPrice: (2).toFixed(2),
    Category: 'Massas',
    attributes: [],
  },
  {
    id: 'blissful-eel-roll-8-pcs',
    ItemImg: BlissfulEel,
    ItemName: 'Rolinho de Enguia Feliz 8Pcs',
    ItemIngredients:
      'Enguia do tipo feliz, Cream Cheese, Abacate, Tobico, Gergelim, Arroz, Nori.',
    ItemPrice: (14).toFixed(2),
    Category: 'Sushi',
    attributes: [],
  },
  {
    id: 'avocado-maki-raki-8-pcs',
    ItemImg: SushiOne,
    ItemName: 'Maki Raki de Abacate 8Pcs',
    ItemIngredients: 'Abacate, Cream Cheese, Arroz, Nori.',
    ItemPrice: (5).toFixed(2),
    Category: 'Sushi',
    attributes: [],
  },
  {
    id: 'coca-cola-original-soda-pop',
    ItemImg: CocaCola,
    ItemName: 'Refrigerante Original Coca-Cola',
    ItemPrice: (1).toFixed(2),
    Category: 'Bebidas',
    attributes: [],
  },
  {
    id: 'aquafina-purified-bottled-drinking-water',
    ItemImg: AquafinaPurified,
    ItemName: 'Água Engarrafada Purificada Aquafina',
    ItemPrice: (2).toFixed(2),
    Category: 'Bebidas',
    attributes: [],
  },
  {
    id: 'margherita-pizza-sale',
    ItemImg: MargheritaPizza,
    ItemName: 'Pizza Margherita',
    ItemIngredients:
      'Massa de pizza, molho de tomate, mussarela fresca, azeite de oliva, folhas de manjericão.',
    ItemPriceBefore: (8).toFixed(2),
    ItemPrice: (7).toFixed(2),
    Category: 'Promoção',
    sale: true,
    attributes: [],
  }
]