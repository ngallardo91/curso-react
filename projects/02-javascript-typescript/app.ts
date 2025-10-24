// Variables tipadas
let expenseList: number[] = [];
let totalAmount: number = 0;

// Referencias a los elementos del DOM
const inputGasto = document.getElementById("gasto") as HTMLInputElement;
const lista = document.getElementById("lista") as HTMLUListElement;
const totalEl = document.getElementById("total") as HTMLSpanElement;
const btnAgregar = document.getElementById("agregar") as HTMLButtonElement;

// Función para agregar un gasto
function agregarGasto(): void {
  const valor = Number(inputGasto.value);

  // Validación con estructuras de control
  if (isNaN(valor) || valor <= 0) {
    alert("Por favor, ingrese un número válido.");
    return;
  }

  expenseList.push(valor);
  totalAmount += valor;

  // Mostrar el gasto en la lista
  const li = document.createElement("li");
  li.textContent = `$${valor}`;
  lista.appendChild(li);

  // Actualizar el total
  totalEl.textContent = totalAmount.toString();

  // Limpiar el input
  inputGasto.value = "";
}

// Evento de clic
btnAgregar.addEventListener("click", agregarGasto);
