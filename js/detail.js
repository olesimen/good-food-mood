import { url, options } from "./constants/api.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id;

if (params.has("id")) {
    id = params.get("id");
} else {
    document.location.href = "/";
}

const detailsUrl = `${url}recipes/detail?id=${id}`;

async function getDetails() {
    try {
        const response = await fetch(detailsUrl, options);
        const data = await response.json();
        console.log(data);
        renderRecipe(data, ".recipe-article");
    } catch (error) {}
}

getDetails();

function renderRecipe(data, targetElement) {
    const {
        thumbnail_url,
        name,
        tags,
        description,
        cook_time_minutes,
        yields,
        sections,
        instructions,
    } = data;

    // console.log(instructions);

    const element = document.querySelector(targetElement);
    element.innerHTML = "";

    const tagsHTML = makeTags(tags);
    const sectionsHTML = makeIngredientsSections(sections);
    const directionsHTML = makeDirections(instructions);

    element.innerHTML += `<img class="image--full-width" src="${thumbnail_url}" alt="${name}">

    <header class="recipe-article__header">
        <h1 class="recipe-article__name">${name}</h1>
        <ul class="tag-list" aria-label="Recipe tags">
            ${tagsHTML}
        </ul>
        <section class="recipe-article__description">
            ${description}
        </section>
        <dl class="recipe-article__meta-list">
            <div class="recipe-article__meta-container">
                <span class="material-icons recipe-article__meta-icon" aria-hidden="true">
                    schedule
                </span>
                <dt class="recipe-article__meta-name">Cooking time</dt>
                <dd class="recipe-article__meta-value">${cook_time_minutes}mins</dd>
            </div>
            <div class="recipe-article__meta-container">
                <span class="material-icons recipe-article__meta-icon" aria-hidden="true">
                    people
                </span>
                <dt class="recipe-article__meta-name">Portions</dt>
                <dd class="recipe-article__meta-value">${yields}</dd>
            </div>
        </dl>
    </header>
    <main>
        <section class="ingredients">
            <h2 class="ingredients__title">Ingredients</h2>
            ${sectionsHTML}
        </section>
        <section class="directions">
            <h2 class="directions__title">Directions</h2>
            <ol class="directions__list">
                ${directionsHTML}
            </ol>
        </section>
    </main>`;
}

function makeTags(tagsArray) {
    let tagsHTML = "";
    tagsArray.forEach((tag) => {
        tagsHTML += `<li class="tag-list__item">${tag.display_name}</li>`;
    });

    return tagsHTML;
}

function makeIngredientsSections(ingredientsArray) {
    let ingredientsSectionsHTML = "";

    ingredientsArray.forEach((section) => {
        let listHTML = makeIngredients(section.components);

        ingredientsSectionsHTML += `<h3 class="ingredients__title">${section.name}</h3>
        <ul class="ingredients__list">${listHTML}</ul>`;
    });

    return ingredientsSectionsHTML;
}

function makeIngredients(ingredients) {
    let ingredientHTML = "";

    ingredients.forEach((ingredient) => {
        ingredientHTML += `<li class="ingredients__item">${ingredient.raw_text}</li>`;
    });

    return ingredientHTML;
}

function makeDirections(directions) {
    let directionsHTML = "";

    directions.forEach((step) => {
        directionsHTML += `<li class="directions__list-item">${step.display_text}</li>`;
    });

    return directionsHTML;
}
