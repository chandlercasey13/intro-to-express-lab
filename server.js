const express = require("express");
const app = express();

//1
app.get("/greetings/:username", function (req, res) {
  res.send(`Nice to see you, ${req.params.username}.`);
});

//2
app.get("/roll/:number", function (req, res) {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  if (isNaN(req.params.number)) {
    res.send(`You must specify a number.`);
  } else {
    res.send(`You rolled a ${getRandomInt(req.params.number)}.`);
  }
});

//3
app.get("/collectibles/:index", function (req, res) {
  const collectibles = [
    { name: "shiny ball", price: 5.95 },
    { name: "autographed picture of a dog", price: 10 },
    { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
  ];
  for (let i = 0; i < collectibles.length; i++) {
    if (req.params.index == i) {
      res.send(
        `So you want the ${collectibles[i].name}? That'll be $${collectibles[i].price}.`
      );
    } else {
      res.send("This item is not in stock yet");
    }
  }
});

//4
//here I used underscores between the query parameters. EX min_price

app.get("/shoes", function (req, res) {
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" },
  ];

  const minPrice = req.query.min_price;
  const maxPrice = req.query.max_price;
  const type = req.query.type;

  const filteredShoes = shoes.filter((shoe) => {
    if (
      shoe.price >= parseInt(minPrice) &&
      shoe.price <= parseInt(maxPrice) &&
      shoe.type == type
    ) {
      return true;
    }
  });

  res.send(filteredShoes);
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});
