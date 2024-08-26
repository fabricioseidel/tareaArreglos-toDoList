const tareaLista = document.querySelector("#listaTareas");
const tareaInput = document.querySelector("#nuevaTarea");
const tareaTotal = document.querySelector("#totalTareas");
const tareaTerminada = document.querySelector("#tareasTerminada");
const botonAgregar = document.querySelector("#botonAgregar");
let contadorDeIdentificadores = 6;
let tareas = [
  { id: 1, nombre: "pensar", chek: false },
  { id: 2, nombre: "leer", chek: false },
  { id: 3, nombre: "escribir", chek: false },
  { id: 4, nombre: "analizar", chek: false },
  { id: 5, nombre: "corregir", chek: false },
  { id: 6, nombre: "entregar", chek: false },
];
function reescribirContador() {
  const tareasCompletadas = tareas.filter((tarea) => tarea.chek).length;
  tareaTotal.textContent = `Total: ${tareas.length}`;
  tareaTerminada.textContent = `
    terminadas: ${tareasCompletadas}`;
}
function renderizar() {
  reescribirContador();
  tareaLista.innerHTML = tareas
    .map(
      (tarea) => `
        <tr id="tarea-${tarea.id}">
          <td>${tarea.id}</td>
          <td style="word-break: break-word">${tarea.nombre}</td>
          <td>
            <input type="checkbox" ${
              tarea.chek ? "checked" : ""
            } class="checkbox-estado" data-id="${
        tarea.id
      }" style="height: 16px; padding-right: 16px;">
          </td>
          <td>
            <button class="btn-borrar" data-id="${tarea.id}">borrar</button>
          </td>
        </tr>
      `
    )
    .join("");

  document.querySelectorAll(".checkbox-estado").forEach((el) => {
    el.addEventListener("click", (e) =>
      tareaCheker(Number(e.target.dataset.id))
    );
  });

  document.querySelectorAll(".btn-borrar").forEach((el) => {
    el.addEventListener("click", (e) => borrar(Number(e.target.dataset.id)));
  });
}

function borrar(id) {
  tareas = tareas.filter((tarea) => tarea.id !== id);
  renderizar();
}

function tareaCheker(id) {
  const tarea = tareas.find((ele) => ele.id === id);
  tarea.chek = !tarea.chek;
  reescribirContador();
}

renderizar();
botonAgregar.addEventListener("click", () => {
  const nuevaTarea = tareaInput.value.trim();
  if (nuevaTarea === "") {
    none;
  } else {
    contadorDeIdentificadores += 1;
    tareas.push({
      id: contadorDeIdentificadores,
      nombre: nuevaTarea,
      chek: false,
    });
    tareaInput.value = "";
    renderizar();
  }
});
