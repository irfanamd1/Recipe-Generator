import { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const IngredientAuto = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchIngredients = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/food/ingredients/search?query=${query}&number=10&apiKey=${import.meta.env.VITE_SPOONACULAR}`
        );

        let ingredients = response.data.results.map((item) => item.name);

        if (!ingredients.includes(query)) {
          ingredients.push(query);
        }

        setSuggestions(ingredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchIngredients, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (ingredient) => {
    onSelect(ingredient);
    setQuery(""); 
    setSuggestions([]);
};


  return (
    <div className="relative w-full">
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search ingredients..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none transition"
      />
      {loading && (
        <FaSpinner className="absolute right-3 top-3 text-gray-400 animate-spin" />
      )}
    </div>
      {suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-white border rounded-md shadow-md mt-1 max-h-40 overflow-y-auto z-10">
          {suggestions.map((ingredient, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(ingredient)}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientAuto;