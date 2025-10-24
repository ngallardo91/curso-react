// Variables tipadas
var expenseList = [];
var totalAmount = 0;
// Referencias a los elementos del DOM
var inputGasto = document.getElementById("gasto");
var lista = document.getElementById("lista");
var totalEl = document.getElementById("total");
var btnAgregar = document.getElementById("agregar");
// Función para agregar un gasto
function agregarGasto() {
    var valor = Number(inputGasto.value);
    // Validación con estructuras de control
    if (isNaN(valor) || valor <= 0) {
        alert("Por favor, ingrese un número válido.");
        return;
    }
    expenseList.push(valor);
    totalAmount += valor;
    // Mostrar el gasto en la lista
    var li = document.createElement("li");
    li.textContent = "$".concat(valor);
    lista.appendChild(li);
    // Actualizar el total
    totalEl.textContent = totalAmount.toString();
    // Limpiar el input
    inputGasto.value = "";
}
// Evento de clic
btnAgregar.addEventListener("click", agregarGasto);
