const express = require("express");
const app = express();
app.use(express.json());

let cards = [
  { id: 1, suit: 'hearts', value: 'ace', collection: 'standard' },
  { id: 2, suit: 'spades', value: 'king', collection: 'vintage' }
];

function nextId() {
  if (cards.length === 0) return 1;
  return Math.max(...cards.map(c => c.id)) + 1;
}

// GET all cards
app.get("/api/cards", (req, res) => {
  res.json(cards);
});

// POST a new card
app.post("/api/cards", (req, res) => {
  const newCard = {
    id: nextId(),
    suit: req.body.suit,
    value: req.body.value,
    collection: req.body.collection
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});