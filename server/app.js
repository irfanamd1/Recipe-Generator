import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {  generateRecipeWithGemini } from "./api/aiService.js"
import connectDB from "./config/mongodb.js"
import userModel from './model/user.js'

dotenv.config()

const app = express()
const PORT = 5000
connectDB();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Server is Ready')
})

app.post('/api/generateRecipe', async(req, res) => {
    const { ingredients, cuisine, meal, dietary, servings, cooking, time, flavor, skill, extraInc, name, email } = req.body;
    const recipe = await generateRecipeWithGemini(ingredients, cuisine, meal, dietary, servings, cooking, time, flavor, skill, extraInc, name, email);

    if (recipe.success) {
        try {
            const user = new userModel({
                name,
                email,
                recipe: recipe.response,
            });
            const createdUser = await user.save();

            res.status(200).send({
                success: true,
                response: recipe.response
            });
        } catch (error) {
            console.log(error);
        	res.json({success: false, message: error.message});			
        }
    } else {
        res.status(500).json({
            success: false,
            response: recipe.response || "No recipe generated",
        });
    }
});

app.get('/api/recipe/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await userModel.findById(id);
        if (!recipe) {
            return res.status(404).send({ message: "Recipe not found" });
        }
        res.status(200).send({ recipe });
    } catch (err) {
        res.status(500).send({ message: "Error retrieving recipe", error: err.message });
    }
});

app.get('/api/recipes', async (req, res) => {
    const { email } = req.query;
    
    try {
        const recipes = await userModel.find({ email });

        res.status(200).send({ recipes });
    } catch (err) {
        res.status(500).send({ message: "Error retrieving recipes", error: err.message });
    }
});

app.delete('/api/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).send({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error deleting recipe", error: err.message });
    }
});



app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
})
