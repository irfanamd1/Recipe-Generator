import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";

const HistoryCont = () => {
  const { user } = useUser();
  const email = user.primaryEmailAddress.emailAddress;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [recipes, setRecipes] = useState([]);

  const extractRecipeName = (recipeText) => {
    const lines = recipeText.split("\n").filter((line) => line.trim() !== "");
    for (const line of lines) {
      if (line.startsWith("### ")) return line.replace("### ", "").trim();
      if (line.startsWith("## ")) return line.replace("## ", "").trim();
      if (line.startsWith("# ")) return line.replace("# ", "").trim();
    }
    return lines.length > 0 ? lines[0] : "Unnamed Recipe";
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/recipes/${id}`);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!email) return console.error("User email not found.");
      try {
        const res = await axios.get(`${BACKEND_URL}/api/recipes`, {
          params: { email },
        });
        setRecipes(res.data.recipes);
      } catch (err) {
        console.error("Error fetching recipes:", err.response?.data?.message || err.message);
      }
    };
    fetchRecipes();
  }, [email]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/">
        <button className="mb-4 px-4 py-2 bg-black text-white rounded-md text-sm transition hover:bg-gray-800">
          ⮘ Go Back
        </button>
      </Link>

      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Recipe History</h1>

      {recipes.length > 0 ? (
        <div className="overflow-x-auto flex justify-center">
          <table className="w-[800px] border border-gray-300 rounded-lg overflow-hidden shadow-md border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-gray-700">
                <th className="p-4 text-left w-3/4">Recipe Name</th>
                <th className="p-4 text-center w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recipes.map((recipe, index) => (
                <tr
                  key={recipe._id}
                  className={`hover:bg-gray-50 transition ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="p-4">
                    {extractRecipeName(recipe.recipe)}...
                    <Link to={`/recipe/${recipe._id}`} className="text-blue-600 pl-2 text-sm hover:underline">
                      Read more
                    </Link>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteRecipe(recipe._id)}
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <FaRegTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-20">No recipes found.</p>
      )}
    </div>
  );
};

export default HistoryCont;
