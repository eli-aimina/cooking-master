const searchMeal = () =>{
    const mealName = document.getElementById('meal-name').value;
    if(mealName){
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+mealName)
        .then(res => res.json())
        .then(data => displayMeals(data.meals));
    }
    else{
        alert("Please input meal name");
        return 0;
    }
}

const displayMeals = meals =>{
    const mealsDiv = document.getElementById('meals');
    mealsDiv.innerHTML = "";
    if(meals){
        meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'col-md-3';
            const mealInfo = `
                <div class="card card-border shadow" onclick="displayMealDetail('${meal.idMeal}')">
                    <img src="${meal.strMealThumb}" class="card-img-top m-auto" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title"><b>${meal.strMeal}</b></h5>
                    </div>
                </div>
            `;
            mealDiv.innerHTML = mealInfo;
            mealsDiv.appendChild(mealDiv);
        });
    }
    else{
        const noMealDiv = document.createElement('div');
        noMealDiv.className = 'col-md-12';
        const noInfo = `
            <h1>No Meal Found</h1>
        `;
        noMealDiv.innerHTML = noInfo;
        mealsDiv.appendChild(noMealDiv);
    }
    
}

const displayMealDetail = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(res => res.json())
    .then(data => renderMealInfo(data.meals));
}

const renderMealInfo = meal => {
    const selectedMeal = meal[0];
    const mealsDiv = document.getElementById('meals');
    mealsDiv.innerHTML = "";
    const mealDiv = document.createElement('div');
    mealDiv.className = 'col-md-5';
    const mealInfo = `
        <div class="card card-border shadow" onclick="displayMealDetail('${selectedMeal.idMeal}')">
            <img src="${selectedMeal.strMealThumb}" class="card-img-top m-auto" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title"><b>${selectedMeal.strMeal}</b></h5>
                <h6>Ingredients</h6>
                <ul>
                    <li>${selectedMeal.strIngredient1}</li>
                    <li>${selectedMeal.strIngredient2}</li>
                    <li>${selectedMeal.strIngredient3}</li>
                    <li>${selectedMeal.strIngredient4}</li>
                    <li>${selectedMeal.strIngredient5}</li>
                </ul>
            </div>
        </div>
    `;
    mealDiv.innerHTML = mealInfo;
    mealsDiv.appendChild(mealDiv);
}