import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const RecipeDisplay = () => {
  const { recipeId } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [recipe, setRecipe] = useState({});

  const [error, setError] = useState(null);

  const [rec, setRec] = useState(null);

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

  useEffect(() => {
    if (!recipe || !recipe.recipe) return;

    let parsedRecipe = null;

    if (typeof recipe.recipe === "string") {
      try {
        let cleanJson = recipe.recipe
          .replace(/```javascript|```/g, "")
          .trim()
          .replace(/^const aiRecipe\s*=\s*/, "")
          .replace(/;$/, "");

        parsedRecipe = new Function(`return (${cleanJson})`)();
        setRec(parsedRecipe);
      } catch (error) {
        console.error("Error parsing recipe:", error);
      }
    } else if (typeof recipe.recipe === "object") {
      setRec(recipe.recipe);
    }
  }, [recipe]);

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!rec) {
    return (
      <div className="p-6 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-gray-600">
        Loading recipe...
      </div>
    );
  }

  console.log(rec);

  return (
    <div className="flex flex-col items-center p-6 pt-0">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 p-6 pt-0">
        <Link to="/history" className="inline-block !text-black text-3xl">
          <IoArrowBackCircleSharp />
        </Link>

        <div className="max-w-6xl mx-auto px-6 pb-6 pt-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {rec.recipeName}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {rec.description}
          </p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Ingredients:
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              {rec.ingredients?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Equipments:
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              {rec.equipment?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm text-gray-700 dark:text-gray-300">
              <strong>Prep Time:</strong> {rec.prepTime}
            </p>
            <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm text-gray-700 dark:text-gray-300">
              <strong>Cook Time:</strong> {rec.cookTime}
            </p>
            <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm text-gray-700 dark:text-gray-300">
              <strong>Servings:</strong> {rec.servings}
            </p>
            <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm text-gray-700 dark:text-gray-300">
              <strong>Difficulty:</strong> {rec.difficulty}
            </p>
            <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm text-gray-700 dark:text-gray-300">
              <strong>Cuisine:</strong> {rec.cuisine}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Instructions:
            </h3>
            <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 leading-relaxed">
              {rec.instructions?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
