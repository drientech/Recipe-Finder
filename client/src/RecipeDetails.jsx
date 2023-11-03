import React from 'react';

function RecipeDetails({ recipe }) {
  if (!recipe) {
    return null;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Instructions: {recipe.instructions}</p>
      <img src={recipe.image} alt={recipe.name} />
    </div>
  );
}

export default RecipeDetails;
