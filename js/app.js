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
    })
    .catch();
}

let ul = document.getElementById("episodeContainer");

getData("https://rickandmortyapi.com/api/character");

let favorites = [];

let f = false;

function render(array, container, episodeContainer) {
  container.innerHTML = "";
  array.forEach((element) => {
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
    if (element.status == "Dead") {
      if (element.gender == "Male") {
        div.innerHTML = `
        <img src = "${element.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
        <div class="flex-1">
          <div class="flex justify-between items-center">
            <span>👨  ${element.name}</span>                      
          </div>
          <span class="text-sm  text-red-400">${element.status}-${element.species}</span>
        </div>
        <i class="fa-regular fa-heart" fav='false' name=${element.name}></i>
      `;
      } else {
        div.innerHTML = `
        <img src = "${element.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
        <div class="flex-1">
          <div class="flex justify-between items-center">
            <span>👩  ${element.name}</span>                      
          </div>
          <span class="text-sm  text-red-400">${element.status}-${element.species}</span>
        </div>
        <i class="fa-regular fa-heart" fav='false' name=${element.name}></i>
      `;
      }
      element.color = "text-red-400";
    } else if (element.status == "Alive") {
      if (element.gender == "Male") {
        div.innerHTML = `
        <img src = "${element.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
        <div class="flex-1">
          <div class="flex justify-between items-center">
            <span>👨  ${element.name}</span>                      
          </div>
          <span class="text-sm  text-green-400">${element.status}-${element.species}</span>
        </div>
        <i class="fa-regular fa-heart" fav='false' name='${element.name}'></i>
      `;
      } else {
        div.innerHTML = `
        <img src = "${element.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
        <div class="flex-1">
          <div class="flex justify-between items-center">
            <span>👩  ${element.name}</span>                      
          </div>
          <span class="text-sm  text-green-400">${element.status}-${element.species}</span>
        </div>
        <i class="fa-regular fa-heart" fav='false' name=${element.name}></i>
      `;
      }
      element.color = "text-green-400";
    } else {
      if (element.gender == "Male") {
        div.innerHTML = `
        <img src = "${element.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
        <div class="flex-1">
          <div class="flex justify-between items-center">
            <span>👨  ${element.name}</span>                      
          </div>
          <span class="text-sm  text-orange-400">${element.status}-${element.species}</span>
        </div>
        <i class="fa-regular fa-heart" fav='false' name=${element.name}></i>
      `;
      } else {
        div.innerHTML = `
        <img src = "${element.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
        <div class="flex-1">
          <div class="flex justify-between items-center">
            <span>👩  ${element.name}</span>                      
          </div>
          <span class="text-sm  text-orange-400">${element.status}-${element.species}</span>
        </div>
        <i class="fa-regular fa-heart" fav='false' name=${element.name}></i>
      `;
      }
      element.color = "text-orange-400";
    }
    container.appendChild(div);
    let container2 = document.querySelector("#info1");
    div.addEventListener("click", (e) => {
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
                this character already is in your favourites
              </p>
            </div>
          </div>
          <div id='ulContainer'>
            <h3 class="text-lg mb-2">List of Episodes</h3>
          </div>`;
      let episode = element.episode;
      episodeContainer.innerHTML = "";
      episode.forEach((url) => {
        axios
          .get(url)
          .then(({ data }) => data)
          .then((episodes) => {
            let li = document.createElement("li");
            li.classList.add("flex", "justify-between", "mb-1");
            li.innerHTML = `
              <span>${episodes.episode} : ${episodes.name}</span>
              <span class="text-gray-500">${episodes.air_date}</span>`;
            episodeContainer.appendChild(li);
            document
              .getElementById("ulContainer")
              .appendChild(episodeContainer);
          });
      });
      if (e.target.classList.contains("fa-heart")) {
        element.isFav = !element.isFav;
        console.log(element.isFav)
        if (element.isFav) {
          e.target.classList.add("text-red-600");
        } else {
          e.target.classList.remove("text-red-600");
        }
      }
    });
  });
  favorites = array.filter((item) => {
    console.log(item.isFav)
    if(item.isFav) {
      return item
    }
    }
)
}

function search(data, id, callBack, container) {
  let searchInput = document.getElementById(id);
  searchInput.addEventListener("input", (e) => {
    let result = data.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    if (callBack != favRener2) {
      callBack(result, container);
    } else {
      console.log(result);
      callBack(result);
    }
  });
}

function favRener() {
  let favList = document.getElementById("hidden");
  document.getElementById("closeFavList").addEventListener("click", () => {
    console.log("click");
    favList.classList.add("hidden");
  });
  document.getElementById("heart").addEventListener("click", (e) => {
    let favContainer = document.getElementById("favContainer");
    favContainer.innerHTML = "";
    favList.classList.remove("hidden");
    favorites.forEach((item) => {
      let div = document.createElement("div");
      div.classList.add(
        "rounded",
        "my-2",
        "items-center",
        "bg-gray-800",
        "p-2",
        "flex"
      );
      if (item.isFav) {
        if (item.status == "Dead") {
          if (item.gender == "Male") {
            div.innerHTML = `
            <img src = "${item.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
            <div class="flex-1">
              <div class="flex justify-between items-center">
                <span>👨  ${item.name}</span>                      
              </div>
              <span class="text-sm  text-red-400">${item.status}-${item.species}</span>
            </div>
            <i class="fa-regular fa-heart text-red-600" fav='false' name=${item.name}></i>
          `;
          } else {
            div.innerHTML = `
            <img src = "${item.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
            <div class="flex-1">
              <div class="flex justify-between items-center">
                <span>👩  ${item.name}</span>                      
              </div>
              <span class="text-sm  text-red-400">${item.status}-${item.species}</span>
            </div>
            <i class="fa-regular fa-heart text-red-600" fav='false' name=${item.name}></i>
          `;
          }
          item.color = "text-red-400";
        } else if (item.status == "Alive") {
          if (item.gender == "Male") {
            div.innerHTML = `
            <img src = "${item.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
            <div class="flex-1">
              <div class="flex justify-between items-center">
                <span>👨  ${item.name}</span>                      
              </div>
              <span class="text-sm  text-green-400">${item.status}-${item.species}</span>
            </div>
            <i class="fa-regular fa-heart text-red-600" fav='false' name='${item.name}'></i>
          `;
          } else {
            div.innerHTML = `
            <img src = "${item.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
            <div class="flex-1">
              <div class="flex justify-between items-center">
                <span>👩  ${item.name}</span>                      
              </div>
              <span class="text-sm  text-green-400">${item.status}-${item.species}</span>
            </div>
            <i class="fa-regular fa-heart" fav='false' name=${item.name}></i>
          `;
          }
          item.color = "text-green-400";
        } else {
          if (item.gender == "Male") {
            div.innerHTML = `
            <img src = "${item.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
            <div class="flex-1">
              <div class="flex justify-between items-center">
                <span>👨  ${item.name}</span>                      
              </div>
              <span class="text-sm  text-orange-400">${item.status}-${item.species}</span>
            </div>
            <i class="fa-regular fa-heart" fav='false' name=${item.name}></i>
          `;
          } else {
            div.innerHTML = `
            <img src = "${item.image}" class = 'flex w-10 h-10 mr-5 rounded-lg'>
            <div class="flex-1">
              <div class="flex justify-between items-center">
                <span>👩  ${item.name}</span>                      
              </div>
              <span class="text-sm  text-orange-400">${item.status}-${item.species}</span>
            </div>
            <i class="fa-regular fa-heart" fav='false' name=${item.name}></i>
          `;
          }
          item.color = "text-orange-400";
        }
        console.log(favorites)
        favContainer.appendChild(div);
      }
    });
    console.log(favorites)
    search(favorites, "searchBox2", favRener2, favContainer);
  });
}

favRener();

function favRener2(data) {}
