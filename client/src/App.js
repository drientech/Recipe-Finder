import { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"; 

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import RecipeItem from "./components/RecipeItem";
import Favourites from "./components/Favourites"; 
import NotFound from "./components/NotFound";

const App = () => { 
  
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedItems, setSavedItems] = useState(() => {
    const localData = localStorage.getItem("recipes");
    return localData ? JSON.parse(localData) : [];
  });

  const searchField = useRef(null);

  const navigator = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    getData(searchQuery);

    searchField.current.blur();
    navigator("/");
    setSearchQuery("");
    setError("");
    setRecipes([]);
  };
 
  //Fetching all recipe data from API
  const getData = async (searchQuery) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/recipes/search?q=${searchQuery}`,{
          method: "POST"}
      );
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      if (data.results === 0) throw new Error("No recipe found!");
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  //Checking and set local storage data
  const checkLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem("recipes"));
    const existedData = localData?.some((item) => item.id === data.id);

    if (!existedData) {
      setSavedItems([...savedItems, data]);
    } else {
      const filteredData = localData.filter((item) => item.id !== data.id);
      setSavedItems(filteredData);
    }
  };

  //Save to Favorites
  const favouriteHadler = (id) => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => checkLocalData(data));
    // checkLocalData(dataa);
    navigator("/favourites");
  };

  //Showing Local storage data
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    fetch(`http://localhost:5000/recipes`)
    .then((res) => res.json())
    .then((data) => setRecipes(data));
  }, []);

  return (
    <>
      <div className='app min-h-screen bg-slate-800	 text-gray-600 text-lg'>
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchField={searchField}
          searchHandler={searchHandler}
          savedItems={savedItems}
        />
        <Routes>
          <Route
            path='/'
            element={<Home recipes={recipes} loading={loading} error={error} />}
          />
          <Route
            path='/favourites'
            element={<Favourites savedItems={savedItems} />}
          />
          <Route
            path='/recipe-item/:id'
            element={
              <RecipeItem
                favouriteHadler={favouriteHadler}
                savedItems={savedItems}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div> 
    </>
  );
};

export default App;
