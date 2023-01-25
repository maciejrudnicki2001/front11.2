import React from "react";

import Details from "./Details";
import DisplayMeals from "./DisplayMeals";
import axios from "axios";

export default function Meals({setError = f => f, meals, setMeals = f => f, setLoading = f => f, setRenderDetails = f => f,
                              renderDetails, setSelectCategory = f => f, setSelectCountry = f => f, selectCategory, selectCountry, fetchMealById = f => f
                              }) {

    async function fetchMealsBySelect(type, value){
        let url;
        switch (type){
            case "category":
                url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
                break;
            case "country":
                url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
                break;
            default:
                break;
        }

        setLoading(true);

        await axios(url)
            .then((response) => {
                for (const meal of response.data.meals){
                    fetchMealById(meal.idMeal);
                }
            })
            .catch((error) => {
                setError(error);

            }
        );

        setLoading(false);



    }

    return (
        <>
            {renderDetails !== -1 ?
                <Details
                    id={renderDetails}
                    meals={meals}
                    showDetails={id => {
                        setRenderDetails(id)
                    }}
                    setError={setError}
                />
                :
                <DisplayMeals
                    meals={meals}
                    setMeals={newMeals => setMeals(newMeals)}
                    renderDetails={setRenderDetails}
                    showDetails={id => {
                        setRenderDetails(id)
                    }}
                    setCategory={category => {
                        setSelectCategory(category);
                        setSelectCountry(null);
                        setMeals([]);
                        fetchMealsBySelect('category', category);
                    }}
                    selectCategory={selectCategory}
                    setCountry={country => {
                        setSelectCountry(country);
                        setSelectCategory(null);
                        setMeals([]);
                        fetchMealsBySelect('country', country)
                    }}
                    selectCountry={selectCountry}
                    setCategoryAndCountryNull={() => {
                        setSelectCategory(null);
                        setSelectCountry(null);
                    }}
                    setError={setError}
                />
            }
        </>
    );
}
