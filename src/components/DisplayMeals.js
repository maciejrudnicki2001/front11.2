import React, {useState} from "react";
import axios from "axios";
import Criteria from "./Criteria";

export default function DisplayMeals({meals, setMeals = f => f, shotDetails = f => f,
                                     setCategory = f => f, selectCategory, setCountry = f => f,
                                     selectCountry, setCategoryAndCountryNull = f => f}){
    const [searchMeal, setSearchMeal] = useState("");

    function handleClick(id){
        showDetails(id);
    }

    function getCategories(){
        return Criteria.categories.map((category) => {
            return <option key={category} value={category}>{category}</option>;
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`);
            setMeals(response.data.meals);
        }catch(error){
            setError(error);
        }

        setCategoryAndCountryNull(true);
    }

    return (
        <div id = "search">
            {selectCategory && <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {getCategories()}
            </select>}
            {selectCountry && <select onChange={(e) => setCountry(e.target.value)}>
                <option value="">Select Country</option>
                {Criteria.countries.map((country) => {
                    return <option key={country} value={country}>{country}</option>;
                } )}
            </select>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search for a meal" value={searchMeal} onChange={(e) => setSearchMeal(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <div className="meals">
                {meals.map((meal) => (
                    <div key={meal.idMeal} className="meal">
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                        <h2>{meal.strMeal}</h2>
                        <button onClick={() => handleClick(meal.idMeal)}>Details</button>

        </div>

                ))}
)}
            </div>
        </div>
    )
}

