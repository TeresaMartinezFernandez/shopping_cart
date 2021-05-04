//variables

const shopCart = document.querySelector("#carrito");
const containerCart = document.querySelector("tbody");
const emptyCartBtn = document.querySelector("#vaciar-carrito");
const courseList = document.querySelector("#lista-cursos");
let productsCart = [];

loadEventListeners();
function loadEventListeners() {
  //añadimos un curso al carrito
  courseList.addEventListener("click", addNewCourse);

  //eliminar cursos del carrito

  shopCart.addEventListener("click", removeCourse);

  //muestra los cursos del localstorage

  document.addEventListener("DOMContentLoaded", () => {
    productsCart = JSON.parse(localStorage.getItem("shopcart")) || [];

    showCart();
  });

  //vaciar todo el carrito de compra

  emptyCartBtn.addEventListener("click", () => {
    productsCart = []; // reseteamos el array
    cleanCart(); //eliminamos todo el html
  });
}

//Funciones

function addNewCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const selectedCourse = e.target.parentElement.parentElement;
    readDataCourse(selectedCourse);
  }
}

//eliminamos curso del carrito

function removeCourse(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const courseId = e.target.getAttribute("data-id");

    //eliminar del array
    productsCart = productsCart.filter((curso) => curso.id !== courseId);
    showCart();
  }
}

//leemos el contenido del html al que dimos click y extraemos la info del curso
function readDataCourse(curso) {
  //creamos un objeto donde se van añadiendo el contenido del curso actual
  const infoCourse = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisa si un elemento ya existe en el carrito

  const productExist = productsCart.some((curso) => curso.id === infoCourse.id);
  if (productExist) {
    const addedCourses = productsCart.map((curso) => {
      if (curso.id === infoCourse.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    productsCart = [...addedCourses];
  } else {
    //añadimos articulos al carrito

    productsCart = [...productsCart, infoCourse];
  }

  console.log(productsCart);
  showCart();
}

//mostrar carrito en html

function showCart() {
  //limpiar html
  cleanCart();

  //recorre el carrito y genera el html
  productsCart.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td> 
          <img src="${imagen}" width="100"> 
      </td>
      <td> ${titulo} </td>
      <td> ${precio} </td>
      <td> ${cantidad} </td>
      <td> 
          <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>`;

    // agrega html al tbody
    containerCart.appendChild(row);
  });

  //add courses to local storage
  syncUpStorage();
}

function syncUpStorage() {
  localStorage.setItem("shopcart", JSON.stringify(productsCart));
}

//eliminar los cursos del tbody

function cleanCart() {
  //forma lenta de limpiar html
  // containerCart.innerHTML = "";

  while (containerCart.firstChild) {
    containerCart.removeChild(containerCart.firstChild);
  }
}
