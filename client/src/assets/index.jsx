export const options = [
  {
    name: "Cuisine Type (Optional):",
    option: [
      "None",
      "Italian",
      "Chinese",
      "Mexican",
      "Indian",
      "Mediterranean",
      "Thai",
      "Japanese",
      "French",
      "Greek",
      "Korean",
      "Vietnamese",
      "Spanish",
      "American",
      "Middle Eastern",
    ],
    value: 'cuisine',
    change: 'setCuisine'
  },
  {
    name: "Meal Type (Optional):",
    option: [
      "None",
      "Breakfast",
      "Lunch",
      "Dinner",
      "Snack",
      "Dessert",
      "Appetizer",
      "Side Dish",
      "Drink",
    ],
    value: 'meal',
    change: 'setMeal'
  },
  {
    name: "Dietary Preferences (Optional):",
    option: [
      "None",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Dairy-Free",
      "Low-Carb",
      "Keto",
      "Paleo",
      "Nut-Free",
      "Soy-Free",
      "Egg-Free",
      "Low-Sodium",
    ],
    value: 'dietary',
    change: 'setDietary'
  },
  {
    name: "Number of Servings (Optional):",
    option: ["None", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20],
    value: 'servings',
    change: 'setServings'
  },
  {
    name: "Cooking Method (Optional):",
    option: [
      "None",
      "Baking",
      "Grilling",
      "Frying",
      "Boiling",
      "Steaming",
      "Roasting",
      "Slow Cooking",
      "Pressure Cooking",
      "Sautéing",
      "Broiling",
      "Stir-Frying",
      "Microwaving",
      "Poaching",
    ],
    value: 'cooking',
    change: 'setCooking'
  },
  {
    name: "Flavor Profile (Optional):",
    option: [
      "None",
      "Spicy",
      "Sweet",
      "Savory",
      "Tangy",
      "Bitter",
      "Sour",
      "Umami",
      "Salty",
      "Mild",
      "Smoky",
    ],
    value: 'flavor',
    change: 'setFlavor'
  },
  {
    name: "Skill Level (Optional):",
    option: [
      "None",
      "Beginner",
      "Intermediate",
      "Expert",
      "Advanced Beginner",
      "Novice",
      "Professional",
    ],
    value: 'skill',
    change: 'setSkill'
  },
  {
    name: "Cooking Time (Optional):",
    option: [
      "None",
      "Under 15 minutes",
      "15-30 minutes",
      "30-45 minutes",
      "45-60 minutes",
      "1-2 hours",
      "Over 2 hours",
    ],
    value: 'time',
    change: 'setTime'
  },
  {
    name: "Extra Ingredients (Optional):",
    option: [
      "None",
      "Yes",
      "No"
    ],
    value: 'extraInc',
    change: 'setExtraInc'
  },
];
