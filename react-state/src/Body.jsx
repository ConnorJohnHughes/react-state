import React, { useState } from "react"
import IngredientsList from "./components/IngredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import { getRecipeFromMistral} from "./ai.js"


export default function Body() {

    const [ingredients, setIngredients] = React.useState(
        []
    )
    const [recipe, setRecipe] = useState("");



    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    async function getRecipe() {
        try {
            const markDownRecipe = await getRecipeFromMistral(ingredients)
            setRecipe(markDownRecipe)
        } catch (err) {
            console.error("FRONTEND ERROR:", err)
        }
    }

    

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && 
                <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
            }
            
            {recipe && <ClaudeRecipe recipe={recipe} />}

        </main>
    )
}