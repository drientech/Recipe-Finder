import React, { useEffect, useState } from 'react'

const FavoriteRecipe = ({recipes, fav}) => {
 
  return (
    <div>
        Favorite {fav}
        {
        recipes.filter(x => x.id === 1).map((x) => {
           return (
            <h2>{x.name}</h2>
           )
        })
        }</div>
  )
}

export default FavoriteRecipe