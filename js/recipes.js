import { url, options } from "./constants/api.js";

const recipesUrl = `${url}recipes/list?from=0&size=20&tags=under_30_minutes`;

async function getRecipes() {
    try {
        const response = await fetch(recipesUrl, options);
        const data = await response.json();
        // console.log(data);
        renderRecipes(data, ".recipes-container");
    } catch (error) {}
}

getRecipes();

function renderRecipes(data, targetElement) {
    const element = document.querySelector(targetElement);
    const { results: recipes } = data;
    console.log(recipes);

    let html = "";

    recipes.forEach((recipe) => {
        const { id, name, thumbnail_url, total_time_tier } = recipe;
        let time = "Quick";

        if (total_time_tier) {
            time = total_time_tier.display_tier;
        }

        html += `<article class="recipe">
        <h2>${name}</h2>
        <img src="${thumbnail_url}" alt="${name}" class="recipe__image">
        <ul class="tag-list" aria-label="Recipe tags">
            <li class="tag-list__item">${time}</li>
        </ul>
        <a href="detail.html?id=${id}" class="btn-link">Read recipe</a>
    </article>`;
    });

    element.innerHTML = html;
}
