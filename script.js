//API magic here...

// Get the form and input elements
const form = document.querySelector('.Recipe-prompts');
const searchInput = document.getElementById('searchinput');

// Listen for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        alert('Please enter a food item!');
        return;
    }
    
    searchRecipes(searchTerm);
});

// Function to show loading icon
function showLoading() {
    let loadingDiv = document.getElementById('loading');
    if (!loadingDiv) {
        loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading';
        loadingDiv.style.textAlign = 'center';
        loadingDiv.style.padding = '40px';
        
        // Create spinner
        const spinner = document.createElement('div');
        spinner.style.border = '8px solid #f3f3f3';
        spinner.style.borderTop = '8px solid #064f8f';
        spinner.style.borderRadius = '50%';
        spinner.style.width = '60px';
        spinner.style.height = '60px';
        spinner.style.animation = 'spin 1s linear infinite';
        spinner.style.margin = '0 auto 20px';
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        const text = document.createElement('p');
        text.textContent = 'Searching for recipes...';
        text.style.color = 'white';
        text.style.fontSize = '18px';
        
        loadingDiv.appendChild(spinner);
        loadingDiv.appendChild(text);
        document.body.appendChild(loadingDiv);
    }
    loadingDiv.style.display = 'block';
}

// Function to hide loading icon
function hideLoading() {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
}

// Function to fetch recipes from the API
async function searchRecipes(searchTerm) {
    // Show loading
    showLoading();
    
    try {
        // Split by commas and clean up
        const userIngredients = searchTerm.split(',').map(item => item.trim().toLowerCase());
        
        let allMeals = [];
        
        // Search for each ingredient
        for (let ingredient of userIngredients) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            const data = await response.json();
            
            if (data.meals) {
                allMeals = allMeals.concat(data.meals);
            }
        }
        
        // Remove duplicates and get full details
        const uniqueMealIds = [...new Set(allMeals.map(meal => meal.idMeal))];
        const rankedMeals = [];
        
        for (let mealId of uniqueMealIds) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
            const data = await response.json();
            
            if (data.meals && data.meals[0]) {
                const recipe = data.meals[0];
                
                // Get all ingredients from this recipe
                const recipeIngredients = [];
                for (let i = 1; i <= 20; i++) {
                    const ingredient = recipe[`strIngredient${i}`];
                    if (ingredient && ingredient.trim() !== '') {
                        recipeIngredients.push(ingredient.toLowerCase());
                    }
                }
                
                // Count how many user ingredients are in this recipe
                let matchCount = 0;
                for (let userIng of userIngredients) {
                    for (let recipeIng of recipeIngredients) {
                        if (recipeIng.includes(userIng)) {
                            matchCount++;
                            break;
                        }
                    }
                }
                
                // Add match count to the recipe
                recipe.matchCount = matchCount;
                rankedMeals.push(recipe);
            }
        }
        
        // Sort by match count (highest first)
        rankedMeals.sort((a, b) => b.matchCount - a.matchCount);
        
        // Hide loading before displaying results
        hideLoading();
        displayResults(rankedMeals, userIngredients.length);
        
    } catch (error) {
        hideLoading();
        alert('Error fetching recipes. Please try again!');
    }
}

// Function to display the results on the page
function displayResults(meals, totalIngredients) {
    let resultsDiv = document.getElementById('results');
    if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.id = 'results';
        document.body.appendChild(resultsDiv);
    }
    
    resultsDiv.innerHTML = '';
    
    if (!meals || meals.length === 0) {
        resultsDiv.innerHTML = '<p style="color: white; padding: 20px;">No recipes found. Try searching for something else!</p>';
        return;
    }
    
    // Show count
    const resultCount = document.createElement('h2');
    resultCount.textContent = `Found ${meals.length} Recipe(s)`;
    resultCount.style.color = 'white';
    resultCount.style.padding = '20px';
    resultsDiv.appendChild(resultCount);
    
    // Create HTML for each recipe
    meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.style.border = '2px solid #064f8f';
        recipeDiv.style.margin = '20px';
        recipeDiv.style.padding = '20px';
        recipeDiv.style.backgroundColor = '#083368';
        recipeDiv.style.cursor = 'pointer';
        
        // Match indicator
        const matchBadge = document.createElement('div');
        matchBadge.textContent = `✓ ${meal.matchCount}/${totalIngredients} ingredients`;
        matchBadge.style.color = '#4CAF50';
        matchBadge.style.fontWeight = 'bold';
        matchBadge.style.marginBottom = '10px';
        recipeDiv.appendChild(matchBadge);
        
        // Title
        const title = document.createElement('h3');
        title.textContent = meal.strMeal;
        title.style.color = 'white';
        recipeDiv.appendChild(title);
        
        // Image
        const image = document.createElement('img');
        image.src = meal.strMealThumb;
        image.style.width = '300px';
        image.style.borderRadius = '10px';
        recipeDiv.appendChild(image);
        
        // Click for full details
        recipeDiv.addEventListener('click', function() {
            showFullRecipe(meal);
        });
        
        resultsDiv.appendChild(recipeDiv);
    });
}

// Function to show full recipe in a popup-style overlay
function showFullRecipe(meal) {
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
    
    // Title
    const title = document.createElement('h2');
    title.textContent = meal.strMeal;
    title.style.color = 'white';
    title.style.marginTop = '0';
    content.appendChild(title);
    
    // Image
    const image = document.createElement('img');
    image.src = meal.strMealThumb;
    image.style.width = '100%';
    image.style.maxWidth = '400px';
    image.style.borderRadius = '10px';
    content.appendChild(image);
    
    // Ingredients
    const ingredientsHeading = document.createElement('h3');
    ingredientsHeading.textContent = 'Ingredients:';
    ingredientsHeading.style.color = 'white';
    ingredientsHeading.style.marginTop = '20px';
    content.appendChild(ingredientsHeading);
    
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
    
    // Video link
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
    
    overlay.appendChild(content);
    document.body.appendChild(overlay);
}