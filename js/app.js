function getData(url) {
  const container = document.querySelector("#container");
  container.innerHTML = "<p>...loading</p>";
  axios
    .get(url)
    .then((res) => res.data.results)
    .then((res) => {
      render(res, container);
      search(res, "searchBox", render, container);
      return res;
    })
    .then((data) => removeAndAdd(data , container))
    .catch((error) => {
      console.error("Error fetching data:", error);
      container.innerHTML = "<p>...loading</p>";
    });
}

getData("https://rickandmortyapi.com/api/character");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

console.log(favorites);

function render(array, container) {
  container.innerHTML = "";
  array.forEach((element) => {
    save(array);
    let div = document.createElement("div");
    div.classList.add(
      "rounded",
      "mb-2",
      "items-center",
      "bg-gray-800",
      "p-2",
      "flex"
    );
    div.innerHTML = `
      <img src="${element.image}" class="flex w-10 h-10 mr-5 rounded-lg">
      <div class="flex-1">
        <div class="flex justify-between items-center">
          <span>${gender(element.gender)}  ${element.name}</span>
        </div>
        <span class="text-sm ${color(element.status)}">${element.status} - ${
      element.species
    }</span>
      </div>
      <i class="fa-regular fa-heart ${heartColor(element.isFav)}"></i>
    `;
    container.appendChild(div);

    div.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-heart")) {
        toggleFavorite(element, e.target);
      } else {
        showDetails(element);
      }
    });
  });
}

function showDetails(element) {
  let container2 = document.querySelector("#info1");
  container2.innerHTML = `
    <div class="flex mb-4">
      <img src="${element.image}" alt="" class="mr-5 rounded-xl"/>
      <div>
        <h2 class="text-xl mb-2">${element.name}</h2>
        <p class="text-sm ${color(element.status)}">${element.status} ${
    element.species
  }</p>
        <p>Last known location: ${element.location.name}</p>
      </div>
    </div>
    <div id="ulContainer">
      <h3 class="text-lg mb-2">List of episodes</h3>
      <ul id="episodeContainer"></ul>
    </div>
  `;

  let episode = element.episode;
  let ul = document.getElementById("episodeContainer");
  ul.innerHTML = "";
  episode.forEach((url) => {
    axios
      .get(url)
      .then(({ data }) => {
        let li = document.createElement("li");
        li.classList.add("flex", "justify-between", "mb-1");
        li.innerHTML = `
          <span>${data.episode} : ${data.name}</span>
          <span class="text-gray-500">${data.air_date}</span>
        `;
        ul.appendChild(li);
      })
      .catch((error) => {
        console.error("Error fetching episode data:", error);
      });
  });
}

function toggleFavorite(element, heartIcon) {
  element.isFav = !element.isFav;
  if (element.isFav) {
    heartIcon.classList.add("text-red-600");
    favorites.push(element);
  } else {
    heartIcon.classList.remove("text-red-600");
    favorites = favorites.filter((item) => item.id !== element.id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function search(data, id, callBack, container) {
  let searchInput = document.getElementById(id);
  searchInput.addEventListener("input", (e) => {
    let result = data.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    callBack(result, container);
  });
}

function favRener() {
  let favList = document.getElementById("hidden");
  document.getElementById("closeFavList").addEventListener("click", () => {
    favList.classList.add("hidden");
  });
  document.getElementById("heart").addEventListener("click", () => {
    favRener2(favorites);
    favList.classList.remove("hidden");
  });
}

function favRener2(data) {
  let favContainer = document.getElementById("favContainer");
  favContainer.innerHTML = "";
  data.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add(
      "rounded",
      "my-2",
      "items-center",
      "bg-gray-800",
      "p-2",
      "flex"
    );
    div.innerHTML = `
      <img src="${item.image}" class="flex w-10 h-10 mr-5 rounded-lg">
      <div class="flex-1">
        <div class="flex justify-between items-center">
          <span>${gender(item.gender)}  ${item.name}</span>
        </div>
        <span class="text-sm ${color(item.status)}">${item.status} - ${
      item.species
    }</span>
      </div>
      <i class="fa-regular fa-heart text-red-600"></i>
    `;
    favContainer.appendChild(div);
  });
}

favRener();

function gender(gender) {
  return gender === "Male" ? "👨" : "👩";
}

function color(status) {
  if (status === "Alive") {
    return "text-green-600";
  } else if (status === "Dead") {
    return "text-red-600";
  } else {
    return "text-orange-600";
  }
}

function heartColor(isFav) {
  return isFav ? "text-red-600" : "text-white";
}

function save(array) {
  array.forEach((element) => {
    favorites.forEach((item) => {
      if (element.id === item.id) {
        element.isFav = item.isFav;
      }
    });
  });
}

function removeAndAdd(data , container) {
  let RAA = document.getElementById("add");
  RAA.addEventListener("click", () => {
    favorites = [];
    console.log(favorites);
    data.forEach((item) => {
      item.isFav = true;
      favorites.push(item);
      favRener2(favorites);
      render(data , container)
    });
  });
}
