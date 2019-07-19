const MOVIES_DOM = {
    movie_name: document.getElementById("inputMovieName"),
    movie_year: document.getElementById("inputYear"),
    movie_category: document.getElementById("inputCategory"),
    movie_time: document.getElementById("timeRange"),
    movie_actors: document.getElementById("inputActors"),
    movie_image: document.getElementById("inputMovieImage"),
    movies_data: document.getElementById("ulCard")
}


let arrayOfData;


function search(searchBy, value, data) {
    const result = [];
    if (!Array.isArray(data) || !searchBy || !value) return data;
    for (let index = 0; index < data.length; index++) {
        if (data[index][searchBy].toLowerCase().includes(value.toLowerCase())) {
            result.push(data[index]);
        }
    }
    return result;
}

document.querySelector("#searchText").addEventListener("keyup", searchAction)

function searchAction(e) {
    draw(search("movie_name", e.target.value, arrayOfData));
}



function draw(arrayOfData) {
    clearCard()
    for (let index = 0; index < arrayOfData.length; index++) {
        drawLi(arrayOfData[index]);
    }
}


function clearCard() {
    MOVIES_DOM.movies_data.innerHTML = "";
}


function drawLi(movie) {
    const { movies_data } = MOVIES_DOM;
    const movieUL = createMovie(movie);
    if (!movieUL) return;
    movies_data.append(movieUL);
}


function deleteMovie(id) {
    const index = findIndex(arrayOfData, id);
    if (id === undefined) return;
    arrayOfData.splice(index, 1);
    saveToLocalStorage("moviesData", arrayOfData);
    draw(arrayOfData);
}


function findIndex(data, id) {
    for (let index = 0; index < data.length; index++) {
        if (data[index].movie_name === id) {
            return index;
        }
    }
}


function createMovie(movie) {

    const { movie_image, movie_name, movie_year, movie_category, movie_time, movie_actors } = movie;

    if (!movie_image || !movie_name || !movie_year || !movie_category || !movie_time || !movie_actors) return;

    const divElement = document.createElement("div");
    const ul = document.createElement("ul");

    divElement.appendChild(ul);
    divElement.className = "col-lg-2 mb-4"
    divElement.style = "font-size: 0.8em";

    ul.className = "card list-group list-group-flush";
    ul.id = movie_name;

    ulCard.className = "row mt-5";

    // if(car.selected){

    //     tr.classList.add("selected")
    // }

    const deleteButton = document.createElement("Button")
    deleteButton.innerText = "Delete";
    deleteButton.className = "btn btn-danger button-no-paddind";
    deleteButton.addEventListener("click", deleteCarHandler);


    const editButton = document.createElement("Button");
    editButton.innerText = "Edit";
    editButton.className = "btn btn-warning button-no-paddind";
    editButton.addEventListener("click", editMovie);


    const image = document.createElement("img");
    image.src = movie.movie_image;
    image.alt = "picture"
    image.className = "mycss card-img-top";


    const li_movie_image = document.createElement("li");
    li_movie_image.append(image);
    li_movie_image.className = "list-group-item cards-padding";

    const li_movie_name = document.createElement("li");
    li_movie_name.innerText = movie_name;
    li_movie_name.className = "list-group-item font-weight-bold";
    li_movie_name.style = "font-size:1.2em cards-padding";

    const li_movie_year = document.createElement("li");
    li_movie_year.innerText = "Release date: " + movie_year;
    li_movie_year.className = "list-group-item cards-padding";

    const li_movie_category = document.createElement("li");
    li_movie_category.innerText = "Category: " + movie_category;
    li_movie_category.className = "list-group-item cards-padding";

    const li_movie_time = document.createElement("li");
    li_movie_time.innerText = "Time: " + movie_time + "min";
    li_movie_time.className = "list-group-item cards-padding";

    const li_movie_actors = document.createElement("li");
    li_movie_actors.innerText = "Cast: " + movie_actors;
    li_movie_actors.className = "list-group-item cards-padding";

    const li_movie_buttons = document.createElement("li");
    li_movie_buttons.className = "list-group-item cards-padding";
    li_movie_buttons.append(deleteButton, editButton);


    ul.append(li_movie_image, li_movie_name, li_movie_year, li_movie_category, li_movie_time, li_movie_actors, li_movie_buttons);

    return divElement;
}


function editMovie() {

    const movieIndex = findIndex(arrayOfData, this.parentElement.parentElement.id);

    currentMovie = arrayOfData[movieIndex];

    const { movie_image, movie_name, movie_year, movie_category, movie_time, movie_actors } = currentMovie;

    MOVIES_DOM.movie_image.value = movie_image;
    MOVIES_DOM.movie_name.value = movie_name;
    MOVIES_DOM.movie_year.value = movie_year;
    MOVIES_DOM.movie_category.value = movie_category;
    MOVIES_DOM.movie_time.value = movie_time;
    MOVIES_DOM.movie_actors.value = movie_actors;
}


function deleteCarHandler() {
    deleteMovie(this.parentElement.parentElement.id);
}


function validateMovieName(name) {
    return findIndex(arrayOfData, name);
}


document.querySelector("#sortButton").addEventListener("click", sortByYear);


function sortByYear() {
    arrayOfData.sort(function (a, b) { return a.movie_year - b.movie_year; });
    draw(arrayOfData);
}


document.querySelector("#saveButton").addEventListener("click", saveMovie);


function saveMovie() {
    const { movie_name, movie_year, movie_category, movie_time, movie_actors, movie_image } = MOVIES_DOM;

    const result = validateMovieName(movie_name.value);
    if (result !== undefined) {
        alert("Movie Exist")
        return;
    }

    arrayOfData.push(new Movie(movie_image.value, movie_name.value, movie_year.value, movie_category.value, movie_time.value, movie_actors.value))


    saveToLocalStorage("moviesData", arrayOfData);
    draw(arrayOfData);
}


function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}



function Movie(_image, _name, _year, _category, _time, _actors) {
    this.movie_image = _image;
    this.movie_name = _name
    this.movie_year = _year
    this.movie_category = _category;
    this.movie_time = _time;
    this.movie_actors = _actors;

    this.selected = false;
}


function init() {
    arrayOfData = JSON.parse(localStorage.getItem("moviesData")) || [];
    draw(arrayOfData);
}
init();


