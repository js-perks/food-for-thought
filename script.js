//API magic here...

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
        // Split by commas if user entered multiple ingredients
        const ingredients = searchTerm.split(',').map(item => item.trim());
        
        let allMeals = [];
        
        // Search for each ingredient
        for (let ingredient of ingredients) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            const data = await response.json();
            
            if (data.meals) {
                allMeals = allMeals.concat(data.meals);
            }
        }
        
        // Remove duplicates by meal ID
        const uniqueMeals = [];
        const seenIds = new Set();
        
        for (let meal of allMeals) {
            if (!seenIds.has(meal.idMeal)) {
                seenIds.add(meal.idMeal);
                uniqueMeals.push(meal);
            }
        }
        
        // Display the results
        displayResults(uniqueMeals);
        
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
    if (!meals || meals.length === 0) {
        resultsDiv.innerHTML = '<p style="color: white; padding: 20px;">No recipes found. Try searching for something else!</p>';
        return;
    }
    
    // Show how many results
    const resultCount = document.createElement('h2');
    resultCount.textContent = `Found ${meals.length} Recipe(s)`;
    resultCount.style.color = 'white';
    resultCount.style.padding = '20px';
    resultsDiv.appendChild(resultCount);
    
    // Create HTML for each recipe (simplified - just showing basics)
    meals.forEach(meal => {
        // Create a div for each recipe
        const recipeDiv = document.createElement('div');
        recipeDiv.style.border = '2px solid #064f8f';
        recipeDiv.style.margin = '20px';
        recipeDiv.style.padding = '20px';
        recipeDiv.style.backgroundColor = '#083368';
        recipeDiv.style.cursor = 'pointer';
        
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
        
        // Add click to get full details
        recipeDiv.addEventListener('click', function() {
            getFullRecipe(meal.idMeal);
        });
        
        // Add the recipe to results
        resultsDiv.appendChild(recipeDiv);
    });
}

// Function to get full recipe details when clicked
async function getFullRecipe(mealId) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        
        if (data.meals && data.meals[0]) {
            showFullRecipe(data.meals[0]);
        }
    } catch (error) {
        alert('Error loading recipe details.');
    }
}

// Function to show full recipe in a popup-style overlay
function showFullRecipe(meal) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '1000';
    overlay.style.overflowY = 'auto';
    overlay.style.padding = '20px';
    
    // Create content container
    const content = document.createElement('div');
    content.style.backgroundColor = '#083368';
    content.style.maxWidth = '800px';
    content.style.margin = '0 auto';
    content.style.padding = '30px';
    content.style.borderRadius = '10px';
    content.style.position = 'relative';
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕ Close';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.padding = '10px 20px';
    closeBtn.style.fontSize = '16px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.backgroundColor = '#064f8f';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '5px';
    closeBtn.addEventListener('click', () => overlay.remove());
    content.appendChild(closeBtn);
    
    // Recipe Title
    const title = document.createElement('h2');
    title.textContent = meal.strMeal;
    title.style.color = 'white';
    title.style.marginTop = '0';
    content.appendChild(title);
    
    // Recipe Image
    const image = document.createElement('img');
    image.src = meal.strMealThumb;
    image.style.width = '100%';
    image.style.maxWidth = '400px';
    image.style.borderRadius = '10px';
    content.appendChild(image);
    
    // Ingredients heading
    const ingredientsHeading = document.createElement('h3');
    ingredientsHeading.textContent = 'Ingredients:';
    ingredientsHeading.style.color = 'white';
    ingredientsHeading.style.marginTop = '20px';
    content.appendChild(ingredientsHeading);
    
    // Ingredients list
    const ingredientsList = document.createElement('ul');
    ingredientsList.style.color = 'white';
    ingredientsList.style.textAlign = 'left';
    
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = `${measure} ${ingredient}`;
            ingredientsList.appendChild(li);
        }
    }
    content.appendChild(ingredientsList);
    
    // Instructions
    const instructionsHeading = document.createElement('h3');
    instructionsHeading.textContent = 'Instructions:';
    instructionsHeading.style.color = 'white';
    instructionsHeading.style.marginTop = '20px';
    content.appendChild(instructionsHeading);
    
    const instructions = document.createElement('p');
    instructions.textContent = meal.strInstructions;
    instructions.style.color = 'white';
    instructions.style.textAlign = 'left';
    instructions.style.lineHeight = '1.6';
    content.appendChild(instructions);
    
    // Video link (if available)
    if (meal.strYoutube) {
        const videoLink = document.createElement('a');
        videoLink.href = meal.strYoutube;
        videoLink.textContent = '📺 Watch Video';
        videoLink.target = '_blank';
        videoLink.style.color = '#64b5f6';
        videoLink.style.display = 'block';
        videoLink.style.marginTop = '20px';
        videoLink.style.fontSize = '18px';
        content.appendChild(videoLink);
    }
    
    // Add content to overlay and overlay to page
    overlay.appendChild(content);
    document.body.appendChild(overlay);
}