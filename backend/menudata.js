const mongoose = require('mongoose');
const Product = require('./models/menuModel'); // Adjust the path as needed
const Category = require('./models/categoryModel'); // For category references

// Default products to add
const defaultProducts = [
  {
    name: 'Labneh',
    shortdesc: 'Served with pita bread',
    longdescription: '',
    price: 20,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736435272/empty_awsuzn.png', // Replace with hosted image URL
    categoryTitles: ['Breakfast (From 10:00 Till 12:00)'], // Category titles to link
  },
  {
    name: 'Foul Modammas',
    shortdesc: 'Fava beans sautéed with onion, garlic, tomato, parsley, olive oil, tahina, served with pita bread',
    longdescription: '',
    price: 22,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736435272/empty_awsuzn.png', // Replace with hosted image URL
    categoryTitles: ['Breakfast (From 10:00 Till 12:00)'], // Category titles to link
  },
  {
    name: 'Fried Egg',
    shortdesc: 'Plain fried eggs or sunny side up, served with sliced bread, grilled tomato & mushroom',
    longdescription: '',
    price: 20,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736435272/empty_awsuzn.png', // Replace with hosted image URL
    categoryTitles: ['Breakfast (From 10:00 Till 12:00)'], // Category titles to link
  },
  {
    name: 'Create Your Own Omelett',
    shortdesc: 'Omelett with your choice to add (onion, garlic, capsicum, mushroom, cheese, chili, smoked turkey) served with sliced bread, grilled tomato & mushroom',
    longdescription: '',
    price: 32,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736435272/empty_awsuzn.png', // Replace with hosted image URL
    categoryTitles: ['Breakfast (From 10:00 Till 12:00)'], // Category titles to link
  },
  {
    name: 'Grilled Halloumi',
    shortdesc: 'Served with fresh vegetable cuts',
    longdescription: '',
    price: 25,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736435272/empty_awsuzn.png', // Replace with hosted image URL
    categoryTitles: ['Breakfast (From 10:00 Till 12:00)'], // Category titles to link
  },
  {
    name: 'OWL Breakfast Sandwich',
    shortdesc: 'Toasted croissant filled with ice burg, tomato, smoked turkey, fried egg, and cheese',
    longdescription: '',
    price: 32,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736435272/empty_awsuzn.png', // Replace with hosted image URL
    categoryTitles: ['Breakfast (From 10:00 Till 12:00)'], // Category titles to link
  },
  {
    name: 'French Toast',
    shortdesc: 'Served with whipped cream, and caramel syrup',
    longdescription: '',
    price: 32,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736435272/empty_awsuzn.png', // Replace with hosted image URL
    categoryTitles: ['Breakfast (From 10:00 Till 12:00)'], // Category titles to link
  },
  {
    name: 'Kima & Purri',
    shortdesc: 'Minced lamb, onion, ginger, garlic, tomato',
    longdescription: '',
    price: 20,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736435272/empty_awsuzn.png', // Replace with hosted image URL
    categoryTitles: ['Breakfast (From 10:00 Till 12:00)'], // Category titles to link
  },
  {
    name: 'Porrata',
    shortdesc: '2 pcs (Plain - Cheese)',
    longdescription: '',
    price: 12,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736435272/empty_awsuzn.png', // Replace with hosted image URL
    categoryTitles: ['Breakfast (From 10:00 Till 12:00)'], // Category titles to link
  },
  {
    name: 'Saj & Manakish',
    shortdesc: '(Zattar - Cheese - Mohamamara - mix) served with fresh vegetable cuts',
    longdescription: '',
    price: 18,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736435272/empty_awsuzn.png', // Replace with hosted image URL
    categoryTitles: ['Breakfast (From 10:00 Till 12:00)'], // Category titles to link
  },
  {
    name: 'Lintel Soup',
    shortdesc: 'Served in bread ball',
    longdescription: 'Served in bread ball',
    price: 19,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736480495/SO-LINTEL_g0g0ce.jpg', // Replace with hosted image URL
    categoryTitles: ['Soup'], // Category titles to link
  },
  {
    name: 'Mushroom Cream Soup',
    shortdesc: 'Served in bread ball',
    longdescription: 'Served in bread ball <br/> Add Chicken 5 AED',
    price: 22,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736480499/SO-MUSHROOM_axkz8y.jpg', // Replace with hosted image URL
    categoryTitles: ['Soup'], // Category titles to link
  },
  {
    name: 'Seafood Soup',
    shortdesc: 'Served in bread ball',
    longdescription: 'Served in bread ball',
    price: 35,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736480507/SO-SEAFOOD_y9xjir.jpg', // Replace with hosted image URL
    categoryTitles: ['Soup'], // Category titles to link
  },
  {
    name: 'Tom Yam Kong Soup',
    shortdesc: 'chicken & mix seafood, ginger, onion, mushroom, tomato, tom yam paste, lemon grass',
    longdescription: 'chicken & mix seafood, ginger, onion, mushroom, tomato, tom yam paste, lemon grass',
    price: 35,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736480514/SO-TOM-YAM_psifpn.jpg', // Replace with hosted image URL
    categoryTitles: ['Soup'], // Category titles to link
  },

  {
    name: 'Sweetcorn Soup',
    shortdesc: 'capsicum, sweetcorn, tomato, coriander',
    longdescription: 'capsicum, sweetcorn, tomato, coriander',
    price: 19,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736480511/SO-SWEETCORN_minzhx.jpg', // Replace with hosted image URL
    categoryTitles: ['Soup'], // Category titles to link
  },
  {
    name: 'Vegetable Lemon Coriander Soup',
    shortdesc: 'carrot, baby corn, mushroom, cauliflower, broccoli, lemon & coriander clear coup',
    longdescription: 'carrot, baby corn, mushroom, cauliflower, broccoli, lemon & coriander clear coup',
    price: 19,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736480494/SO-LEMON-COR_r5ddda.jpg', // Replace with hosted image URL
    categoryTitles: ['Soup'], // Category titles to link
  },
  {
    name: 'Vegetable Manchao Soup',
    shortdesc: 'cabbage, carrot, ginger, garlic, red chilli paste, soy sauce',
    longdescription: 'cabbage, carrot, ginger, garlic, red chilli paste, soy sauce <br/> Add chicken 5 AED',
    price: 22,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736480495/SO-MACHAO_uznvec.jpg', // Replace with hosted image URL
    categoryTitles: ['Soup'], // Category titles to link
  },
  {
    name: 'Hummus',
    shortdesc: 'Served in three flavors (authentic tahina & lemon, beetroot , and avocado)',
    longdescription: 'Served in three flavors (authentic tahina & lemon, beetroot , and avocado)',
    price: 26,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481409/SA-HUMMUS_qjube5.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'Hummus Beiruty',
    shortdesc: 'With pinenus on top',
    longdescription: '',
    price: 26,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481400/Hummus_beirut-20_ggnvhp.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'Motabal',
    shortdesc: 'Served in three flavors (authentic tahina & lemon, beetroot , and pumpkin)',
    longdescription: 'Served in three flavors (authentic tahina & lemon, beetroot , and pumpkin)',
    price: 26,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481414/SA-MOTABAL_bz76ur.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'Baba Ghanoj',
    shortdesc: 'Grilled eggplant, mixed capsicum, onion, tomato, parsley, pomogrenate, olive oil',
    longdescription: '',
    price: 19,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481381/Baba_ghanoj-18_oz3kv6.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'Vegetable Stuffed Vine Leaves',
    shortdesc: 'Coked grape leaves stuffed with : rice, mixed capsicum, onion, tomato, parsley, pomogrenate, olive oil, mint',
    longdescription: '',
    price: 26,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481396/Grape_leaves-22_tulud5.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'OWL Mohamara',
    shortdesc: 'honey labneh, mohamara, wallnuts, Pistachio, aragula, red figs',
    longdescription: 'honey labneh, mohamara, wallnuts, Pistachio, aragula, red figs',
    price: 32,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481410/SA-MOHAMARA_ijldjz.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'Fattoush',
    shortdesc: 'Lettuce, tomato, cucumber, red radish, watercress, zattar, mint, pomegranate, fried bread, lemon, olive oil',
    longdescription: '',
    price: 32,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481382/Fattoush_salad-25_r4ykid.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'Tabouleh',
    shortdesc: 'Parsley, red burgol, onion, tomato, lemon, olive oil',
    longdescription: '',
    price: 29,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481420/Tabbouleh_salad-25_ge0mmm.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'Chicken Caesar Salad',
    shortdesc: 'iceberg, garlic croutons, parmesan & caesar sauce, grilled chicken breast',
    longdescription: 'iceberg, garlic croutons, parmesan & caesar sauce, grilled chicken breast',
    price: 38,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481405/SA-CAESAR_f4g69i.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'Pomelo Avocado Sweetcorn Salad',
    shortdesc: 'mixed lettuce, avocado, sweetcorn, pomelo, cherry tomato, baby corn, with OWL honey mustard sauce',
    longdescription: 'mixed lettuce, avocado, sweetcorn, pomelo, cherry tomato, baby corn, with OWL honey mustard sauce',
    price: 39,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481416/SA-POMELO_AVO_shbub3.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'Seafood Salad',
    shortdesc: 'mixed lettuce, cherry tomato, mushroom, baby corn, mixed seafood with cocktail sauce',
    longdescription: 'mixed lettuce, cherry tomato, mushroom, baby corn, mixed seafood with cocktail sauce',
    price: 42,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481995/SA-SEAFOOD_ofujki.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'Avocado Fruit Salad',
    shortdesc: 'mixed lettuce, orange, strawberry, mango, avocado, red figs, Served with caesar sauce',
    longdescription: 'mixed lettuce, orange, strawberry, mango, avocado, red figs, Served with caesar sauce',
    price: 34,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481404/SA-AVO_FRUIT_yyma5s.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'OWL Salad',
    shortdesc: 'mixed lettuce, orange, baby corn, red figs, walnut, mushroom, with honey mustard sauce',
    longdescription: 'mixed lettuce, orange, baby corn, red figs, walnut, mushroom, with honey mustard sauce',
    price: 38,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736481994/Owl_salad-35_poiae9.jpg', // Replace with hosted image URL
    categoryTitles: ['Cold Appetizers & Salads'], // Category titles to link
  },
  {
    name: 'Hummus Shawarma',
    shortdesc: 'authentic oriental hummus topped with your choice of chicken or meat shawarma',
    longdescription: 'authentic oriental hummus topped with your choice of chicken or meat shawarma',
    price: 38,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482625/HUMMUS_SHAWARMA_qboavp.jpg', // Replace with hosted image URL
    categoryTitles: ['Hot Appetizers'], // Category titles to link
  },
  {
    name: 'Hummus with Meat & Pine nuts',
    shortdesc: 'Classic hummus topped with tender chunks of seasoned meat, pine nuts, and a drizzle of olive oil.',
    price: 35,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482626/Hummus_with_meat-30_uf8bt8.jpg',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'French Fries',
    shortdesc: '',
    price: 18,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488645/empty_mqdoxb.png',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'Potato with Meat',
    shortdesc: 'potato & meat sauteed with olive oil, onion, garlic, coriander',
    longdescription: 'potato & meat sauteed with olive oil, onion, garlic, coriander',
    price: 36,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482630/MUSHROOM_MEAT_ikvszg.jpg',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'Potato Harra',
    shortdesc: 'authentic oriental spicy potato',
    longdescription: 'authentic oriental spicy potato',
    price: 29,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482632/POTATO_HARRA_dfxgy1.jpg',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'Spinach Fatayer',
    shortdesc: 'deep fried spinach fatayer Served with pomegranate molasses',
    longdescription: 'deep fried spinach fatayer Served with pomegranate molasses',
    price: 25,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482633/SPINACH_dhmlup.jpg',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'Cheese Loaded Fries',
    shortdesc: 'topped with melted cheddar & mozzarella, jalapeno, mushroom, sweetcorn, smoked turkey',
    longdescription: 'topped with melted cheddar & mozzarella, jalapeno, mushroom, sweetcorn, smoked turkey',
    price: 35,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482628/LOADED_FRIES_qxq7ld.jpg',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'Fried Calamari',
    shortdesc: 'Served with tartar sauce',
    longdescription: 'Served with tartar sauce',
    price: 38,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482621/FRIED_CALAMARI_eb5blb.jpg',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'Cheese Roll',
    shortdesc: 'Crispy rolls filled with melted cheese and herbs, a perfect start to your meal.',
    price: 25,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482601/Cheese_roll-20_qth1hp.jpg',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'Chicken Liver with Pomegranate',
    shortdesc: 'Tender chicken livers cooked with pomegranate molasses for a sweet and tangy flavor.',
    price: 37,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482613/Chicken_liver_with_pomegranate-30_jmyn9c.jpg',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'Dynamite Shrimp',
    shortdesc: 'Crispy shrimp tossed in a creamy, spicy sauce that will set your taste buds alight.',
    price: 40,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482615/Dynamite_shrimp-30_qliykg.jpg',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'Friad Kibbeh',
    shortdesc: 'Deliciously spiced and fried kibbeh balls, a crispy outside with a savory meaty inside.',
    price: 35,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482619/Friad_kibbeh-22_curnfp.jpg',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'Grilled Halloumi',
    shortdesc: 'Slices of firm and salty halloumi cheese, grilled to golden perfection.',
    price: 25,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736482623/grilld_halloumi-19_ljxw5m.jpg',
    categoryTitles: ['Hot Appetizers'],
  },
  {
    name: 'Bolognaise Pasta',
    shortdesc: 'Minced beef & tomato sauce, basil, oregano, parmesan.',
    longdescription: '',
    price: 46,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483565/BOLOGNAISE_ykt6ka.jpg',
    categoryTitles: ['	Pasta'],
  },
  {
    name: 'Pasta Ala Pesto',
    shortdesc: 'Olive oil & pesto sauce, pine seeds, basil, oregano, parmesan.',
    longdescription: '',
    price: 39,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483563/ALA_PESTO_imqjb2.jpg',
    categoryTitles: ['Pasta'],
  },
  {
    name: 'Seafood Pink Pasta',
    shortdesc: 'Mix seafood with tomato & cream sauce, basil, oregano, parmesan.',
    longdescription: '',
    price: 49,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483571/SEAFOOD_PASTA_wiqbbj.jpg',
    categoryTitles: ['Pasta'],
  },
  {
    name: 'Pasta Arrabbiata',
    shortdesc: 'onion, garlic, tomato sauce, chili, olive oil, basil, oregano, parmesan.',
    longdescription: '',
    price: 39,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483567/Pasta_arrabbiata_30_weitjx.jpg',
    categoryTitles: ['Pasta'],
  },
  {
    name: 'Alfredo Pasta',
    shortdesc: 'grilled chicken breast & mushroom, pechamelle sauce, basil, oregano, parmesan.',
    longdescription: '',
    price: 46,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483568/Pasta_fettuccine-30_mbt0jn.jpg',
    categoryTitles: ['Pasta'],
  },
  {
    name: 'Margherita Pizza',
    shortdesc: 'Topped with pizza sauce & mozarella.',
    longdescription: '',
    price: 34,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483914/Margherita_Pizza-_27_xxzod8.jpg',
    categoryTitles: ['Pizza'],
  },
  {
    name: 'Vegetable Pizza',
    shortdesc: 'Topped with pizza sauce, mozarella, mushroom, onion, tomato, capsicum, olives, sweetcorn.',
    longdescription: '',
    price: 34,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483937/Veg_Pizza_-30_x1iv0v.jpg',
    categoryTitles: ['Pizza'],
  },
  {
    name: 'Pepperoni Pizza',
    shortdesc: 'Topped with pizza sauce, mozarella, pepperoni.',
    longdescription: '',
    price: 39,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483927/Pepperoni_Pizza_-_30_co4nkg.jpg',
    categoryTitles: ['Pizza'],
  },
  {
    name: 'Chicken BBQ',
    shortdesc: 'Topped with pizza sauce, mozarella, mushroom, capsicum, olives, grilled chicken breast & barbeque sauce.',
    longdescription: '',
    price: 39,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483913/BBQPizza35_sicwxs.jpg',
    categoryTitles: ['Pizza'],
  },
  {
    name: 'Dynamite Seafood',
    shortdesc: 'Topped with pizza sauce, mozarella, onion, mushroom, mix seafood & dynamite sauce.',
    longdescription: '',
    price: 48,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483931/Seafood_Pizza_-40_yg5e1h.jpg',
    categoryTitles: ['Pizza'],
  },
  {
    name: 'Create Your Own Pizza',
    shortdesc: 'Pizza sauce, mozarella, and your choice of toppings: (onion, tomato, capsicum, chili, mushroom, olives, grilled chicken breast, smoked turkey, sweetcorn, shrimps, mix seafood, pepperoni, parmesan, cheddar, feta).',
    longdescription: '',
    price: 55,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483930/Sausage_Pizza_-35_v0edma.jpg',
    categoryTitles: ['Pizza'],
  },
  {
    name: 'OWL Extreme Pizza',
    shortdesc: '(Enough for 4 - 6 PAX) with 4 flavors of your choice.',
    longdescription: '',
    price: 84,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736483914/Margherita_Pizza-_27_xxzod8.jpg',
    categoryTitles: ['Pizza'],
  },
  {
    name: 'Cheese (Add Zattar - Add Mohamarah)',
    shortdesc: 'Served with fresh vegetable cuts.',
    longdescription: '',
    price: 20,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736484387/Akkawi_cheese-15_s69lbx.jpg',
    categoryTitles: ['Manakish & Saj'],
  },
  {
    name: 'Zattar',
    shortdesc: 'Served with fresh vegetable cuts.',
    longdescription: '',
    price: 18,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736484431/Zatar_manousheh-12_pf0oso.jpg',
    categoryTitles: ['Manakish & Saj'],
  },
  {
    name: 'Mohammarah',
    shortdesc: 'Served with fresh vegetable cuts.',
    longdescription: '',
    price: 18,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736484427/Spicy_cheese-20_xnvxzr.jpg',
    categoryTitles: ['Manakish & Saj'],
  },
  {
    name: 'Lahm Baajeen (Add Cheese)',
    shortdesc: 'Served with fresh vegetable cuts </br> can’t be Saj.',
    longdescription: '',
    price: 25,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736484418/Meet_manousheh-20_olp7sb.jpg',
    categoryTitles: ['Manakish & Saj'],
  },
  {
    name: 'Labneh with Vegetable',
    shortdesc: 'Served with fresh vegetable cuts.',
    longdescription: '',
    price: 20,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736484408/Labneh_with_vegteabie-10_tmjqnb.jpg',
    categoryTitles: ['Manakish & Saj'],
  },
  {
    name: 'Halloumi',
    shortdesc: 'Served with fresh vegetable cuts.',
    longdescription: '',
    price: 22,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736484401/Halloumi_cheese-15_cxrval.jpg',
    categoryTitles: ['Manakish & Saj'],
  },
  {
    name: 'Cream & Honey',
    shortdesc: '',
    longdescription: '',
    price: 25,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736484401/Halloumi_cheese-15_cxrval.jpg',
    categoryTitles: ['Manakish & Saj'],
  },
  {
    name: 'Nutella Banana',
    shortdesc: '',
    longdescription: '',
    price: 25,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736484424/Nutella_banana-22_iyfztl.jpg',
    categoryTitles: ['Manakish & Saj'],
  },
  {
    name: 'Beef Sizziling',
    shortdesc: '(Chicken - Beef - Seafood) onion, garlic, capsicum, oyster sauce & Soy Sauce',
    longdescription: '',
    price: 43,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485500/Beef_sizziling_emjuz8.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Fajitta',
    shortdesc: '(Chicken Beef - Seafood) onion, garlic, capsicum, mushroom, sweetcorn, soy sauce, smoked paprika, topped with mozzarella, and Served with tortillas',
    longdescription: '(Chicken Beef - Seafood) onion, garlic, capsicum, mushroom, sweetcorn, soy sauce, smoked paprika, topped with mozzarella, and Served with tortillas',
    price: 43,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485569/FAJITTA_h7wian.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Escalope Melanaise',
    shortdesc: 'deep fried breaded chicken breast topped with tomato sauce and mozzarella, Served with coleslaw and fries',
    longdescription: 'deep fried breaded chicken breast topped with tomato sauce and mozzarella, Served with coleslaw and fries',
    price: 44,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485608/MELANAISE_a79smw.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Chicken Cordon Blu',
    shortdesc: 'deep fried chicken breast filled with mushroom, smoked turkey, and mozzarella, Served with béchamel sauce, fries, and sautéed vegetables',
    longdescription: 'deep fried chicken breast filled with mushroom, smoked turkey, and mozzarella, Served with béchamel sauce, fries, and sautéed vegetables',
    price: 68,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485567/CORDON_BLU_reep0a.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Lobster Termador',
    shortdesc: 'topped with mushroom & melted cheese',
    longdescription: 'topped with mushroom & melted cheese',
    price: 98,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485620/TERMADOR_sfp5qk.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Grilled Jambo Shrimp with Lemon Butter Sauce',
    shortdesc: 'Served with sautéed vegetables & fries',
    longdescription: 'Served with sautéed vegetables & fries',
    price: 69,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485571/JAMBO_SHRIMP_bb7ewz.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Grilled Salmon Fillet with Lemon Butter Sauce',
    shortdesc: 'Served with sautéed vegetables & fries',
    longdescription: 'Served with sautéed vegetables & fries',
    price: 75,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485610/SALMON_kbuplp.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Grilled Mix Seafood',
    shortdesc: 'With Lemon Butter Sauce, served with Sautéed Vegetables & fries',
    longdescription: '',
    price: 98,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485602/Laboster_alfredo-110_bgdpnt.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Fish Sayadiah',
    shortdesc: 'authentic oriental fish sayadiah',
    longdescription: 'authentic oriental fish sayadiah',
    price: 58,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485612/SAYADIAH_fzune9.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Chicken Shawarma Stand 300 G',
    shortdesc: 'Served with fries',
    longdescription: 'Served with fries',
    price: 48,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485565/CHICKEN_SHAWRMA_gesbyv.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Grilled Chicken breast with lemon butter sauce',
    shortdesc: 'Grilled chicken breast Served with your choice of sides.',
    longdescription: '',
    price: 55,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485559/Chicken_breast-45_wifh3l.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Chicken escalope',
    shortdesc: 'Tender chicken breast coated in breadcrumbs and fried until golden brown.',
    longdescription: '',
    price: 40,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485563/Chicken_escalope-45_v1zrhx.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Kofta tahini',
    shortdesc: 'Spiced meatballs cooked in a creamy tahini sauce.',
    longdescription: '',
    price: 58,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485573/Kofta_tahini-60_d3lybz.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Kofta tomato',
    shortdesc: 'Meatballs cooked in a flavorful tomato sauce.',
    longdescription: '',
    price: 58,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485574/Kofta_tomato-60_k2rq6a.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Lamb Ozzi',
    shortdesc: 'A traditional Middle Eastern dish featuring slow-cooked lamb with aromatic spices.',
    longdescription: '',
    price: 68,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485621/Uzzi_kharoof-59_hzywpx.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Shawarma owl',
    shortdesc: 'Succulent pieces of owl meat wrapped in pita bread with veggies and sauce.',
    longdescription: '',
    price: 39,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485616/Shawarma_owl-45_s5zysy.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Grill Beef tenderloin fillet',
    shortdesc: 'With mushroom sauce',
    longdescription: '',
    price: 68,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485618/Steak_fillet-55_xtkpyk.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Shawarma beef',
    shortdesc: 'Thinly sliced marinated beef wrapped in pita bread with veggies and sauce.',
    longdescription: '',
    price: 55,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485614/Shawarma_beef-50_kp8auo.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Chicken Bread Bowl',
    shortdesc: 'A hearty bread bowl filled with tender chicken and vegetables.',
    longdescription: '',
    price: 39,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736485530/Chicken_bread_bowl-25_vyewe1.jpg',
    categoryTitles: ['Main Course']
  },
  {
    name: 'Araes',
    shortdesc: 'Delicious pita bread stuffed with a mixture of spiced meat, grilled to perfection.',
    longdescription: '',
    price: 38,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486714/Araes-30_goydpi.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: 'Shish tawook',
    shortdesc: 'Tender pieces of marinated chicken grilled to perfection.',
    longdescription: '',
    price: 45,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486759/Shish_tawook-35_mh9yuc.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: 'Half Grilled Chicken',
    shortdesc: 'Tender boneless chicken marinated and grilled to perfection.',
    longdescription: '',
    price: 36,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486742/Chicken_boneless-48_c20xwg.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: 'Profensal Grilled Chicken Wings',
    shortdesc: 'Grilled oriental marinated chicken wing & lemon coriander sauce, Served with fries.',
    longdescription: 'Grilled oriental marinated chicken wing & lemon coriander sauce, Served with fries.',
    price: 30,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486761/WING_PROF_kydbpo.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: 'Kebab halabi',
    shortdesc: 'Traditional Syrian kebabs seasoned with Halabi spices.',
    longdescription: '',
    price: 48,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486747/Kebab_halabi-40_bl3eq9.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: 'Eggplant Kabab',
    shortdesc: 'Authentic oriental grilled lamb kofta with aubergine, Served with fries.',
    longdescription: 'Authentic oriental grilled lamb kofta with aubergine, Served with fries.',
    price: 48,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486744/EGGPLANT_KABAB_y2nt32.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: 'Kebab khashkhash',
    shortdesc: 'Succulent kebabs coated with poppy seeds for added crunchiness.',
    longdescription: '',
    price: 48,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486749/Kebab_khashkhash-40_u0nf1y.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: 'Kebab Orfali',
    shortdesc: 'Authentic oriental grilled lamb kofta with cherry sauce, Served with fries.',
    longdescription: 'Authentic oriental grilled lamb kofta with cherry sauce, Served with fries.',
    price: 55,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486747/Kebab_halabi-40_bl3eq9.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: 'Cherry Kabab',
    shortdesc: 'Authentic oriental grilled lamb kofta with cherry sauce, Served with fries.',
    longdescription: 'Authentic oriental grilled lamb kofta with cherry sauce, Served with fries.',
    price: 55,
    rating: 0,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486740/CHERRY_KOFTA_mpm9wy.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: 'Lamb Tikka',
    shortdesc: 'Traditional Arabic grilled meat dish with a blend of spices.',
    longdescription: '',
    price: 60,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486755/Shaqaf-55_k42h2m.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: 'Lamb chops',
    shortdesc: 'Juicy lamb chops seasoned and grilled to perfection.',
    longdescription: '',
    price: 65,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486751/Lamb_chops-49_dakb4n.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: 'Mix grills',
    shortdesc: 'A variety of grilled meats including chicken, lamb, and kebabs.',
    longdescription: '',
    price: 73,
    rating: 4,
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736486753/Mix_grills-60_irxlyc.jpg',
    categoryTitles: ['Grill']
  },
  {
    name: "Suneri Panner Tikka",
    shortdesc: "served with mint chuttny",
    longdescription: "",
    price: 36,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488669/Suneri_Kebab_Paneer_iuzqhh.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Samosa Chatt",
    shortdesc: "veg samosa with sweet rita, mint chuttny, pappri, pomegranate seeds",
    longdescription: "veg samosa with sweet rita, mint chuttny, pappri, pomegranate seeds",
    price: 30,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488667/SAMOSA_CHAT_fbtj8c.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Beetroot Kebab",
    shortdesc: "served with mint chutnny",
    longdescription: "",
    price: 36,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488074/Beetroot_kebab_py8gxv.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Bangkok Fried Chicken",
    shortdesc: "served with mint chutnny",
    longdescription: "served with mint chutnny",
    price: 30,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488645/empty_mqdoxb.png",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Lamb boti kebab",
    shortdesc: "served with mint chuttny",
    longdescription: "",
    price: 40,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488653/Lamb_boti_kebab-49_iwmzvo.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "mutton buna gost",
    shortdesc: "",
    longdescription: "",
    price: 48,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488659/mutton_buna_gost-0_fhvz4v.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Chill Paneer",
    shortdesc: "deep fried paneer in red chili sauce",
    longdescription: "",
    price: 33,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488645/empty_mqdoxb.png",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Masala Pappard",
    shortdesc: "pappard, tomato, cucumber, onion, green chili, coriander, lemon juice",
    longdescription: "pappard, tomato, cucumber, onion, green chili, coriander, lemon juice",
    price: 16,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488655/MASALA_PAP_y4gm2c.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Street Mombai Vigge Sandwich",
    shortdesc: "mayo, lettuce, tomato, onion, cheese, Served with coleslaw & fries",
    longdescription: "mayo, lettuce, tomato, onion, cheese, Served with coleslaw & fries",
    price: 26,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488657/MOMBAI_STREET_toxyp8.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Biryani",
    shortdesc: "(Veg - Chicken - Mutton) served with rita, fresh vegetable Cuts",
    longdescription: "",
    price: 40,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488153/Biryani_chicken-40_sabktr.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Khadai prawns",
    shortdesc: "served with fresh vegetable Cuts",
    longdescription: "",
    price: 46,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488651/Khadai_prawns-35_fzdx7e.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Prawn masala and Fish goan curry",
    shortdesc: "",
    longdescription: "",
    price: 50,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488661/Prawn_masala-and_Fish_goan_curry-55_j0wzjf.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Butter chicken",
    shortdesc: "served with fresh vegetable Cuts",
    longdescription: "",
    price: 39,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488643/Butter_chicken-29_mbwh5w.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Pumpkin Curry",
    shortdesc: "Served with fresh vegetable cuts",
    longdescription: "Served with fresh vegetable cuts",
    price: 39,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488663/PUMPKIN_CURRY_sqifl1.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Red Thai Curry",
    shortdesc: "(Veg - Chicken - Seafood) Served with fresh vegetable cuts",
    longdescription: "(Veg - Chicken - Seafood) Served with fresh vegetable cuts",
    price: 46,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488665/RED_THAI_swe1s4.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Egg Hakka Noodles",
    shortdesc: "(Veg - Chicken - Beef - Seafood - MIX) carrot, cabbage, onion, capsicum, noodles",
    longdescription: "(Veg - Chicken - Beef - Seafood - MIX) carrot, cabbage, onion, capsicum, noodles",
    price: 40,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488649/HAKKA_NOODLES_bfpady.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Sweet & Sour Chicken",
    shortdesc: "",
    longdescription: "",
    price: 35,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488671/SWEET_SOUR_v8dr57.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Asian Burned Garlic Fried Rice",
    shortdesc: "(Veg - Chicken - Beef - Seafood - MIX) carrot, cabbage, onion, capsicum, rice, egg",
    longdescription: "(Veg - Chicken - Beef - Seafood - MIX) carrot, cabbage, onion, capsicum, rice, egg",
    price: 40,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488647/FRIED_RICE_bkepxm.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Sizwan Chicken",
    shortdesc: "Served in sizwan sauce",
    longdescription: "Served in sizwan sauce",
    price: 35,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736488645/empty_mqdoxb.png",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Chicken tikka masala",
    shortdesc: "",
    longdescription: "",
    price: 39,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736489352/Chicken_tikka_masala-_2_odwpse.jpg",
    categoryTitles: ["Indian / Asian"]
  },
  {
    name: "Angus Beef Burger",
    shortdesc: "classic beef burger, Served with coleslaw and fries",
    longdescription: "classic beef burger, Served with coleslaw and fries",
    price: 46,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736499602/BURGER_urfna9.jpg",
    categoryTitles: ["Burgers & Sandwiches"]
  },
  {
    name: "Grilled Chicken Burger",
    shortdesc: "grilled chicken breast burger, Served with coleslaw and fries",
    longdescription: "grilled chicken breast burger, Served with coleslaw and fries",
    price: 39,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736499717/BURGER_CHICKEN_r6udx5.jpg",
    categoryTitles: ["Burgers & Sandwiches"]
  },
  {
    name: "Chicken Zinger",
    shortdesc: "fried chicken breast burger, Served with coleslaw and fries",
    longdescription: "fried chicken breast burger, Served with coleslaw and fries",
    price: 39,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736499717/BURGER_CHICKEN_r6udx5.jpg",
    categoryTitles: ["Burgers & Sandwiches"]
  },
  {
    name: "BBQ Burger",
    shortdesc: "(chicken - beef) with smoked turkey and barbeque sauce, Served with coleslaw and fries",
    longdescription: "(chicken - beef) with smoked turkey and barbeque sauce, Served with coleslaw and fries",
    price: 49,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736499602/BURGER_urfna9.jpg",
    categoryTitles: ["Burgers & Sandwiches"]
  },
  {
    name: "Shish Tawok Sandwich",
    shortdesc: "Served with fries",
    longdescription: "Served with fries",
    price: 39,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736499601/SHISH_SANDWICH_hbt9sp.jpg",
    categoryTitles: ["Burgers & Sandwiches"]
  },
  {
    name: "Kabab Halabi Sandwich",
    shortdesc: "Served with fries",
    longdescription: "Served with fries",
    price: 39,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736499601/KABAB_SANDWICH_uedsnl.jpg",
    categoryTitles: ["Burgers & Sandwiches"]
  },
  {
    name: "Arabic bread",
    shortdesc: "Traditional Arabic flatbread.",
    longdescription: "",
    price: 0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500333/Arabic_bread-6_pq7ahf.jpg",
    categoryTitles: ["Bread"]
  },
  {
    name: "Naan",
    shortdesc: "Available Butter, Plain, Garlic",
    longdescription: "",
    price: 6,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500334/ButterNaan-6_f9mokn.jpg",
    categoryTitles: ["Bread"]
  },
  {
    name: "Kulcha",
    shortdesc: "Available Butter, Plain, Garlic",
    longdescription: "",
    price: 6,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500334/kulcha_plain-9_bskhuy.jpg",
    categoryTitles: ["Bread"]
  },
  {
    name: "Chapati",
    shortdesc: "Soft and fluffy Indian bread topped with garlic and coriander.",
    longdescription: "",
    price: 3,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500333/empty_sj8ra2.png",
    categoryTitles: ["Bread"]
  },
  {
    name: "Poratta",
    shortdesc: "",
    longdescription: "",
    price: 6,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500333/empty_sj8ra2.png",
    categoryTitles: ["Bread"]
  },
  {
    name: "Mix Bread",
    shortdesc: "A selection of assorted bread varieties.",
    longdescription: "",
    price: 15,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500335/mix_bread-20_yda7bx.jpg",
    categoryTitles: ["Bread"]
  },
  {
    name: "Kunafa Cheese",
    shortdesc: "authentic arabic cheese kunafa",
    longdescription: "authentic arabic cheese kunafa",
    price: 27,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500917/SW-OWL_KUNAFA_rvq9l4.jpg",
    categoryTitles: ["Desserts"]
  },
  {
    name: "Kunafa Ashta",
    shortdesc: "authentic arabic cream kunafa",
    longdescription: "authentic arabic cream kunafa",
    price: 27,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500917/SW-OWL_KUNAFA_rvq9l4.jpg",
    categoryTitles: ["Desserts"]
  },
  {
    name: "OWL Kunafa",
    shortdesc: "ashta kunafa topped with mango, strawberry, red figs & luttus",
    longdescription: "ashta kunafa topped with mango, strawberry, red figs & luttus",
    price: 48,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500917/SW-OWL_KUNAFA_rvq9l4.jpg",
    categoryTitles: ["Desserts"]
  },
  {
    name: "Espresso Cake",
    shortdesc: "",
    longdescription: "",
    price: 28,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500910/ESPRESSO_CAKE_gp4zhr.jpg",
    categoryTitles: ["Desserts"]
  },
  {
    name: "Mango Tiramisu",
    shortdesc: "",
    longdescription: "",
    price: 39,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500916/MANGO_CAKE_dnaipy.jpg",
    categoryTitles: ["Desserts"]
  },
  {
    name: "Devil Chocolate Cake",
    shortdesc: "",
    longdescription: "",
    price: 28,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500910/DEVEL_CHOCO_l4oxcz.jpg",
    categoryTitles: ["Desserts"]
  },
  {
    name: "Oum Ali",
    shortdesc: "traditional oriental toasted buttered puffs cooked with milk & rose water, nuts",
    longdescription: "traditional oriental toasted buttered puffs cooked with milk & rose water, nuts",
    price: 27,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500916/SW-OUM_ALI_slzosw.jpg",
    categoryTitles: ["Desserts"]
  },
  {
    name: "Rice Pudding",
    shortdesc: "traditional oriental rice pudding cooked with milk & rose water",
    longdescription: "traditional oriental rice pudding cooked with milk & rose water",
    price: 16,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736500333/empty_sj8ra2.png",
    categoryTitles: ["Desserts"]
  },
  {
    name: "Affogato",
    shortdesc: "A delightful espresso-based dessert topped with ice cream.",
    longdescription: "A classic Italian dessert where hot espresso is poured over creamy vanilla ice cream, creating a perfect balance of warmth and coldness.",
    price: 20,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501467/affogato-20_gik8mt.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Americano",
    shortdesc: "A smooth and simple black coffee.",
    longdescription: "A classic Americano made with a shot of espresso diluted with hot water for a rich yet mild flavor.",
    price: 17,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501467/americano-17_pdifil.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Anise",
    shortdesc: "A soothing herbal infusion of anise seeds.",
    longdescription: "An aromatic and comforting hot drink, perfect for relaxation and digestion.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501468/anise-15_bct8gd.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Cappuccino",
    shortdesc: "A classic Italian coffee with frothy milk.",
    longdescription: "Rich espresso combined with steamed milk and a thick layer of foam, perfect for any time of day.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501468/cappuccino-15_ht9p1n.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Coffee Latte",
    shortdesc: "A creamy and smooth coffee experience.",
    longdescription: "A delicious combination of espresso and steamed milk with a light foam topping.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501468/coffee_latte-15_xpo9c1.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Espresso-Double",
    shortdesc: "A strong and bold double shot of espresso.",
    longdescription: "Double the richness and intensity for coffee enthusiasts who enjoy robust flavors.",
    price: 19,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501474/Espresso_double-19_cdnlty.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Espresso Single",
    shortdesc: "A classic single shot of espresso.",
    longdescription: "Pure, rich, and aromatic espresso to kickstart your day.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501474/Espresso_double-19_cdnlty.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Ginger Honey Lemon",
    shortdesc: "A refreshing blend of ginger, honey, and lemon.",
    longdescription: "A natural and healthy hot drink, ideal for boosting immunity and soothing colds.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501478/Ginger_Honey_Lemon-15_xhzclh.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Green Tea",
    shortdesc: "A light and rejuvenating green tea.",
    longdescription: "Brewed to perfection for a calming and antioxidant-rich experience.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501479/green_tea-15_jjjwut.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Herbs",
    shortdesc: "A warm herbal infusion.",
    longdescription: "Carefully selected herbs blended to create a soothing and aromatic drink.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501480/herbs-15_gmr578.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Hot Chocolate",
    shortdesc: "A rich, creamy delight.",
    longdescription: "A warm and indulgent drink made with premium cocoa and milk for a perfect cozy treat.",
    price: 18,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501483/hot_chocolate-18_pqyyul.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Karak",
    shortdesc: "Authentic spiced tea.",
    longdescription: "A traditional tea made with rich spices and creamy milk, perfect for any time of day.",
    price: 10,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501484/karak-10_w2zi6n.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Koshari Tea",
    shortdesc: "A special Egyptian blend.",
    longdescription: "Enjoy the unique flavors of koshari tea, a perfect harmony of aroma and taste.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501487/koshari_tea-15_rcaayf.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Macchiato",
    shortdesc: "Rich espresso blend.",
    longdescription: "An intense espresso with a splash of frothy milk, offering a bold coffee experience.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501488/macchiato-15_weq9g7.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Mint Tea",
    shortdesc: "Refreshing and soothing.",
    longdescription: "A rejuvenating tea infused with fresh mint leaves to calm your senses.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501489/mint-15_kfwa2b.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Mochaccino",
    shortdesc: "Chocolate-infused coffee.",
    longdescription: "A delightful combination of coffee and chocolate for the ultimate indulgence.",
    price: 18,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501488/macchiato-15_weq9g7.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Moroccan Tea (Small)",
    shortdesc: "Traditional Moroccan tea.",
    longdescription: "Savor the rich flavors of Moroccan tea, brewed with fresh mint and green tea leaves.",
    price: 18,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501495/moroccan_tea_small-18_wdjzyn.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Moroccan Tea (Medium)",
    shortdesc: "Larger Moroccan tea serving.",
    longdescription: "Experience the rich taste of Moroccan tea in a larger serving for more enjoyment.",
    price: 25,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501493/moroccan_tea_medium-25_bizyqs.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Nescafe Black",
    shortdesc: "Classic black coffee.",
    longdescription: "Bold and robust black coffee, perfect for kick-starting your day.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501497/nescafe_black-15_u4csku.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Nescafe with Milk",
    shortdesc: "Creamy and smooth coffee.",
    longdescription: "Classic Nescafe coffee enhanced with the smoothness of milk for a comforting taste.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501500/nescafe_with_milk-15_b08zhm.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Red Tea",
    shortdesc: "A classic herbal drink.",
    longdescription: "A light and refreshing tea made with natural red herbs, perfect for relaxing moments.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501501/red_tea-15_pcjpcp.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Sahlab",
    shortdesc: "A creamy delight.",
    longdescription: "A rich and creamy drink made with milk and fragrant orchid root, topped with nuts and cinnamon.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501502/sahlab-15_sqm78a.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Spanish Latte",
    shortdesc: "A sweet latte treat.",
    longdescription: "A perfect balance of espresso and sweetened milk, offering a smooth and flavorful experience.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501468/coffee_latte-15_xpo9c1.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Turkish Coffee Double",
    shortdesc: "Double the Turkish taste.",
    longdescription: "Enjoy the bold flavors of Turkish coffee in a double serving for a rich and aromatic experience.",
    price: 19,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501507/turkish_coffee_double-19_vxos3i.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Turkish Coffee Single",
    shortdesc: "Authentic Turkish coffee.",
    longdescription: "A single serving of finely ground Turkish coffee, brewed to perfection for a strong and flavorful drink.",
    price: 15,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501507/turkish_coffee_double-19_vxos3i.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "White Coffee",
    shortdesc: "Light and smooth.",
    longdescription: "A mild and aromatic coffee blend, perfect for those who enjoy a smooth and creamy taste.",
    price: 10,
    rating: 0,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736501509/white_coffee-10_zhpcth.jpg",
    categoryTitles: ["Hot Drink"]
  },
  {
    name: "Chocolate Frappuccino",
    shortdesc: "Rich and creamy chocolate-flavored frappuccino.",
    longdescription: "A decadent blend of rich chocolate and creamy goodness, topped with whipped cream for the ultimate indulgence.",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503593/chocolate_frappuccino-20_qdubfw.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "Cookies Frappuccino",
    shortdesc: "Delicious frappuccino flavored with cookies and cream.",
    longdescription: "A delightful frappuccino infused with cookies and cream, creating the perfect balance of sweetness and flavor.",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503593/chocolate_frappuccino-20_qdubfw.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "Hazelnut Frappuccino",
    shortdesc: "Indulgent frappuccino with the rich flavor of hazelnuts.",
    longdescription: "A creamy and smooth frappuccino with the delightful richness of hazelnuts, perfect for nut lovers.",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503593/caramel_frappuccino-20_htaui3.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "Ice Caramel",
    shortdesc: "Refreshing iced coffee with a hint of caramel sweetness.",
    longdescription: "A chilled coffee treat blended with caramel syrup for a refreshing and sweet experience.",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503597/ice_caramel-20_g4tk3i.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "Ice Coffee",
    shortdesc: "Classic iced coffee, perfect for a hot day.",
    longdescription: "A refreshing brew of coffee served over ice, ideal for coffee lovers seeking a classic chilled beverage.",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503600/ice_coffe-20_wfqbns.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "Ice Mocha",
    shortdesc: "Iced coffee blended with rich chocolate and topped with whipped cream.",
    longdescription: "A delicious combination of iced coffee and chocolate, topped with creamy whipped cream for a luxurious treat.",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503597/ice_caramel-20_g4tk3i.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "Ice Spanish Latte",
    shortdesc: "Refreshing Spanish latte served over ice.",
    longdescription: "A perfect blend of espresso and sweetened milk, served chilled over ice for a refreshing Spanish latte experience.",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503604/ice_spanish_latte_-20_yj4k8x.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "Ice Tea",
    shortdesc: "Classic iced tea, perfect for quenching your thirst.",
    longdescription: "A refreshing glass of iced tea made with premium tea leaves, perfect for any hot day.",
    price: 12,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503606/ice_tea-12_k9ke6n.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "Ice with Mocha",
    shortdesc: "Refreshing iced coffee with a hint of chocolate mocha flavor.",
    longdescription: "A delightful iced coffee drink infused with chocolate mocha, perfect for a quick energy boost.",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503607/ice_with_mocha-20_i3ysgk.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "Caramel Frappuccino",
    shortdesc: "Decadent frappuccino with a sweet caramel flavor.",
    longdescription: "A rich and creamy frappuccino blended with caramel syrup and topped with whipped cream for an indulgent treat.",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503593/caramel_frappuccino-20_htaui3.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "Mocha Frappuccino",
    shortdesc: "Indulgent frappuccino with rich chocolate and coffee flavors.",
    longdescription: "A creamy frappuccino that blends the bold flavors of coffee and rich chocolate, topped with whipped cream.",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503607/mocha_frappuccino-20_czfvip.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "Snickers Frappuccino",
    shortdesc: "Delicious frappuccino inspired by the flavors of Snickers candy bar.",
    longdescription: "A delightful frappuccino featuring the nutty, chocolatey, and caramel flavors of Snickers, topped with whipped cream.",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736503609/snickers_frappuccino-20_v6iq12.jpg",
    categoryTitles: ["Ice Coffee"]
  },
  {
    name: "7up Diet",
    shortdesc: "Refreshing diet version of the classic 7up, with no calories.",
    longdescription: "Refreshing diet version of the classic 7up, with no calories.",
    price: 12,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511051/7up_diet-12_qgbsvy.jpg",
    categoryTitles: ["Soft Drink"]
  },
  {
    name: "7up",
    shortdesc: "Crisp, clean, and refreshing lemon-lime soda with no caffeine.",
    longdescription: "Crisp, clean, and refreshing lemon-lime soda with no caffeine.",
    price: 12,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511056/7up-12_kddsi2.jpg",
    categoryTitles: ["Soft Drink"]
  },
  {
    name: "Barbican",
    shortdesc: "Non-alcoholic malt beverage, available in a variety of flavors.",
    longdescription: "Non-alcoholic malt beverage, available in a variety of flavors.",
    price: 12,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511057/barbican-12_fgtb6y.jpg",
    categoryTitles: ["Soft Drink"]
  },
  {
    name: "Miranda",
    shortdesc: "Fruity soda available in multiple flavors for a sweet, refreshing taste.",
    longdescription: "Fruity soda available in multiple flavors for a sweet, refreshing taste.",
    price: 12,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511060/miranda-12_wvq9je.jpg",
    categoryTitles: ["Soft Drink"]
  },
  {
    name: "Mountain Dew",
    shortdesc: "A bold, refreshing citrus-flavored soda that energizes and exhilarates.",
    longdescription: "A bold, refreshing citrus-flavored soda that energizes and exhilarates.",
    price: 12,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511060/miranda-12_wvq9je.jpg",
    categoryTitles: ["Soft Drink"]
  },
  {
    name: "Pepsi",
    shortdesc: "Iconic cola-flavored soda, offering a bold and refreshing taste.",
    longdescription: "Iconic cola-flavored soda, offering a bold and refreshing taste.",
    price: 12,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511063/pepsi-12_p7ekvz.jpg",
    categoryTitles: ["Soft Drink"]
  },
  {
    name: "Pepsi Diet",
    shortdesc: "Zero-calorie version of Pepsi, delivering the same bold, refreshing taste.",
    longdescription: "Zero-calorie version of Pepsi, delivering the same bold, refreshing taste.",
    price: 12,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511062/pepsi_diet-12_bksifv.jpg",
    categoryTitles: ["Soft Drink"]
  },
  {
    name: "Red Bull",
    shortdesc: "Energizing drink that increases performance, concentration, and reaction speed.",
    longdescription: "Energizing drink that increases performance, concentration, and reaction speed.",
    price: 15,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511068/red_bull-15_kxzuin.jpg",
    categoryTitles: ["Soft Drink"]
  },
  {
    name: "Small Water",
    shortdesc: "Pure, refreshing water to keep you hydrated throughout the day.",
    longdescription: "Pure, refreshing water to keep you hydrated throughout the day.",
    price: 5.5,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511069/small_water-5.5_gkt6xp.jpg",
    categoryTitles: ["Soft Drink"]
  },
  {
    name: "Smoothies Kiwi",
    shortdesc: "",
    longdescription: "",
    price: 17.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511527/smoothies_Kiwi-17_fu0nir.jpg",
    categoryTitles: ["Smoothies"]
  },
  {
    name: "Smoothies Mango",
    shortdesc: "",
    longdescription: "",
    price: 18.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511528/Smoothies_mango-18_sbrces.jpg",
    categoryTitles: ["Smoothies"]
  },
  {
    name: "Smoothies Orange",
    shortdesc: "",
    longdescription: "",
    price: 17.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511528/smoothies_orange-17_zcuhni.jpg",
    categoryTitles: ["Smoothies"]
  },
  {
    name: "Smoothies Strawberries",
    shortdesc: "",
    longdescription: "",
    price: 17.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511531/smoothies_strawberries-17_gcnyhi.jpg",
    categoryTitles: ["Smoothies"]
  },
  {
    name: "Smoothies Watermelon",
    shortdesc: "",
    longdescription: "",
    price: 18.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736511533/smoothies_watermellon-18_eggb60.jpg",
    categoryTitles: ["Smoothies"]
  },
  {
    name: "banana berry",
    shortdesc: "",
    longdescription: "",
    price: 22.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736512295/banana_berry-22_ujvmzk.jpg",
    categoryTitles: ["Mix Juices"]
  },
  {
    name: "blue lagoon mojito",
    shortdesc: "",
    longdescription: "",
    price: 22.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736512296/blue_lagoon_mojito-22_ctfdky.jpg",
    categoryTitles: ["Mix Juices"]
  },
  {
    name: "blue vanilla chic",
    shortdesc: "",
    longdescription: "",
    price: 22.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736512296/blue_vanilla_chic-22_s8wnk4.jpg",
    categoryTitles: ["Mix Juices"]
  },
  {
    name: "Julian passion fruit",
    shortdesc: "",
    longdescription: "",
    price: 22.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736512296/Julian_passion_fruit-22_ntcukf.jpg",
    categoryTitles: ["Mix Juices"]
  },
  {
    name: "mix Owl",
    shortdesc: "",
    longdescription: "",
    price: 22.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736512297/mix_Owl-22_cgim0k.jpg",
    categoryTitles: ["Mix Juices"]
  },
  {
    name: "monty chocolate",
    shortdesc: "",
    longdescription: "",
    price: 22.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736512298/monty_chocolate-22_mhzwcp.jpg",
    categoryTitles: ["Mix Juices"]
  },
  {
    name: "passion fruit mojito",
    shortdesc: "",
    longdescription: "",
    price: 22.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736512300/passion_fruit_mojito-22_ofhxk0.jpg",
    categoryTitles: ["Mix Juices"]
  },
  {
    name: "Pina colada",
    shortdesc: "",
    longdescription: "",
    price: 22.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736512301/Pina_colada-22_qhhgu3.jpg",
    categoryTitles: ["Mix Juices"]
  },
  {
    name: "relaxer",
    shortdesc: "",
    longdescription: "",
    price: 22.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736512302/relaxer-22_qcwm8k.jpg",
    categoryTitles: ["Mix Juices"]
  },
  {
    name: "rose mellon",
    shortdesc: "",
    longdescription: "",
    price: 22.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736512303/rose_mellon-22_mjng5t.jpg",
    categoryTitles: ["Mix Juices"]
  },
  {
    name: "strawberry mojito",
    shortdesc: "",
    longdescription: "",
    price: 22.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736512304/strawberry_mojito-22_yj6ool.jpg",
    categoryTitles: ["Mix Juices"]
  },
  {
    name: "Chocolate Milk Shake",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736513252/chocolate_milk_shake-20_jijhxp.jpg",
    categoryTitles: ["Milk Shake"]
  },
  {
    name: "Brownie Milk Shake",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736513252/brownie_milk_shake-20_aro4yp.jpg",
    categoryTitles: ["Milk Shake"]
  },
  {
    name: "Lotus Milk Shake",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736513252/lotus_milk_shake-20_ibys0y.jpg",
    categoryTitles: ["Milk Shake"]
  },
  {
    name: "Oreo Milk Shake",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736513254/oreo_milk_shake-20_aqcyvo.jpg",
    categoryTitles: ["Milk Shake"]
  },
  {
    name: "Strawberry Milk Shake",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736513255/strawberry_milk_shake-20_gagcgk.jpg",
    categoryTitles: ["Milk Shake"]
  },
  {
    name: "Vanilla Milkshake",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736513256/vanilla_milkshake-20_nam7of.jpg",
    categoryTitles: ["Milk Shake"]
  },
  {
    name: "Apple Mint",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Apple",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Grape Mint",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Mint",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Lemon Mint",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Watermelon Mint",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Watermelon",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Melon",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Strawberry",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Peach",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Grape",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Salom",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Kiwi PAN",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Zaffran",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Cinnamon Gum",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Gum Mint",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Gum",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Blueberry",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Bloomist",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Orange Mint",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Orange",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "PAN",
    shortdesc: "",
    longdescription: "",
    price: 69,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Shesha Head",
    shortdesc: "",
    longdescription: "",
    price: 20,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514067/khalil_manoon_z531wv.jpg",
    categoryTitles: ["Shisha - Khalil"]
  },
  {
    name: "Owl Shesha",
    shortdesc: "",
    longdescription: "",
    price: 96,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514292/russian_shisha_wf8dxw.jpg",
    categoryTitles: ["Shisha - Russian"]
  },
  {
    name: "Lave 66",
    shortdesc: "",
    longdescription: "",
    price: 96,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514292/russian_shisha_wf8dxw.jpg",
    categoryTitles: ["Shisha - Russian"]
  },
  {
    name: "Marbella",
    shortdesc: "",
    longdescription: "",
    price: 96,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514292/russian_shisha_wf8dxw.jpg",
    categoryTitles: ["Shisha - Russian"]
  },
  {
    name: "Cola",
    shortdesc: "",
    longdescription: "",
    price: 96,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514292/russian_shisha_wf8dxw.jpg",
    categoryTitles: ["Shisha - Russian"]
  },
  {
    name: "Istanbul Night",
    shortdesc: "",
    longdescription: "",
    price: 96,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514292/russian_shisha_wf8dxw.jpg",
    categoryTitles: ["Shisha - Russian"]
  },
  {
    name: "Commissioner",
    shortdesc: "",
    longdescription: "",
    price: 96,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514292/russian_shisha_wf8dxw.jpg",
    categoryTitles: ["Shisha - Russian"]
  },
  {
    name: "Lady Curl",
    shortdesc: "",
    longdescription: "",
    price: 96,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736514292/russian_shisha_wf8dxw.jpg",
    categoryTitles: ["Shisha - Russian"]
  },
  {
    name: "Apple",
    shortdesc: "",
    longdescription: "",
    price: 15.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463813/Apple-15_taconu.jpg",
    categoryTitles: ["Fresh Juices"]
  }
  ,
  {
    name: "Avocado",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463813/Avocado-20_k0klqi.jpg",
    categoryTitles: ["Fresh Juices"]
  }
  ,
  {
    name: "calssic coccktail",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463814/calssic_coccktail-20_hdoyun.jpg",
    categoryTitles: ["Fresh Juices"]
  },
  {
    name: "Carrot",
    shortdesc: "",
    longdescription: "",
    price: 15.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463814/Carrot-15_c4t0be.jpg",
    categoryTitles: ["Fresh Juices"]
  },
  {
    name: "Kiwi",
    shortdesc: "",
    longdescription: "",
    price: 15.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463813/Kiwi-15_rdcfdq.jpg",
    categoryTitles: ["Fresh Juices"]
  },
  {
    name: "lemon mint",
    shortdesc: "",
    longdescription: "",
    price: 15.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463814/lemon_mint-15_ddslj5.jpg",
    categoryTitles: ["Fresh Juices"]
  },{
    name: "Mango",
    shortdesc: "",
    longdescription: "",
    price: 15.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463813/Mango-15_ingth9.jpg",
    categoryTitles: ["Fresh Juices"]
  },
  {
    name: "Orange",
    shortdesc: "",
    longdescription: "",
    price: 15.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463814/Orange-15_g00eh6.jpg",
    categoryTitles: ["Fresh Juices"]
  },
  {
    name: "Pineapple",
    shortdesc: "",
    longdescription: "",
    price: 15.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463814/Pineapple-15_fujr5y.jpg",
    categoryTitles: ["Fresh Juices"]
  },
  {
    name: "Pomegranate",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463814/Pomegranate_20_mttkbo.jpg",
    categoryTitles: ["Fresh Juices"]
  },
  {
    name: "strawberries",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463815/strawberries-20_bdys3q.jpg",
    categoryTitles: ["Fresh Juices"]
  },
  {
    name: "Melon",
    shortdesc: "",
    longdescription: "",
    price: 15.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737463813/melon-15_y2sl7k.jpg",
    categoryTitles: ["Fresh Juices"]
  },
  {
    name: "avocado with banana",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737464200/avocado_with_banana-20_cdgm5r.jpg",
    categoryTitles: ["Mocktail"]
  },
  {
    name: "banana with milk",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737464198/banana_with_milk-20_ckrehd.jpg",
    categoryTitles: ["Mocktail"]
  }
  ,
  {
    name: "beetroot orange with ginger",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737464199/beetroot_orange_with_ginger-20_dsw6dr.jpg",
    categoryTitles: ["Mocktail"]
  }
  ,
  {
    name: "jamaica coctail",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737464199/jamaica_coctail-20_gyqiya.jpg",
    categoryTitles: ["Mocktail"]
  }
  ,
  {
    name: "orange with carrot",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737464200/orange_ccarot-20_zkkkct.jpg",
    categoryTitles: ["Mocktail"]
  },
  {
    name: "pomegranate with orange",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737464200/pomegranate_with_orange-20_vfuxyg.jpg",
    categoryTitles: ["Mocktail"]
  },
  {
    name: "strawberry with lemon",
    shortdesc: "",
    longdescription: "",
    price: 20.0,
    rating: 4,
    img: "https://res.cloudinary.com/dcwc3ehp3/image/upload/v1737464200/strawberry_with_lemon-20_l4prte.jpg",
    categoryTitles: ["Mocktail"]
  }
  
  
  
];

// Function to check and add default products
const checkAndAddDefaultProducts = async () => {
  try {
    const count = await Product.countDocuments(); // Count the documents in the Product collection

    if (count === 0) {
      // Fetch categories to link them by title
      const categories = await Category.find();
      const categoryMap = categories.reduce((map, category) => {
        map[category.title] = category._id;
        return map;
      }, {});

      // Populate default products with category references
      const productsWithCategoryRefs = defaultProducts.map((product) => ({
        ...product,
        category: product.categoryTitles
          .map((title) => categoryMap[title])
          .filter(Boolean), // Map titles to category IDs
      }));

      await Product.insertMany(productsWithCategoryRefs);
      console.log('Default products added because the collection was empty.');
    } else {
      console.log('Products already exist. No default products were added.');
    }
  } catch (error) {
    console.error('Error checking or adding default products:', error);
  }
};

module.exports = checkAndAddDefaultProducts;
