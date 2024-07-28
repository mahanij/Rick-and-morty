function getData() {
  axios
    .get("https://rickandmortyapi.com/api/character")
    .then((res) => res.data.results)
    .then((res) => {
      console.log(res);
      render(res, document.querySelector("#container"));
      return res;
    })
    .then((data) => search(data))
    .catch();
}

getData();

function render(array, container) {
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
        <i class="fa-regular fa-heart"></i>
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
        <i class="fa-regular fa-heart"></i>
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
        <i class="fa-regular fa-heart"></i>
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
        <i class="fa-regular fa-heart"></i>
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
        <i class="fa-regular fa-heart"></i>
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
        <i class="fa-regular fa-heart"></i>
      `;
      }
      element.color = "text-orange-400";
    }
    console.log(element.color);
    container.appendChild(div);
    let container2 = document.querySelector("#info1");
    console.log(container2);

    div.addEventListener("click", () => {
      container2.innerHTML = `
    <div class="flex mb-4" id="info1">
            <img
              src=${element.image}
              alt=""
              class="mr-5 rounded-xl"
            />
            <div>
              <h2 class="text-xl mb-2">Rick Sanchez</h2>
              <p class="text-sm ${element.color}">${element.status} ${element.species}</p>
              <p>Last known location: ${element.location.name}</p>
              <p class="text-sm">
                this character already is in your favourites
              </p>
            </div>
          </div>
          <div>
            <h3 class="text-lg mb-2">List of Episodes</h3>
            <ul>
              <li class="flex justify-between mb-1">
                <span>S01E01 : Pilot</span>
                <span class="text-gray-500">December 2, 2013</span>
              </li>
              <li class="flex justify-between mb-1">
                <span>S01E02 : Lawnmower Dog</span>
                <span class="text-gray-500">December 9, 2013</span>
              </li>
              <li class="flex justify-between mb-1">
                <span>S01E03 : Anatomy Park</span>
                <span class="text-gray-500">December 16, 2013</span>
              </li>
              <li class="flex justify-between mb-1">
                <span>S01E04 : M. Night Shaym-Aliens!</span>
                <span class="text-gray-500">January 13, 2014</span>
              </li>
              <li class="flex justify-between mb-1">
                <span>S01E05 : Meeseeks and Destroy</span>
                <span class="text-gray-500">January 20, 2014</span>
              </li>
              <li class="flex justify-between mb-1">
                <span>S01E06 : Rick Potion #9</span>
                <span class="text-gray-500">January 27, 2014</span>
              </li>
            </ul>
          </div>`;
    });
  });
}

let searchInput = document.getElementById("searchBox");

search();

function search(data) {
  searchInput.addEventListener("input", (e) => {
    let result = data.filter((item) => {
      console.log(
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    render(result, document.querySelector("#container"));
  });
}
