import { useState, useRef, useEffect } from 'react'
import IngredientsList from './IngredientsList'
import GeminiRecipe from './GeminiRecipe'

const MainContent = () => {

	const [ingredients, setIngredients] =  useState([])
	const [loading, setLoading] = useState(false);
	const [recipe, setRecipe] = useState("")
	const [foodStyle, setFoodStyle] = useState("")
	const [allowExtraIngredients, setAllowExtraIngredients] = useState("")
	const inputRef = useRef(null)
	const recipeSectionRef = useRef(null)

	useEffect(() => {
		if(recipe && recipeSectionRef.current) {
			recipeSectionRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [recipe])

	const clearFun =  () => {
		setRecipe('');
		setFoodStyle('');
		setAllowExtraIngredients('');
	}

	const addIngredient = (event) => {
		event.preventDefault()

		const formData = new FormData(event.target)
		const newIngredient = formData.get('ingredient')

		setIngredients(oldIngredients => [
			...oldIngredients,
			newIngredient
		])

		event.target.reset()
		inputRef.current.focus()
	}

	const removeIngredient = (index) => {
		setIngredients((prevIngredients) => prevIngredients.filter((_, i) => i !== index));
	};

	const getRecipe = async() => {
		setLoading(true);
		const res = await fetch('/api/generateRecipe', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				ingredients,
				foodStyle,
				allowExtraIngredients
			})
		})

		const data = await res.json()

		setRecipe(data.response)
		setIngredients([]);
		setLoading(false);
	}

	return (
		<main>
			{
				recipe ?
					<button className='ingredients-clear' onClick={ clearFun }>Clear Recipe</button>
				:
					<form onSubmit={addIngredient} method='POST' className='ingredients-input' >
						<input
							type="text"
							placeholder="e.g. Tomato" 
							aria-label="Add ingredient"
							name="ingredient"
							ref={inputRef}
							autoComplete='off'
							required
						/>
						<button>Add Ingredients</button>
					</form> 
			}

			{ingredients.length > 0 && (
				<IngredientsList 
					ingredients={ingredients}
					getRecipe={getRecipe}
					recipeRef={recipeSectionRef}
					onRemove={  removeIngredient }
					addStyle= { setFoodStyle }
					styleValue= { foodStyle }
					addExtraInc= { setAllowExtraIngredients }
					extraIncValue= { allowExtraIngredients }
				/>
			)}			

			{recipe != "" && (
				<GeminiRecipe 
					recipe={recipe}
				/>
			)}

			{loading && (
			<div className="loading-overlay">
				<div className="loading-text">
				<span className="text">Generating Recipe</span>
				<span className="dots">...</span>
				</div>
			</div>
			)}

		</main>
	)
}

export default MainContent