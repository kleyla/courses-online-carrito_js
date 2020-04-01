const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();
function cargarEventListeners() {
  //dispara cuando se presiona agregar carrito
  cursos.addEventListener("click", comprarCursos);

  carrito.addEventListener("click", eliminarCurso);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarCursos(e) {
  e.preventDefault();
  //   console.log(e.target.classList);
  if (e.target.classList.contains("btn-al-carrito")) {
    // console.log("si");
    const curso = e.target.parentElement.parentElement;
    // console.log(curs
    leerDatosCurso(curso);
  }
}
function leerDatosCurso(curso) {
  // console.log(curso);
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id")
  };
  //   console.log(infoCurso);
  insertarCarrito(infoCurso);
}

function insertarCarrito(curso) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
      <img src="${curso.imagen}" width="100px">
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="" class="borrar-curso" data-id="${curso.id}" >X</a>
    </td>

  `;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);
}
function eliminarCurso(e) {
  e.preventDefault();
  //   console.log("eliminado");
  let curso, cursoId;
  if (e.target.classList.contains("borrar-curso")) {
    console.log(e.target.parentElement.parentElement.remove());
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector("a").getAttribute("data-id");
  }
  eliminarCursoLS(cursoId);
}
function vaciarCarrito(e) {
  e.preventDefault();
  //   listaCursos.innerHTML = "";
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }
  vaciarLocalStorage();
  return false;
}
function guardarCursoLocalStorage(curso) {
  //   console.log(curso);
  let cursos = obtenerCursosLocalStorage();
  cursos.push(curso);
  localStorage.setItem("cursos", JSON.stringify(cursos));
  console.log(localStorage.getItem("cursos"));
}
function obtenerCursosLocalStorage() {
  let cursosLS;
  if (localStorage.getItem("cursos") === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem("cursos"));
  }
  return cursosLS;
}
function leerLocalStorage() {
  let cursos = obtenerCursosLocalStorage();
  cursos.forEach(function(curso) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${curso.imagen}" width="100px">
      </td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>
          <a href="" class="borrar-curso" data-id="${curso.id}" >X</a>
      </td>
    `;
    listaCursos.appendChild(row);
  });
}
function eliminarCursoLS(cursoId) {
  let cursos = obtenerCursosLocalStorage();

  cursos.forEach(function(curso, index) {
    if (curso.id === cursoId) {
      cursos.splice(index, 1);
      //   console.log("holi");
    }
  });
  localStorage.setItem("cursos", JSON.stringify(cursos));
}
function vaciarLocalStorage() {
  localStorage.clear();
}
