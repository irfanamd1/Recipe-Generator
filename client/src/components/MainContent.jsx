import { useState, useRef, useEffect } from "react";
import IngredientsList from "./IngredientsList";
import GeminiRecipe from "./GeminiRecipe";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import IngredientAuto from "./IngredientAuto";
import toast from "react-hot-toast";
import GenerateBtn from "./GenerateBtn";
import Advanced from "./Advanced";
import { FaHistory } from "react-icons/fa";

const MainContent = () => {
  const { user } = useUser();
  const name = user.fullName;
  const email = user.primaryEmailAddress.emailAddress;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [meal, setMeal] = useState("");
  const [dietary, setDietary] = useState("");
  const [servings, setServings] = useState("");
  const [cooking, setCooking] = useState("");
  const [skill, setSkill] = useState("");
  const [time, setTime] = useState("");
  const [flavor, setFlavor] = useState("");
  const [extraInc, setExtraInc] = useState("");

  const recipeSectionRef = useRef(null);

  useEffect(() => {
    if (recipe && recipeSectionRef.current) {
      recipeSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  const clearFun = () => {
    setRecipe("");
    setCuisine("");
    setMeal("");
    setDietary("");
    setServings("");
    setCooking("");
    setSkill("");
    setTime("");
    setFlavor("");
    setExtraInc("");
  };

  const handleSelect = (ingredient) => {
    if (ingredients.includes(ingredient)) {
      toast.error("Cannot add the same ingredient multiple times");
      return;
    }
    setIngredients((prev) => [...prev, ingredient]);
  };

  const removeIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const getRecipe = async () => {
    setLoading(true);
    const res = await axios.post(`${BACKEND_URL}/api/generateRecipe`, {
      ingredients,
      cuisine,
      meal,
      dietary,
      servings,
      cooking,
      time,
      flavor,
      skill,
      name,
      email,
      extraInc,
    });

    setRecipe(res.data.response);
    setIngredients([]);
    setLoading(false);
  };  

  return (
    <main className="p-6 max-w-6xl mx-auto">
      {!recipe && (
        <Link to="/history">
          <button className=" bg-black text-white px-4 py-2 rounded-md transition hover:bg-gray-800">
            <FaHistory className="mr-1 inline" /> History
          </button>
        </Link>
      )}

      {recipe ? (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          onClick={clearFun}
        >
          Clear Recipe
        </button>
      ) : (
        <div className="md:w-1/2 md:mx-auto mt-4">
          <IngredientAuto onSelect={handleSelect} />
        </div>
      )}

      {ingredients.length > 0 && (
        <>
          <IngredientsList ingredients={ingredients} onRemove={removeIngredient} />
          <Advanced
            cuisine={cuisine}
            setCuisine={setCuisine}
            meal={meal}
            setMeal={setMeal}
            dietary={dietary}
            setDietary={setDietary}
            servings={servings}
            setServings={setServings}
            cooking={cooking}
            setCooking={setCooking}
            skill={skill}
            setSkill={setSkill}
            time={time}
            setTime={setTime}
            flavor={flavor}
            setFlavor={setFlavor}
            extraInc={extraInc}
            setExtraInc={setExtraInc}
          />
          <GenerateBtn ingredients={ingredients} recipeRef={recipeSectionRef} getRecipe={getRecipe} />
        </>
      )}

      {recipe && <GeminiRecipe recipe={recipe} />}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold animate-pulse">Generating Recipe...</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default MainContent;
