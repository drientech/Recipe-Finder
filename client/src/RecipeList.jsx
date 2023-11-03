import React from 'react';

function RecipeList({ recipes, onFavoriteClick, onRecipeClick }) {
  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <span onClick={() => onRecipeClick(recipe.id)}>{recipe.name}</span>
            <button onClick={() => onFavoriteClick(recipe.id)}>Favorite</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
