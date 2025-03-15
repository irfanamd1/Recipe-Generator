import ReactMarkdown from "react-markdown"

const GeminiRecipe = (props) => {
	return (
		<section className="suggested-recipe-container" aria-live="polite">
			<h2 className="text-3xl font-semibold text-black mb-4">Recipe Recommendation:</h2>
			<ReactMarkdown className='text-black'>
				{props.recipe}
			</ReactMarkdown>
		</section>
	)
}

export default GeminiRecipe
