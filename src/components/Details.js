import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Details({id, meals, showDetails = f => f, setError = f => f}){
    const [meal, setMeal] = useState(meals[id]);

    function handleClick(id){
        showDetails(id);
    }

    async function fetchMeal(id){
        try{
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            setMeal(response.data.meals[0]);
        }catch(error){
            setError(error);
        }
    }

    useEffect(() => {
        fetchMeal(meal.id);
    }, [meal.id]);

    const list = (meal) => {
        let list = [], i = 0;

        for (const mealNum in meal){
            if (mealNum.includes("strIngredient") && meal[mealNum] !== ""){
                list.push(<li key={i}>{meal[mealNum]}: {meal[`strMeasure${mealNum.slice(-1)}`]}</li>);
                i++;
            }
            if(mealNum === "strMeasure"){
                list.push(<li key={i}>{meal[mealNum]}</li>);
                i++;
            }
        }
        return list;
    }

    return (
        <div className="details">
            <div>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h2>{meal.strMeal}</h2>
                <div>Ingredients:
                    <ul>
                        {list(meal)}.map((item) => (
                            <li key={item.id}>{item}</li>
                        ))


                    </ul>

                </div>
            </div>

            <button onClick={() => handleClick(id)}>Back</button>
        </div>
    )

}