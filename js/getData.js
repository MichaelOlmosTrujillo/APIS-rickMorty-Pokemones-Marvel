// Obtener la API por medio de promesas en javaScript
/*
fetch() esto es nuevo en java script
permite controlar errores más fácilmente que cualquier otro método
*trabaja por medio de protocolo http o https
* se basa en promesas de javascript
* se basa en un sistema peticiones y respuestas
*  
*/

//URL de la API

const API = "https://rickandmortyapi.com/api/character";



// Obtener información de la API

const getData = (api) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            llenarDatos(json), pagination(json.info);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};

// Llenar datos en nuestra página

const llenarDatos = (dataJson) => {
    let html = "";
    dataJson.results.forEach((personaje) => {
        html += '<div class = "col d-flex justify-content-center">';
        html += '<div class ="card" style = "width: 10rem;">';
        html += `<img src= "${personaje.image}" class = "card-img-top alt = "..."`;
        html += '<div class = "card-body">';
        html += `<h5 class = "card-title">${personaje.name} </h5>`;
        html += `<p class = "card-text">Status: ${personaje.status}  </p>`;
        html += `<p class = "card-text">Especie: ${personaje.species}  </p>`;
        html += `<p class = "card-text">Género: ${personaje.gender}  </p>`;
        html += "</div>";
        html += "</div>";
        html += "</div>";
    });
    //Imprimir datos en html
    document.getElementById("datosPersonajes").innerHTML = html;
};

//Paginación

const pagination = (data) => {
    let prevDisable = "";
    let nextDisable = "";

    let html = "";
    html += `<li class="page-item  ${
    data.prev == null ? (prevDisable = "disabled") : (prevDisable = "")
  }"><a class="page-link" onclick = "getData('${
    data.prev
  }')">Previous</a></li>`;
    html += `<li class="page-item ${
    data.next == null ? (nextDisable = "disabled") : (nextDisable = "")
  }"><a class="page-link" onclick = "getData('${data.next}')">Next</a></li>`;
    document.getElementById("paginacion").innerHTML = html;
};

//Activo o invoco la función
getData(API);