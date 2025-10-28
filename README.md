# 🍽️ Food for Thought - Recipe Search Website

**Where flavor meets passion** — A web application that helps you discover recipes based on ingredients you have at hand.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📖 About

Food for Thought is an intuitive recipe search platform that allows users to find delicious meals by simply entering ingredients they have available. What started as a small kitchen dream became a journey of suggesting authentic, fresh, and heartwarming dishes.

We believe food tells a story — and every dish on our website is a chapter full of flavor.

## ✨ Features

- 🔍 **Intelligent Ingredient Search** - Enter multiple ingredients separated by commas
- 📊 **Smart Recipe Ranking** - Results are ranked by how many of your ingredients they contain
  - Recipes with all ingredients appear first
  - Partial matches shown next
  - All possibilities displayed with clear match indicators
- ⚡ **Loading Indicators** - Visual feedback during recipe searches
- 🖼️ **Recipe Details Popup** - Click any recipe to view full details including:
  - Complete ingredient list with measurements
  - Step-by-step cooking instructions
  - Recipe images
  - Video tutorials (when available)
- 🍪 **Cookie Consent** - User-friendly cookie notification
- 🔒 **Privacy Policy** - Comprehensive privacy information
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🚀 Demo

### Search Examples
- Single ingredient: `chicken`
- Multiple ingredients: `beef, onion, tomato`
- Best results: `chicken, garlic, lemon`

### How It Works
1. Enter ingredients you have (comma-separated)
2. Click "Search Here"
3. See recipes ranked by match percentage
   - ✓ 3/3 ingredients - Perfect match!
   - ✓ 2/3 ingredients - Partial match
   - ✓ 1/3 ingredients - Contains at least one ingredient
4. Click any recipe card to see full details

## 🛠️ Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling with gradients and animations
- **JavaScript (Vanilla)** - Dynamic functionality and API integration
- **TheMealDB API** - Recipe data source

## 📦 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/food-for-thought.git
   cd food-for-thought
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```

3. **Start searching!**
   - Navigate to `http://localhost:8000` (if using a server)
   - Or double-click `index.html` to open directly

## 📁 Project Structure

```
food-for-thought/
│
├── index.html          # Main page
├── About.html          # About page
├── Privacy.html        # Privacy policy
├── style.css           # Main stylesheet
├── script.js           # Recipe search logic & API integration
├── cookie.js           # Cookie consent functionality
└── README.md           # Project documentation
```

## 🔌 API Information

This project uses [TheMealDB API](https://www.themealdb.com/api.php) - a free recipe API.

### API Endpoints Used:
- **Filter by ingredient:** `/filter.php?i={ingredient}`
- **Lookup full recipe:** `/lookup.php?i={mealId}`

### API Key
Currently using the free test API key (`1`). For production use, consider [supporting TheMealDB](https://www.themealdb.com/api.php) to get an upgraded API key.

## 💡 Usage

### Basic Search
```
Enter: chicken
Result: All recipes containing chicken
```

### Multi-Ingredient Search
```
Enter: beef, potato, carrot
Result: Recipes ranked by how many ingredients they contain
- Recipes with all 3 shown first
- Recipes with 2 shown next
- Recipes with 1 shown last
```

### Viewing Recipe Details
- Click any recipe card
- View full ingredients list
- Read cooking instructions
- Watch video tutorial (if available)
- Click "✕ Close" to return to results

## 🎨 Customization

### Changing Colors
Edit `style.css`:
```css
/* Header gradient */
background: linear-gradient(90deg, #004aad, #06b6d4);

/* Recipe cards */
background-color: #083368;
```

### Modifying Search Behavior
Edit `script.js` to adjust:
- Number of results displayed
- Ranking algorithm
- Loading animation style

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Team

Created by:
- **Benjamin**
- **Joshua**
- **Arpitha**

## 🐛 Known Issues

- API rate limits may apply when making many searches quickly
- Some recipes may not have video tutorials available
- Search is limited to ingredients in TheMealDB database

## 🔮 Future Enhancements

- [ ] Save favorite recipes
- [ ] Dietary restrictions filter (vegetarian, vegan, gluten-free)
- [ ] Cuisine type filter
- [ ] Shopping list generator
- [ ] Meal planning feature
- [ ] User accounts
- [ ] Recipe ratings and reviews

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

[TheMealDB](https://www.themealdb.com/) for providing the free recipe API

---

**⭐ If you found this project helpful, please consider giving it a star!**

Made with ❤️ and lots of 🍕
