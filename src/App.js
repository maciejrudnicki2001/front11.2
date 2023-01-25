import React, {useEffect} from 'react';
import axios from "axios";

import Meals from "./components/Meals";

export default function App() {
  const [meals, setMeals] = React.useState([]);
    const [renderDetails, setRenderDetails] = React.useState(-1);
    const [selectCategory, setSelectCategory] = React.useState("All");
    const [selectCountry, setSelectCountry] = React.useState("All");
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    async function fetchRandomMeals(){
        setLoading(true);
        await axios("https://www.themealdb.com/api/json/v1/1/random.php")
            .then((response) => {
                setMeals(response.data.meals);
            })
            .catch((error) => {
                setError(error);
            });
        setLoading(false);
    }

    useEffect(() => {
        fetchRandomMeals();
    }, []);

    return (
        <div className="App">
            <Meals
                setError={setError}
                meals={meals}
                setMeals={newMeals => setMeals(newMeals)}
                setLoading={setLoading}
                setRenderDetails={setRenderDetails}
                renderDetails={renderDetails}
                setSelectCategory={setSelectCategory}
                setSelectCountry={setSelectCountry}
                selectCategory={selectCategory}
                selectCountry={selectCountry}
                fetchMealById={fetchMealById}
            />
        </div>
    );

}

