const mongoose = require('mongoose');
const Category = require('./models/categoryModel'); // Adjust the path as needed

// Default categories to add
const defaultCategories = [
  {
    title: 'Breakfast (From 10:00 Till 12:00)',
    shortdesc: 'Latest gadgets and devices',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736432632/10_p1cmxm.png',
  },
  {
    title: 'Soup',
    shortdesc: 'Trending styles and apparel',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736432988/SO-MUSHROOM_x87am3.jpg',
  },
  {
    title: 'Cold Appetizers & Salads',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433104/Baba_ghanoj-18_qzxzgv.jpg',
  },
  {
    title: 'Hot Appetizers',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433184/Cheese_roll-20_aqyyjy.jpg',
  },
  {
    title: 'Pasta',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433269/BOLOGNAISE_efuys2.jpg',
  },
  {
    title: 'Pizza',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433333/Pepperoni_Pizza_-_30_coaj3d.jpg',
  },
  {
    title: 'Manakish & Saj',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433413/Akkawi_cheese-15_ilqxtl.jpg',
  },
  {
    title: 'Main Course',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433487/CORDON_BLU_uuzfu0.jpg',
  },
  {
    title: 'Grill',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433565/Mix_grills-60_iebvtr.jpg',
  },
  {
    title: 'Indian / Asian',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433633/FRIED_RICE_tcfwkq.jpg',
  },
  {
    title: 'Burgers & Sandwiches',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433709/BURGER_hjllzc.jpg',
  },
  {
    title: 'Bread',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433758/mix_bread-20_ogjpv3.jpg',
  },
  {
    title: 'Desserts',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433816/MANGO_CAKE_bm1ig2.jpg',
  },
  {
    title: 'Hot Drink',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433888/cappuccino-15_ymewps.jpg',
  },
  {
    title: 'Ice Coffee',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736433955/ice_mocha-20_qbmug2.jpg',
  },
  {
    title: 'Soft Drink',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736434036/pepsi-12_vy7af9.jpg',
  },
  {
    title: 'Fresh Juices',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736432707/calssic_coccktail-20_baznya.jpg',
  },
  {
    title: 'Smoothies',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736432635/beetroot_orange_with_ginger-20_g1644f.jpg',
  },
  {
    title: 'Mocktail',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736432634/avocado_with_banana-20_jpzc2f.jpg',
  },
  {
    title: 'Mix Juices',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736432752/mix_Owl-22_eqkex4.jpg',
  },
  {
    title: 'Milk Shake',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736432755/oreo_milk_shake-20_qbnzha.jpg',
  },
  {
    title: 'Shisha - Khalil',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736432755/Orange-15_bri3sc.jpg',
  },
  {
    title: 'Shisha - hawaya',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736432753/monty_chocolate-22_sqiie7.jpg',
  },
  {
    title: 'Shisha - Russian',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736432756/Pina_colada-22_pbqdvh.jpg',
  },
  {
    title: 'Shisha - Russian 2',
    shortdesc: 'Knowledge at your fingertips',
    img: 'https://res.cloudinary.com/dcwc3ehp3/image/upload/v1736432756/passion_fruit_mojito-22_duu4df.jpg',
  },
];

// Function to check and add default categories
const checkAndAddDefaultCategories = async () => {
  try {
    const count = await Category.countDocuments(); // Count the documents in the Category collection
    if (count === 0) {
      await Category.insertMany(defaultCategories);
      console.log('Default categories added because the collection was empty.');
    } else {
      console.log('Categories already exist. No default categories were added.');
    }
  } catch (error) {
    console.error('Error checking or adding default categories:', error);
  }
};

module.exports = checkAndAddDefaultCategories;
