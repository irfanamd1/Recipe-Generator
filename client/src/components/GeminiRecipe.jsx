import { useState, useEffect } from "react";

const GeminiRecipe = ({ recipe }) => {
    const [rec, setRec] = useState(null);

    useEffect(() => {
        if (!recipe) return;

        let parsedRecipe = null;

        if (typeof recipe === "string") {
            try {
                let cleanJson = recipe
                    .replace(/```javascript|```/g, "")
                    .trim()
                    .replace(/^const aiRecipe\s*=\s*/, "")
                    .replace(/;$/, "");

                parsedRecipe = new Function(`return (${cleanJson})`)();
                setRec(parsedRecipe);
            } catch (error) {
                console.error("Error parsing recipe:", error);
            }
        } else if (typeof recipe === "object") {
            setRec(recipe);
        }
    }, [recipe]);    

    if (!rec) return <p className="text-center text-gray-500">Loading recipe...</p>;

    return (
        <section className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {rec.recipeName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{rec.description}</p>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Ingredients:</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {rec.ingredients?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Equipments:</h3>
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
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Instructions:</h3>
                <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 leading-relaxed">
                    {rec.instructions?.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default GeminiRecipe;
