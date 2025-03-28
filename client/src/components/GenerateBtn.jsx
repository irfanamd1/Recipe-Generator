import React from 'react'
import { IoSparklesSharp } from "react-icons/io5";

const GenerateBtn = (props) => {
  return (
    <div>
      {props.ingredients.length > 0 && (
        <div className="text-center mt-6" ref={props.recipeRef}>
          <button onClick={props.getRecipe} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-2 rounded-lg shadow-md transition-all hover:scale-105 hover:from-purple-700 hover:to-indigo-700">
            <IoSparklesSharp className='inline-flex text-xl' /> Generate a Recipe
          </button>
        </div>
      )}
    </div>
  )
}

export default GenerateBtn
