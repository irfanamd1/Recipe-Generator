import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const RecipeDisplay = () => {

  const { recipeId } = useParams();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [recipe, setRecipe] = useState(null);

  const cleanRecipeText = (text) => {
    return text
      .replace(/[*#_~`]/g, '') // Remove special markdown characters
      .replace(/\n{2,}/g, '\n') // Replace multiple newlines with a single newline
      .replace(/\s{2,}/g, ' ')  // Replace multiple spaces with a single space
      .trim();                  // Remove leading and trailing whitespace
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/recipe/${recipeId}`);
        const cleanedRecipe = cleanRecipeText(res.data.recipe.recipe); // Clean the text
        setRecipe({ ...res.data.recipe, recipe: cleanedRecipe });
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    };
  
    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  if (!recipe) {
    return (
      <div>
        <div className="p-4">
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4">
        <Link to='/history' className="ml-4 px-3 py-1 bg-black !text-white rounded-sm text-sm">⮘&nbsp;Go Back</Link>
        <p className="mx-4 mt-4 text-[16px] whitespace-pre-wrap">{recipe.recipe}</p>
      </div>
    </div>
  );
};

export default RecipeDisplay;
