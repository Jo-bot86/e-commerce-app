const mongoose = require('mongoose');
const Product = require('../models/product');
const User = require('../models/user');
const { createHmac } = require("crypto");


const encryptPassword = (secret) => {
  // const secret = '1234';
  const hash = createHmac('sha256', secret)
    .update('I love cupcakes')
    .digest('hex');
  return hash
}

const passwordMax = encryptPassword('12345');
const passwordJohn = encryptPassword('abcde');

const Max = new User({
  firstName: 'Max',
  lastname: 'Mustermann',
  emailAddress: 'maxmustermann@posteo.de',
  password: passwordMax
})

const John = new User({
  firstName: 'John',
  lastname: 'Doe',
  emailAddress: 'john@doe.com',
  password: passwordJohn
})

mongoose.connect('mongodb://localhost:27017/e-commerce-shop', { useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo Connection Open!!');
  })
  .catch(err => {
    console.log('Mongo Connection Error!!');
    console.log(err);
  });

const seedProducts = [
  {
    name: 'Apple IPhone 12',
    price: 719.00,
    main_category: 'Elektronik',
    sub_category: 'Smartphone',
    info: '6,1" Super Retina XDR Display (15,5 cm Diagonale) Ceramic Shield, der mehr aushält als jedes Smartphone Glas 5G für superschnelle Downloads und Streaming in höchster Qualität A14 Bionic, der schnellste Chip in einem Smartphone Fortschrittliches Zwei‐Kamera- System mit 12 MP Ultraweitwinkel‐ und Weitwinkelobjektiv, Nachtmodus, Deep Fusion, Smart HDR 3, 4K Dolby Vision HDR Aufnahme 12 MP TrueDepth Frontkamera mit Nachtmodus, 4K Dolby Vision HDR Aufnahme Branchenführender IP68 Wasserschutz',
    thumbnails: {
      url: ['https://i.ebayimg.com/images/g/n8MAAOSwYFhhn2DY/s-l1600.jpg'],
      description: 'Apple iPhone 12 - 64GB - SCHWARZ - OVP - SIMLOCKFREI WOW A2403'
    },
    inStock: '2',
    rating: 1.3,
    userId: Max.id
  },
  {
    name: 'Birkenstock Arizona',
    price: 49.99,
    main_category: 'Kleidung',
    sub_category: 'Schuhe',
    info: 'Der Zweiriemer Arizona 51791 wurde mit einer Superlaufsohle ausgestattet.Diese besteht aus einer Zwischensohle aus dämpfendem EVA sowie einer Laufsohle aus Gummi und zeichnet sich durch komfortable Abrolleigenschaften aus.Sie schützt außerdem vor dem Ausrutschen auf glatten Böden und ist öl- und fettbeständig.Dank der verstellbaren Riemen bietet die Sandale außergewöhnlich guten Halt und Tragekomfort.',
    thumbnails: {
      url: [
        'https://i.ebayimg.com/images/g/T-AAAOSwD9VfzPtr/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/KEIAAOSwNDFfygmQ/s-l1600.jpg'
      ],
      description: 'Birkenstock Arizona 51791 Grosse 44 Schwarz'
    },
    inStock: "8",
    rating: 2.2,
    userId: John.id
  },
  {
    name: 'Gartenstuhl',
    price: 46.90,
    main_category: 'Garten',
    sub_category: 'Gartenmöbel',
    info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, nulla magni facilis impedit ducimus quam voluptas? Minus odit tempore fugit. Totam suscipit iste quo consequatur blanditiis aspernatur. Voluptates, nostrum quisquam! Ullam rerum odio ea nisi soluta tempora ab itaque, eius modi dolores.Quia obcaecati doloribus ut iusto, atque illum ea, praesentium iure explicabo aperiam quisquam eligendi? Asperiores beatae eum adipisci. Nihil facere recusandae repellendus totam, nemo magni molestias laboriosam iure sed hic officia ipsum voluptatum.Necessitatibus perspiciatis modi itaque.Natus saepe nobis velit magni ratione unde pariatur aliquid, odit deleniti!',
    thumbnails: {
      url: [
        'https://i.ebayimg.com/images/g/swcAAOSw2uNhpesf/s-l1600.jpg'
      ],
      description: 'Gartenstuhl Gartensessel Miami Dining Chair graphite mit Kissen Allibert B-Ware'
    },
    inStock: "3",
    rating: 4.2,
    userId: John.id
  },
  {
    name: 'Puma Socken',
    price: 18.99,
    main_category: 'Kleidung',
    sub_category: 'Socken',
    info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, nulla magni facilis impedit ducimus quam voluptas? Minus odit tempore fugit. Totam suscipit iste quo consequatur blanditiis aspernatur. Voluptates, nostrum quisquam! Ullam rerum odio ea nisi soluta tempora ab itaque, eius modi dolores.Quia obcaecati doloribus ut iusto, atque illum ea, praesentium iure explicabo aperiam quisquam eligendi? Asperiores beatae eum adipisci. Nihil facere recusandae repellendus totam, nemo magni molestias laboriosam iure sed hic officia ipsum voluptatum.Necessitatibus perspiciatis modi itaque.Natus saepe nobis velit magni ratione unde pariatur aliquid, odit deleniti!',
    thumbnails: {
      url: [
        'https://i.ebayimg.com/images/g/RToAAOSwXq5ccB6c/s-l1600.jpg'
      ],
      description: 'Puma 883296-01 Herren Socken Größe 43-46 - Schwarz, 3 Paar'
    },
    inStock: "28",
    rating: 3.6,
    userId: Max.id
  },
  {
    name: 'Xiaomi 11T',
    price: 399.00,
    main_category: 'Elektronik',
    sub_category: 'Smartphone',
    info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, nulla magni facilis impedit ducimus quam voluptas? Minus odit tempore fugit. Totam suscipit iste quo consequatur blanditiis aspernatur. Voluptates, nostrum quisquam! Ullam rerum odio ea nisi soluta tempora ab itaque, eius modi dolores.Quia obcaecati doloribus ut iusto, atque illum ea, praesentium iure explicabo aperiam quisquam eligendi? Asperiores beatae eum adipisci. Nihil facere recusandae repellendus totam, nemo magni molestias laboriosam iure sed hic officia ipsum voluptatum.Necessitatibus perspiciatis modi itaque.Natus saepe nobis velit magni ratione unde pariatur aliquid, odit deleniti!',
    thumbnails: {
      url: [
        'https://i.ebayimg.com/images/g/PIcAAOSwXjRhfBBV/s-l1600.jpg'
      ],
      description: 'Xiaomi 11T 5G Dual Sim 8GB/128GB Meteorite Grey'
    },
    inStock: "12",
    rating: 4.5,
    userId: Max.id
  },
]


User.insertMany([Max, John])
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })


Product.insertMany(seedProducts)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })





