function getData(url) {
  axios
    .get(url)
    .then((res) => res.data.results)
    .then((res) => {
      render(res, document.querySelector("#container"), ul);
      return res;
    })
    .then((data) => {
      search(data, "searchBox", render, document.querySelector("#container"));
      return data;
    })
    .then((data) => localStorage(data))
    .then((data) => {
      if (data != undefined) {
        render(data, document.querySelector("#container"), ul);
      }
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
}

let ul = document.getElementById("episodeContainer");

getData("https://rickandmortyapi.com/api/character");

let favorites = JSON.parse(localStorage.getItem("fav")) || [];

function render(array, container, episodeContainer) {
  container.innerHTML = "";
  array.forEach((element) => {
    if (element.isFav) {
      document.getElementById("fa-heart").classList.add("text-red-600");
    }
    element.isFav = false;
    let div = document.createElement("div");
    div.classList.add(
      "rounded",
      "mb-2",
      "items-center",
      "bg-gray-800",
      "p-2",
      "flex"
    );
    let genderIcon = element.gender == "Male" ? "👨" : "👩";
    let statusColor =
      element.status == "Dead"
        ? "text-red-400"
        : element.status == "Alive"
        ? "text-green-400"
        : "text-orange-400";
    div.innerHTML = `
      <img src="${element.image}" class="flex w-10 h-10 mr-5 rounded-lg">
      <div class="flex-1">
        <div class="flex justify-between items-center">
          <span>${genderIcon} ${element.name}</span>                      
        </div>
        <span class="text-sm ${statusColor}">${element.status}-${element.species}</span>
      </div>
      <i class="fa-regular fa-heart" fav="false" name="${element.name}"></i>
    `;
    element.color = statusColor;
    container.appendChild(div);
    if (array != favorites) {
      div.addEventListener("click", (e) => {
        if (e.target.classList.contains("fa-heart")) {
          toggleFavorite(element, e.target);
        } else {
          displayCharacterInfo(element, episodeContainer);
        }
      });
    }
  });
}

function toggleFavorite(element, icon) {
  element.isFav = !element.isFav;
  if (element.isFav) {
    icon.classList.add("text-red-600");
    favorites.push(element);
  } else {
    icon.classList.remove("text-red-600");
    favorites = favorites.filter((fav) => fav.name !== element.name);
  }
}

function displayCharacterInfo(element, episodeContainer) {
  let container2 = document.querySelector("#info1");
  container2.innerHTML = `
    <div class="flex mb-4" id="info1">
      <img
        src=${element.image}
        alt=""
        class="mr-5 rounded-xl"
      />
      <div>
        <h2 class="text-xl mb-2">${element.name}</h2>
        <p class="text-sm ${element.color}">${element.status} ${element.species}</p>
        <p>Last known location: ${element.location.name}</p>
        <p class="text-sm">
          This character is already in your favourites.
        </p>
      </div>
    </div>
    <div id="ulContainer">
      <h3 class="text-lg mb-2">List of Episodes</h3>
    </div>`;

  episodeContainer.innerHTML = "";

  element.episode.forEach((url) => {
    axios
      .get(url)
      .then(({ data }) => {
        let li = document.createElement("li");
        li.classList.add("flex", "justify-between", "mb-1");
        li.innerHTML = `
          <span>${data.episode} : ${data.name}</span>
          <span class="text-gray-500">${data.air_date}</span>`;
        episodeContainer.appendChild(li);
        document.getElementById("ulContainer").appendChild(episodeContainer);
      })
      .catch((err) => {
        console.error("Error fetching episode data:", err);
      });
  });
}

// Debounce function to optimize search
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function search(data, id, callBack, container) {
  let searchInput = document.getElementById(id);
  searchInput.addEventListener(
    "input",
    debounce((e) => {
      let result = data.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      callBack(result, container);
    }, 300)
  );
}

function favRener() {
  let favList = document.getElementById("hidden");
  document.getElementById("closeFavList").addEventListener("click", () => {
    favList.classList.add("hidden");
  });
  document.getElementById("heart").addEventListener("click", () => {
    let favContainer = document.getElementById("favContainer");
    favContainer.innerHTML = "";
    favList.classList.remove("hidden");
    render(favorites, favContainer, ul);
    search(favorites, "searchBox2", favRener2, favContainer);
  });
}

favRener();

function favRener2(data) {
  let favContainer = document.getElementById("favContainer");
  favContainer.innerHTML = "";
  render(data, favContainer, ul);
}

function localStorage(data) {
  if (localStorage.getItem("fav") != undefined) {
    data.forEach((value) => {
      favorites.forEach((item) => {
        if (item.isFav) {
          value.isFav = item.isFav;
        }
      });
    });
    return data;
  } else {
    return undefined;
  }
}
