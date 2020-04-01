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
}
function eliminarCurso(e) {
  e.preventDefault();
  //   console.log("eliminado");
  if (e.target.classList.contains("borrar-curso")) {
    console.log(e.target.parentElement.parentElement.remove());
  }
}
function vaciarCarrito(e) {
  e.preventDefault();
  //   listaCursos.innerHTML = "";
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }
}
