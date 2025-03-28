import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { IoArrowBackCircleSharp } from "react-icons/io5";

const RecipeDisplay = () => {
  const { recipeId } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/recipe/${recipeId}`);
        setRecipe(res.data.recipe);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe. Please try again.");
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">{error}</div>
    );
  }

  if (!recipe) {
    return (
      <div className="p-6 text-center text-gray-600">Loading recipe...</div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 pt-0">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 p-6 pt-0">
        <Link to="/history" className="inline-block mb-4 !text-black text-3xl">
           <IoArrowBackCircleSharp />
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {recipe.title || "Recipe Recommendation"}
        </h2>

        <div className=" max-w-none text-gray-700 leading-relaxed">
          <ReactMarkdown>{recipe.recipe}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;

