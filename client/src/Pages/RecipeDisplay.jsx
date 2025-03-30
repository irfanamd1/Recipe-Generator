import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa6";

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

  const downloadPDF = () => {
    if (!rec) return;

    const pdf = new jsPDF();
    let y = 10;

    y += 6;
    const pageWidth = pdf.internal.pageSize.width;
    pdf.setFont("courier", "bold");
    pdf.setFontSize(26);
    pdf.text('CHEFZIA', pageWidth / 2, y, { align: "center" });
    y += 6;

    pdf.setDrawColor(0);
    pdf.setLineWidth(0.3);
    pdf.line(10, y, pageWidth - 10, y);
    y += 10;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text(rec.recipeName, 10, y);
    y += 10;

    pdf.setFontSize(14);
    pdf.text("Description:", 10, y);
    y += 6;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    const splitInstructions = pdf.splitTextToSize(rec.description, 180);
    splitInstructions.forEach((line) => {
      if (y > 280) {
        pdf.addPage();
        y = 10;
      }
      pdf.text(line, 13, y);
      y += 6;
    });
    y += 2;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Ingredients:", 10, y);
    y += 6;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    rec.ingredients.forEach((item) => {
      if (y > 280) {
        pdf.addPage();
        y = 10;
      }
      pdf.text(`- ${item}`, 15, y);
      y += 6;
    });
    y += 2;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Equipments:", 10, y);
    y += 6;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    rec.equipment.forEach((item) => {
      if (y > 280) {
        pdf.addPage();
        y = 10;
      }
      pdf.text(`- ${item}`, 15, y);
      y += 6;
    });
    y += 2;

    pdf.setFontSize(12);

    pdf.setFont("helvetica", "bold");
    pdf.text("Preparation Time: ", 10, y);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${rec.prepTime}`, 48, y);
    y += 8;

    pdf.setFont("helvetica", "bold");
    pdf.text("Cooking Time: ", 10, y);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${rec.cookTime}`, 41, y);
    y += 8;

    pdf.setFont("helvetica", "bold");
    pdf.text("Difficulty: ", 10, y);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${rec.difficulty}`, 31, y);
    y += 8;

    pdf.setFont("helvetica", "bold");
    pdf.text("Cuisine: ", 10, y);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${rec.cuisine}`, 28, y);
    y += 8;

    pdf.setFont("helvetica", "bold");
    pdf.text("Servings: ", 10, y);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${rec.servings}`, 30, y);
    y += 10;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Instructions:", 10, y);
    y += 6;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    let instructionSteps = [];
    if (Array.isArray(rec.instructions)) {
      instructionSteps = rec.instructions;
    }
    else if (typeof rec.instructions === "object") {
      instructionSteps = Object.values(rec.instructions);
    }
    else {
      pdf.text("No instructions provided.", 15, y);
      y += 6;
    }
    instructionSteps.forEach((step) => {
      if (!step || typeof step !== "string") return;
      const splitStep = pdf.splitTextToSize(step, 170);
      if (y > 280) {
        pdf.addPage();
        y = 10;
      }
      pdf.text(`• ${splitStep[0]}`, 15, y);
      y += 6;
      for (let i = 1; i < splitStep.length; i++) {
        if (y > 280) {
          pdf.addPage();
          y = 10;
        }
        pdf.text(splitStep[i], 20, y);
        y += 6;
      }
      y += 1;
    });

    pdf.save(`${rec.recipeName || "Recipe"}.pdf`);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-6 pt-0">
        <Link to="/history" className="inline-block !text-black text-3xl">
          <IoArrowBackCircleSharp />
        </Link>

        <div
          id="recipe-content"
          className="max-w-6xl mx-auto px-6 pb-6 pt-4 bg-white"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm text-gray-700 dark:text-gray-300">
              <strong>Preparation Time:</strong> {rec.prepTime}
            </p>
            <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm text-gray-700 dark:text-gray-300">
              <strong>Cooking Time:</strong> {rec.cookTime}
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
        <button
          onClick={downloadPDF}
          className="mt-6 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md transition-all hover:scale-105 hover:from-purple-700 hover:to-indigo-700"
        >
          <FaDownload className="inline mr-1" /> Download as PDF
        </button>
      </div>
    </div>
  );
};

export default RecipeDisplay;
