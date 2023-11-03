const express = require("express");
const app = express();
const sequelize = require("./database");
const Recipe = require("./Recipe");
const seedData = require("./seed");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const cors = require('cors');


app.enable('trust proxy');
app.use(express.json());
app.use(cors( ));

app.get("/recipes", async (req, res) => {
  console.log(req);
  const recipes = await Recipe.findAll();
  res.json(recipes);
});

app.get("/recipes/:id", async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
});

app.post("/recipes/favorite", async (req, res) => {
  const { name, ingredients, instructions, image, serving } = req.body;
  const newRecipe = await Recipe.create({
    name,
    ingredients,
    instructions,
    image,
    serving
  });
  res.json(newRecipe);
});

app.post("/recipes/search", async (req, res) => {
  const searchQuery = req.query.q;
  console.log(searchQuery);
  try {
    const recipes = await Recipe.findAll({
      attributes: ["id","name", "ingredients", "instructions","image"],
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchQuery}%` } },
          { ingredients: { [Op.like]: `%${searchQuery}%` } },
          { instructions: { [Op.like]: `%${searchQuery}%` } },
        ],
      },
    });

    res.json(recipes);
  } catch (error) {
    console.error("Error searching for recipes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for recipes" });
  }
});

sequelize.sync().then(async() => {
  const existingRecipes = await Recipe.findAll();
  if (!existingRecipes   || existingRecipes.length === 0) {
    Recipe.bulkCreate(seedData)
    .then(() => {
      console.log("Database seeded with initial data");
    })
    .catch((error) => {
      console.error("Error seeding the database:", error);
    });
  }


  app.listen(5000, () => {
    console.log("Server is running on port 3000");
  });
});
