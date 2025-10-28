//API Magic here...

// Get the form and input elements
const form = document.querySelector('.Recipe-prompts');
const searchInput = document.getElementById('searchinput');

// Listen for form submission
form.addEventListener('submit', function(event) {
    // Prevent page refresh
    event.preventDefault();
    
    // Get what the user typed
    const searchTerm = searchInput.value.trim();
    
    // Make sure they typed something
    if (searchTerm === '') {
        alert('Please enter a food item!');
        return;
    }
    
    // Search for recipes
    searchRecipes(searchTerm);
});

// Function to fetch recipes from the API
async function searchRecipes(searchTerm) {
    try {
        // Call TheMealDB API
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        
        // Display the results
        displayResults(data.meals);
        
    } catch (error) {
        alert('Error fetching recipes. Please try again!');
    }
}

// Function to display the results on the page
function displayResults(meals) {
    // Find or create a results container
    let resultsDiv = document.getElementById('results');
    if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.id = 'results';
        document.body.appendChild(resultsDiv);
    }
    
    // Clear previous results
    resultsDiv.innerHTML = '';
    
    // Check if we found any recipes
    if (!meals) {
        resultsDiv.innerHTML = '<p>No recipes found. Try searching for something else!</p>';
        return;
    }
    
    // Create HTML for each recipe
    meals.forEach(meal => {
        // Create a div for each recipe
        const recipeDiv = document.createElement('div');
        recipeDiv.style.border = '2px solid #064f8f';
        recipeDiv.style.margin = '20px';
        recipeDiv.style.padding = '20px';
        recipeDiv.style.backgroundColor = '#083368';
        
        // Recipe Title
        const title = document.createElement('h3');
        title.textContent = meal.strMeal;
        title.style.color = 'white';
        recipeDiv.appendChild(title);
        
        // Recipe Image
        const image = document.createElement('img');
        image.src = meal.strMealThumb;
        image.style.width = '300px';
        image.style.borderRadius = '10px';
        recipeDiv.appendChild(image);
        
        // Ingredients heading
        const ingredientsHeading = document.createElement('h4');
        ingredientsHeading.textContent = 'Ingredients:';
        ingredientsHeading.style.color = 'white';
        recipeDiv.appendChild(ingredientsHeading);
        
        // Ingredients list
        const ingredientsList = document.createElement('ul');
        ingredientsList.style.color = 'white';
        ingredientsList.style.textAlign = 'left';
        
        // Loop through ingredients (up to 20)
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = `${measure} ${ingredient}`;
                ingredientsList.appendChild(li);
            }
        }
        recipeDiv.appendChild(ingredientsList);
        
        // Instructions
        const instructionsHeading = document.createElement('h4');
        instructionsHeading.textContent = 'Instructions:';
        instructionsHeading.style.color = 'white';
        recipeDiv.appendChild(instructionsHeading);
        
        const instructions = document.createElement('p');
        instructions.textContent = meal.strInstructions;
        instructions.style.color = 'white';
        instructions.style.textAlign = 'left';
        recipeDiv.appendChild(instructions);
        
        // Video link (if available)
        if (meal.strYoutube) {
            const videoLink = document.createElement('a');
            videoLink.href = meal.strYoutube;
            videoLink.textContent = 'Watch Video';
            videoLink.target = '_blank';
            videoLink.style.color = '#64b5f6';
            videoLink.style.display = 'block';
            videoLink.style.marginTop = '10px';
            recipeDiv.appendChild(videoLink);
        }
        
        // Add the recipe to results
        resultsDiv.appendChild(recipeDiv);
    });
}