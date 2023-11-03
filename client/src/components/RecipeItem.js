import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

import { BsPerson } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import { TiTick } from "react-icons/ti"; 

const RecipeItem = ({ favouriteHadler, savedItems }) => {
  const [itemSavedStatus, setItemSavedStatus] = useState(null);
  const { id } = useParams();

 const { data: recipe } = useFetch(id);
  
  useEffect(() => {
    if (!recipe) return;

    setItemSavedStatus(savedItems.some((item) => item.id === recipe.id));
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  return (
    <div>
      
        <div className='recipe-item-section container mx-auto px-5 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-0'>
          <div className='recipe-img-sec flex flex-col gap-5'>
            <div className='img overflow-hidden rounded-xl border shadow-md lg:h-96 group'>
              <img
                className='w-full h-full object-cover group-hover:scale-105 duration-300'
                src={recipe?.image}
                alt={recipe?.title}
              />
            </div>
          </div>
          <div className='recipe-details-sec flex flex-col gap-5 row-start-1 lg:row-auto'>
            <span className='publisher text-sky-400 font-semibold uppercase tracking-widest'>
              {recipe?.publisher}
            </span>
            <h2 className='title capitalize text-4xl lg:text-6xl'>
              {recipe?.name}
            </h2>
            <div className='servings-cooking-time flex flex-col justify-between gap-5 lg:flex-row font-semibold tracking-widest text-rose-500 uppercase'>
              <div className='servings flex items-center gap-2'>
                <BsPerson /> Servings (People): {recipe?.serving}
              </div>
          
            </div>
            <div className='buttons flex flex-col gap-5 items-start lg:flex-row'>
              <button
                onClick={() => favouriteHadler(recipe?.id)}
                className={`bg-gradient-to-br p-3 px-8 rounded-lg text-sm uppercase font-bold tracking-wider mt-2 inline-block   duration-300 outline-none text-center ${
                  itemSavedStatus
                    ? "from-rose-200 to-rose-300 text-rose-500   hover:text-rose-50"
                    : "from-green-400 to-green-600 text-green-50 shadow-green-200 hover:shadow-green-300"
                }`}
              >
                {itemSavedStatus
                  ? "- Remove from favourites"
                  : "+ Add favourites"}
              </button>
              <a
                className='bg-gradient-to-br from-sky-400 to-sky-600 text-sky-50 p-3 px-8 rounded-lg text-sm uppercase font-bold tracking-wider mt-2 inline-block     duration-300 outline-none text-center'
                href={recipe?.source_url}
                target='_blank'
                rel='noreferrer'
              >
                Get Directions
              </a>
              <Link
                to='/'
                className='bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-sm uppercase font-bold tracking-wider mt-2 inline-block   duration-300 outline-none text-center'
              >
                Go Home
              </Link>
            </div>
          </div>
          <div className='recipe-ingredients-sec col-span-full'>
            <span className='ing-title text-2xl lg:text-4xl font-medium mb-5 flex items-center gap-3'>
              <GiKnifeFork className='text-rose-500' />
              Ingredients:
            </span>
            <hr className='border-rose-100' />
            <ul className='mt-5'>
              { 
                <li className='leading-loose flex gap-1 items-center'   >
                  <span className='text-green-400'>
                    <TiTick />
                  </span>
                  <span>
                  {recipe?.ingredients}
                  </span>
                </li>
            }
            </ul>
          </div>
        </div>
   
    </div>
  );
};

export default RecipeItem;
