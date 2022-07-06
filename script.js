const main = document.querySelector("main");
const recipe = document.querySelector(".floating-container");
const close = document.querySelector(".close");
const more = document.querySelector(".more");
const searchBtn = document.querySelector(".search-btn");
const cards = document.querySelector(".cards");
const h4 = document.querySelector(".title");
const img = document.querySelector(".img");
const ul = document.querySelector(".needs");
const instructions = document.querySelector(".decsr");

async function getAPI(search, i, j) {
  const api = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
  const response = await fetch(api);
  const data = await response.json();
  while (i < j) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src = "${data.meals[i].strMealThumb}" alt = "food">
    <h3>${data.meals[i].strMeal}</h3>
    <button class="get-recipe" data-id= "${data.meals[i].idMeal}">Get Recipe</button>`;
    cards.appendChild(card);
    console.log(card);
    i++;
  }
  const loadRecipe = document.querySelectorAll(".get-recipe");
  loadRecipe.forEach((ele) => {
    ele.onclick = () => {
      recipe.style.display = "unset";
      main.style.display = "none";
      const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ele.dataset.id}`;
      async function getAPI2(api) {
        const response = await fetch(api);
        const data = await response.json();
        console.log(data.meals[0]);
        h4.innerText = data.meals[0].strMeal;
        img.src = data.meals[0].strMealThumb;
        instructions.innerText = data.meals[0].strInstructions;
        lands = Object.values(data.meals[0]);
        console.log(lands);
        for (i = 9; i < 28; i++) {
          if (lands[i] == "") {
            break;
          }
          const li = document.createElement("li");
          li.innerText = lands[i];
          ul.appendChild(li);
        }
      }
      getAPI2(api);
    };
  });
}

i = 0;
j = 6;

getAPI("", 0, 6);

let clicked = false;
searchBtn.addEventListener("click", () => {
  clicked = true;
  const card = document.querySelectorAll(".card");
  console.log(card);
  card.forEach((ele) => {
    ele.remove();
  });
  const lor = document.querySelector(".search").value.trim();
  getAPI(lor, 0, 6);
  more.addEventListener("click", () => {
    if (clicked) {
      getAPI(lor, i, j);
    }
  });
});
more.addEventListener("click", () => {
  i = i + 6;
  j = j + 6;
  if (!clicked) {
    getAPI("", i, j);
  }
});
close.addEventListener("click", () => {
  recipe.style.display = "none";
  main.style.display = "flex";
});
