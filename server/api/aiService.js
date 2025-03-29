import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateRecipeWithGemini = async (ingredientsArr, cuisine, meal, dietary, servings, cooking, time, flavor, skill, extraInc, name, email) => {
    const ingredientsStr = ingredientsArr.join(", ");
    // const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients from the user and suggests a ${foodStyle ? foodStyle : 'any'}-style recipe they can make.
    //     ${allowExtraIngredients ? "Use some or all of the provided ingredients. You may include additional ingredients if necessary, but keep them minimal." : "Use only the provided ingredients. Do not add any extra ingredients beyond what the user has mentioned." }.
    //     Format your response in Markdown for better readability on a web page.`;

    // let SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make. ${extraInc === "Yes" ? "Use some or all of the provided ingredients. You may include additional ingredients if necessary, but keep them minimal." : "Use only the provided ingredients. Do not add any extra ingredients beyond what the user has mentioned." }. Format your response in Markdown for better readability on a web page.`;
    let SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make. ${extraInc === "Yes" ? "Use some or all of the provided ingredients. You may include additional ingredients if necessary, but keep them minimal." : "Use only the provided ingredients. Do not add any extra ingredients beyond what the user has mentioned." }. Respond **only** with valid JavaScript code, assigning the result to \`aiRecipe\` with **exact property names**: \`recipeName\`, \`ingredients\`, \`description\`, \`equipment\`, \`prepTime\`, \`cookTime\`, \`totalTime\`, \`difficulty\`, \`servings\`, \`cuisine\`, \`dietary\`, and \`instructions\`. No explanations, no formatting, no extra text. Example response: \`const aiRecipe = { recipeName: "Recipe Name", ingredients: ["Ingredient1", "Ingredient2"], description: "Short description.", equipment: ["Equipment1", "Equipment2"], prepTime: "15 minutes", cookTime: "30 minutes", totalTime: "45 minutes", difficulty: "Easy", servings: 2, cuisine: "Italian", dietary: ["Vegan", "Gluten-Free"], instructions: ["Step 1: Do this.", "Step 2: Do that."] };\` `;

    if (cuisine || meal || dietary || servings || cooking || time || flavor || skill) {
      SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients from the user and suggests a${
        cuisine ? ` ${cuisine}-style` : "any"
      } recipe they can make.${
        meal ? ` The dish should be suitable for ${meal.toLowerCase()}.` : ""
      }${
        dietary ? ` It should align with ${dietary.toLowerCase()} dietary preferences.` : ""
      }${
        servings && servings !== "None" ? ` The recipe should serve ${servings} people.` : ""
      }${
        cooking ? ` It should use ${cooking.toLowerCase()} as the cooking method.` : ""
      }${
        time ? ` The estimated cooking time should be ${time.toLowerCase()}.` : ""
      }${
        flavor ? ` The dish should have a ${flavor.toLowerCase()} flavor profile.` : ""
      }${
        skill ? ` It should be appropriate for a ${skill.toLowerCase()} cook.` : ""
      }${
        extraInc === "Yes" ? "Use some or all of the provided ingredients. You may include additional ingredients if necessary, but keep them minimal." : "Use only the provided ingredients. Do not add any extra ingredients beyond what the user has mentioned." }
       Respond **only** with valid JavaScript code, assigning the result to \`aiRecipe\` with **exact property names**: \`recipeName\`, \`ingredients\`, \`description\`, \`equipment\`, \`prepTime\`, \`cookTime\`, \`totalTime\`, \`difficulty\`, \`servings\`, \`cuisine\`, \`dietary\`, and \`instructions\`. No explanations, no formatting, no extra text. Example response: \`const aiRecipe = { recipeName: "Recipe Name", ingredients: ["Ingredient1", "Ingredient2"], description: "Short description.", equipment: ["Equipment1", "Equipment2"], prepTime: "15 minutes", cookTime: "30 minutes", totalTime: "45 minutes", difficulty: "Easy", servings: 2, cuisine: "Italian", dietary: ["Vegan", "Gluten-Free"], instructions: ["Step 1: Do this.", "Step 2: Do that."] };\` `;
    }

    try {
        const model = await generativeAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: SYSTEM_PROMPT
        });

        const res = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: `I have ${ingredientsStr}. Can you suggest a great recipe for me?`
                        }
                    ],
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000
            }
        });		
		
        const recipe = res.response.text();

        return {
            success: true,
            response: recipe
        };
    } catch (err) {
        console.error("Error generating recipe:", err.message);

        return {
            success: false,
            response: err.message
        };
    }
};
