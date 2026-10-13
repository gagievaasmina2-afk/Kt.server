const express = require("express");
const mongoose = require("mongoose");
const iPhone = require('./models/iphone'); 
const PORT = 5000;

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/iphone")
  .then(() => {
    console.log("Успешное подключение к MongoDB.");
  })
  .catch((error) => {
    console.log("Ошибка при подключении к MongoDB:", error);
  });

app.get("/iphone", async (req, res) => {
  try {
    const iphones = await iPhone.find();
    res.json(iphones);
  } catch (error) {
    res.status(500).send("Ошибка при получении товаров: " + error.message);
  }
});

app.post('/addiphone', async (req, res) => {
  const { title, description, price, brand } = req.body;
  try {
    await iPhone.create({
      title,
      description,
      price,
      brand,
    });
    res.status(201).send("Товар добавлен успешно!");
  } catch (error) {
    console.log("Ошибка при добавлении товара: " + error);
    res.status(500).send("Ошибка при добавлении товара: " + error.message);
  }
});

app.delete("/iphone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const iphone = await iPhone.findByIdAndDelete(id);
    
    if (!iphone) {
      return res.status(404).send("Такого товара не существует!");
    }
    
    res.send("Товар успешно удален!");
  } catch (error) {
    res.status(500).send("Ошибка при удалении товара: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log("Успешное подключение к серверу. Порт: " + PORT);
});
