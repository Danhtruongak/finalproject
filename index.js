//api key and url target///
const API = "e97a6468df513e576bfd847864d7a675";
const API_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API}&page=1`;
const img_path = "https://image.tmdb.org/t/p/w1280";
const search_path = `https://api.themoviedb.org/3/search/movie?api_key=${API}&query="`;
///////////////////////////////////////

const main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

///used async function to fetch data////
async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();

  showMovies(data.results); ///showMovie accepted raw data
}

////showMovie function collect data//////
function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie; //collect individual target from object movie///

    const movieEl = document.createElement("div"); ///create a div ////
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img src="${img_path + poster_path}" />

        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      `;
    main.appendChild(movieEl);
    //click poster to show///
    const displayLarge = function () {
      movieEl.addEventListener("click", () => {
        const voteEl2 = document.querySelector(".voteEl2");
        voteEl2.classList.remove("hidden");

        //////single zoom display when click////

        const divEl = document.querySelector(".showSingle");
        const img = document.querySelector(".imgSingle");
        const h3 = document.querySelector(".h3");
        const nameTitle = (h3.innerHTML = title);
        img.setAttribute("src", img_path + poster_path);
        return nameTitle;
      });
    };

    displayLarge();
  });
}

//range setup//
const range = document.getElementById("range");
range.addEventListener("input", (e) => {
  const value = +e.target.value;
  const label = e.target.nextElementSibling;
  label.innerHTML = value;
});

const todos = JSON.parse(localStorage.getItem("todos"));

for (let todo of todos) {
  console.log(todo);
}

///form///
const formSubmit = document.querySelector(".selectEl2");
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();

  function update(input) {
    const result = formSubmit.elements.range.value; //access range//
    const h3 = document.querySelector("h3");
    const ul = document.querySelector(".todos");
    const li = document.createElement("li");

    ul.appendChild(li);

    li.innerText = ` ${h3.innerText}  Your vote: ${result} `;
    const eachLi = li;

    eachLi.addEventListener("click", () => {
      eachLi.classList.toggle("complete");
      eachLi.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        eachLi.remove();
      });
    });
    updateLS();
  }
  function updateLS() {
    const todosEl = document.querySelectorAll("li");

    const todos = [];
    todosEl.forEach((todoEl) => {
      todos.push({
        text: todoEl.innerText,
        complete: todoEl.classList.contains("complete"),
      });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  update();

  //hide after submit///
  const voteEl2 = document.querySelector(".voteEl2");
  voteEl2.classList.add("hidden");
  const select_bg = document.querySelector(".select_bg");
  select_bg.classList.remove("hidden");
});

const formSelect = document.querySelector("#selectEl");

formSelect.addEventListener("submit", (e) => {
  e.preventDefault();
  const select_bg = document.querySelector(".select_bg");

  select_bg.classList.add("hidden");
});

getMovies(API_url);

function getClassByRate(vote, input) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchVideo = search.value;
  if (searchVideo && searchVideo !== "") {
    getMovies(search_path + searchVideo);
    search.value = "";
  } else {
    window.location.reload();
  }
});

//validation signin///
const btn = document.querySelector(".btn");
const inputEl = document.querySelectorAll("input");
const nameEl = document.querySelector("#name");

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const formEl = document.querySelector(".sign-in-form");

let valid = false;

const error = (input, message) => {
  const inputWrapper = input.parentElement;
  inputWrapper.className = "form-input-wrapper error";
  inputWrapper.querySelector(".message").textContent = message;
};

const success = (input) => {
  const inputWrapper = input.parentElement;
  inputWrapper.className = "form-input-wrapper success";
};

const checkName = (input, min) => {
  if (input.value.trim().length > min) {
    success(input);

    return true;
  } else {
    error(input, "At least 3 characters");
    return false;
  }
};

const checkEmail = (input) => {
  const reg = /([a-zA-Z0-9\.\_\-]+@[a-zA-Z]+.[a-zA-Z]+)/;
  if (reg.test(input.value.trim())) {
    success(input);
    return true;
  } else {
    error(input, "Email is not valid");
    return false;
  }
};

const checkPassWordLength = (input, min, max) => {
  if (input.value.length < min) {
    error(input, `${input.id} must be at least ${min} characters`);
    return false;
  } else if (input.value.length > max) {
    error(input, `${input.id} must be less then ${max} characters`);
    return false;
  } else {
    success(input);
    return true;
  }
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    checkName(nameEl, 3) &&
    checkEmail(email) &&
    checkPassWordLength(password, 2, 15)
  ) {
    valid = true;
    if (valid == true) {
      const container = document.querySelector(".container");
      container.classList.add("hidden");

      const username = formEl.elements.name.value;
      const p = document.querySelector("#p");
      p.innerText = ` Hi, ${username}`;
    }
  } else {
    e.preventDefault();
  }
});

//display moving slice///
const imgs = document.querySelector("#imgs");
const imgEl = document.querySelectorAll(".sliceImg");

let index = 0;

let interval = setInterval(run, 3000);

function run() {
  index++;
  changeImage();
}

function changeImage() {
  if (index > imgEl.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = imgEl.length - 1;
  }
  imgs.style.transform = `translateX(${-index * 800}px)`;
}
