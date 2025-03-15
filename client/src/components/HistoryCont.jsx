import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios"

const HistoryCont = () => {

    const { user } = useUser();

    const email = user.primaryEmailAddress.emailAddress;

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [recipes, setRecipes] = useState([]);

    const extractRecipeName = (recipeText) => {
      const lines = recipeText.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
          if (line.startsWith("## ")) {
              return line.replace("## ", "").trim();
          }
      }
  
      return lines.length > 0 ? lines[0] : 'Unknown Recipe';
  };

const deleteRecipe = async (id) => {
    try {
        const res = await axios.delete(`${BACKEND_URL}/api/recipes/${id}`);

        setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (err) {
        console.error("Error deleting recipe:", err);
        setError(err.response?.data?.message || "Failed to delete recipe.");
    }
};



useEffect(() => {
    const fetchRecipes = async () => {
        try {
            if (!email) {
                console.error("User email not found.");
                return;
            }

            const res = await axios.get(`${BACKEND_URL}/api/recipes`, {
                params: { email }
            });

            setRecipes(res.data.recipes);
        } catch (err) {
            console.error("Error fetching recipes:", err.response?.data?.message || err.message);
        }
    };

    fetchRecipes();
}, [email]);
    

    return (
        <div className="mx-4">
            <Link to='/'><button className='mb-3 ml-10 px-3 py-1 bg-black text-white rounded-sm text-sm'>⮘&nbsp;Go Back</button></Link>
            <h1 className="text-2xl font-bold mb-4 text-center">Recipe History</h1>
            {recipes.length > 0 ? (
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2">Recipe Name</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe) => (
                          
                          
                            <tr key={recipe._id}>
                                <td className="border p-2 w-[90%]">
                                {extractRecipeName(recipe.recipe)}...<Link to={`/recipe/${recipe._id}`}><span className='text-sm pl-3'>read more</span></Link>
                                </td>
                                <td className="border p-2 text-center">
                                                
                                    <button 
                                        onClick={() => deleteRecipe(recipe._id)} 
                                        className="px-2 py-1 text-white bg-black rounded-md text-center"
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>No recipes found.</p>
            )}
        </div>
    );
};

export default HistoryCont;
