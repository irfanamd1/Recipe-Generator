import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"

dotenv.config()

const generativeAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY)

export const generateRecipeWithGemini = async(ingredientsArr, foodStyle, allowExtraIngredients) => {
	const ingredientsStr = ingredientsArr.join(", ")
	const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests an ${foodStyle ? foodStyle : 'any'}-style recipe they could make ${
		allowExtraIngredients 
		  ? "with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients."
		  : "using only the provided ingredients. Do not add any extra ingredients beyond what the user has mentioned."
	  	}. Format your response in markdown to make it easier to render on a web page.`;
	try {
		const model = await generativeAI.getGenerativeModel({
			model: "gemini-1.5-flash",
			systemInstruction: SYSTEM_PROMPT
		})
	
		const res = await model.generateContent({
			contents: [
				{
					role: 'user',
					parts: [
						{
							text: `I have ${ingredientsStr}. Please give me a recipe you'd recommend I make!`
						}
					],
				}
			],
			generationConfig: {
				maxOutputTokens: 1000
			}
		})

		return {
			success: true,
			response: res.response.text()
		}
	} catch (err) {
		console.error(err.message)

		return {
			success: false,
			response: err.message
		}
	}
}
