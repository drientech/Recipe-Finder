import React, { useEffect, useState } from 'react';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import SearchBar from './SearchBar';
import FavoriteRecipe from './FavoriteRecipe';
import styled from 'styled-components';
const  Recipe = () => {
  const  recipes =  [ 
    {
      id: 1,
      name: 'Spaghetti Bolognese',
      ingredients: 'Pasta, ',
      instructions: 'Cook pasta, brown beef, add tomatoes, and simmer.',
      image: 'spaghetti.jpg',
    }, 
    {
        id: 2,
        name: 'Spaghetti ',
        ingredients: ' Ground beef, Tomatoes',
        instructions: 'Cook pasta, brown beef, add tomatoes, and simmer.',
        image: 'spaghetti.jpg',
      },
  ];

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filteredRecipe, setFilteredRecipe] = useState(recipes);
  const [favorite, setFavorite] = useState([]);
 
 
  const fav = localStorage.getItem('favorite'); 
 
useEffect(() => {
//   localStorage.setItem('favorite', favorite);
  console.log(fav);

},[favorite]);
  const handleSearch = (query) => {
    // Simulate fetching recipes from the backend based on the query.
    // Update the 'recipes' state with the results.
    const matchingRecipes = recipes.filter((recipe) =>{

      return recipe.ingredients.toLowerCase().includes(query.toLowerCase())
    }); 
    setFilteredRecipe(matchingRecipes);
  };

  const handleFavoriteClick = (recipeId) => {  
    const fav =   [localStorage.getItem('favorite')];
 
    fav.push(recipeId);
    localStorage.setItem('favorite', fav); 
  };

  const handleRecipeClick = (recipeId) => {
    // Find and set the selected recipe by ID.
    const recipe = recipes.find((r) => r.id === recipeId);
    setSelectedRecipe(recipe);
  };
  const Wrap = styled.div`
  display: flex;
  justify-content: center;
  `;
  return (
    <div>
      <h1>Recipe Finder</h1>
      <Wrap>
      <SearchBar onSearch={handleSearch} />
      </Wrap>
      <FavoriteRecipe recipes={recipes} fav={fav} />
      <RecipeList
        recipes={filteredRecipe}
        onFavoriteClick={handleFavoriteClick}
        onRecipeClick={handleRecipeClick}
      />
      <RecipeDetails recipe={selectedRecipe} />
    </div>
  );
}

export default Recipe;
