import { FaRegTrashAlt } from "react-icons/fa";

const IngredientsList = ({ ingredients, onRemove }) => {
  return (
    <section>
      <div className="border md:w-1/2 md:mx-auto mt-4 p-3 max-h-40 overflow-y-auto rounded-md bg-white shadow-md">
        {ingredients.length > 0 ? (
          ingredients.map((item, index) => (
            <span
              onClick={() => onRemove(index)}
              key={index}
              className="text-sm border border-gray-400 hover:border-red-600 hover:cursor-pointer hover:bg-red-100 rounded-full inline-flex items-center px-3 py-1 text-gray-700 bg-gray-200 m-2"
            >
              {item
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
                <FaRegTrashAlt className="ml-2 text-red-600" size={14} />
            </span>
          ))
        ) : (
          <p className="text-gray-500 text-center">No ingredients added</p>
        )}
      </div>
    </section>
  );
};

export default IngredientsList;



