const sizeSelect = document.getElementById("sizeSelect");
const matrixAContainer = document.getElementById("matrixA");
const matrixBContainer = document.getElementById("matrixB");

let n = parseInt(sizeSelect.value);
let matrixA = [];
let matrixB = [];

// inicializacion de las matrices con sus inputs (por default en 0)
function createMatrixInputs(container, matrixArray) {
    container.innerHTML = "";
    // utilizando funcion repeat en el css para crear un grid n x n
    container.style.gridTemplateColumns = `repeat(${n}, auto)`;
    matrixArray.length = 0;
    // ciclo for para recorrer el array de la matrix n x n
    for (let i = 0; i < n; i++) {
        matrixArray[i] = [];
        for (let j = 0; j < n; j++) {
            // por cada elemento de la matriz creo un input de tipo number inicializado en 0
            // y le agrego un event listener para que asigne ese input al campo correspondiente
            // en array de la matriz 
            const input = document.createElement("input");
            input.type = "number";
            input.value = "0";
            input.addEventListener("input", () => {
                matrixArray[i][j] = parseFloat(input.value) || 0;
            });
            matrixArray[i][j] = 0;
            // agrego este hijo (el input) a su contenedor, en este caso "container"
            container.appendChild(input);
        }
    }
}

// manejando tamaño de matriz
sizeSelect.addEventListener("change", () => {
    n = parseInt(sizeSelect.value);
    createMatrixInputs(matrixAContainer, matrixA);
    createMatrixInputs(matrixBContainer, matrixB);
});

// llamo la funcion para inicializar las dos matrices
createMatrixInputs(matrixAContainer, matrixA);
createMatrixInputs(matrixBContainer, matrixB);