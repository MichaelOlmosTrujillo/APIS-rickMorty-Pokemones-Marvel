//Url de la api del pokemon ditto
const API = "https://pokeapi.co/api/v2/pokemon/ditto";
const apisPokemones = "https://pokeapi.co/api/v2/pokemon/";
//"contador"
let contador = 0;


// Obtener la api de cada pokemon

const obtenerPokemones = (apis) => {
    return fetch(apis)
        .then((response) => response.json())
        .then((json) => {
            json.results.forEach((pokemonJson) => {
                    getData(pokemonJson.url);
                }),
                pagination(json);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};

// Obtener información de una sola API

const getData = (api) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            llenarDatos(json);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
};

//Llenar datos de un solo pokemon

const llenarDatos = (datosJson) => {
    //El contador me garantiza el funcionamiento de la paginación
    if (contador == 20) {
        document.getElementById("datosPersonajes").innerHTML = "";
        contador = 0;
    }
    contador += 1;
    console.log(contador);
    localStorage.setItem('contador', contador);
    let html = "";
    html += '<div class = "col d-flex justify-content-center">';
    html += '<div class ="card" style = "width: 10rem;">';
    html += `<img src= "${datosJson.sprites.front_default}" class = "card-img-top alt = "..."`;
    html += '<div class = "card-body">';
    html += `<h5 class = "card-title">${datosJson.name} </h5>`;
    html += "</div>";
    html += "</div>";
    html += "</div>";

    //Imprimir datos en html
    document.getElementById("datosPersonajes").innerHTML += html;
};
//Paginación
const pagination = (data) => {
    let prevDisable = "";
    let nextDisable = "";
    let html = "";
    html += `<li class="page-item  ${
    data.previous == null ? (prevDisable = "disabled") : (prevDisable = "")
  }"><a class="page-link" onclick = "obtenerPokemones('${
    data.previous
  }')">Previous</a></li>`;
    html += `<li class="page-item ${
    data.next == null ? (nextDisable = "disabled") : (nextDisable = "")
  }"><a class="page-link" onclick = "obtenerPokemones('${data.next}')">Next</a></li>`;
    document.getElementById("paginacion").innerHTML = html;
};

obtenerPokemones(apisPokemones);