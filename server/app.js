import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {  generateRecipeWithGemini } from "./api/aiService.js"

dotenv.config()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Server is Ready')
})

app.post('/api/generateRecipe', async(req, res) => {
	const { ingredients, foodStyle, allowExtraIngredients } = req.body
	const recipe = await generateRecipeWithGemini(ingredients, foodStyle, allowExtraIngredients)

	if (recipe.success) {
		res.status(200).send({
			success: recipe.success,
			response: recipe.response
		})
	} else {
		res.status(500).send({
			success: recipe.success,
			response: recipe.response
		})
	}
})

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
})
