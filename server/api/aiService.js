import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateRecipeWithGemini = async (ingredientsArr, foodStyle, allowExtraIngredients, name, email) => {
    const ingredientsStr = ingredientsArr.join(", ");
    const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients from the user and suggests a ${foodStyle ? foodStyle : 'any'}-style recipe they can make.
        ${allowExtraIngredients ? "Use some or all of the provided ingredients. You may include additional ingredients if necessary, but keep them minimal." : "Use only the provided ingredients. Do not add any extra ingredients beyond what the user has mentioned." }.
        Format your response in Markdown for better readability on a web page.`;

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
