import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { options } from "../assets";

const Advanced = ({
  cuisine, setCuisine, meal, setMeal, dietary, setDietary, servings, setServings,
  cooking, setCooking, skill, setSkill, time, setTime, flavor, setFlavor, extraInc, setExtraInc
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const values = { cuisine, meal, dietary, servings, cooking, skill, time, flavor, extraInc };
  const setters = { setCuisine, setMeal, setDietary, setServings, setCooking, setSkill, setTime, setFlavor, setExtraInc };

  return (
    <div className="mt-6 md:mx-auto md:w-1/2">
      {/* Toggle Advanced Options */}
      <p
        className="cursor-pointer flex items-center gap-2 text-gray-800 font-semibold hover:text-gray-900 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        Advanced Options
        <FaAngleDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </p>

      {/* Collapsible Advanced Options */}
      <div
        className={`border mt-3 p-4 rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 max-h-screen py-4" : "opacity-0 max-h-0 overflow-hidden p-0"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-6">
          {options.map((item, index) => (
            <div key={index}>
              <label className="block text-gray-700 text-sm font-medium mb-2">{item.name}</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 text-sm rounded-md cursor-pointer transition-all focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50"
                value={values[item.value] || "None"}
                onChange={(e) => setters[item.change](e.target.value === "None" ? "" : e.target.value)}
              >
                {item.option.map((opt, idx) => (
                  <option key={idx} value={opt} className="text-gray-700">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advanced;

