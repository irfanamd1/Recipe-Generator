import { FaRegTrashAlt } from "react-icons/fa";

const IngredientsList = (props) => {
	return (
		<section>
			<div className="ingredients-container">
				<h2>Available Ingredients</h2>
				<table className="ingredients-table">
				<thead>
					<tr>
						<th className="small-column">S.No</th>
						<th className="wide-column">Name</th>
						<th className="small-column">Action</th>
					</tr>
				</thead>
					<tbody>
						{props.ingredients.map((ingredient, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{ingredient}</td>
							<td>
								<FaRegTrashAlt 
								 onClick={() => props.onRemove(index)}
								 style={{ cursor: 'pointer'}}
								/>
							</td>
						</tr>
						))}
					</tbody>
				</table>

			</div>
			{props.ingredients.length > 0 && (
				<div className="get-recipe-container" ref={props.recipeRef}>
					<div>
						<h2>Ready for a delicious recipe ?</h2>
						<p>Generate a unique recipe using your list of ingredients!</p>
					</div>
					<div>
						<select
							value={props.styleValue}
							onChange={(e) => props.addStyle(e.target.value)}
							aria-label="Select food style"
							required
						>
							<option value="" disabled>Select Food Style</option>
							<option value="Indian">Indian</option>
							<option value="Italian">Italian</option>
							<option value="Chinese">Chinese</option>
							<option value="Mexican">Mexican</option>
							<option value="American">American</option>
						</select>
						<select
							value={props.extraIncValue}
							onChange={(e) => props.addExtraInc(e.target.value)}
							aria-label="Allow extra ingredients"
							required
						>
							<option value="" disabled>Allow Extra Ingredients</option>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>
					</div>
					<button onClick={props.getRecipe} className="get-recipe-btn">Generate a Recipe</button>
				</div>
			)}
		</section>
	)
}

export default IngredientsList
