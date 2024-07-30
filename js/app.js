function getData(url) {
  axios
    .get(url)
    .then((res) => res.data.results)
    .then((res) => {
      render(res, document.querySelector("#container"), ul);
      return res;
    })
    .then((data) => {
      search(data);
    })
    .catch();
}

getData("https://rickandmortyapi.com/api/character");

let fav = JSON.parse(localStorage.getItem("fav")) || [];

function render(array, container, episodeContainer) {
  container.innerHTML = "";
  array.forEach((element) => {
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
            document.getElementById("ulContainer").appendChild(ul);
          });
      });
      if (e.target.classList.contains("fa-heart")) {
        e.target.classList.toggle("text-red-600");
        let isFav = e.target.getAttribute("fav");
        isFav = !isFav;
        console.log(isFav)
        console.loge.target.getAttribute('name')
        if (isFav) {
          localStorage.setItem(JSON.stringify(e.target.getAttribute("nema")) , JSON.stringify(e.target.getAttribute("nema")));
        }
      }
    });
  });
}

let searchInput = document.getElementById("searchBox");

search();

function search(data) {
  searchInput.addEventListener("input", (e) => {
    let result = data.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    render(result, document.querySelector("#container"));
  });
}

let ul = document.getElementById("episodeContainer");
