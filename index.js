const selectSize = document.getElementById("selectSize");
const matrixAContainer = document.getElementById("matrixA");
const matrixBContainer = document.getElementById("matrixB");
const randomAButton = document.getElementById("randomA");
const randomBButton = document.getElementById("randomB");
const clearAButton = document.getElementById("clearA");
const clearBButton = document.getElementById("clearB");

let n = parseInt(selectSize.value);
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

// valores aleatorios
function randomValues(matrixArray, container) {
    // obtengo todos los inputs
    const inputs = container.querySelectorAll("input");
    // por cada input, obtengo su correspondiete indice en el array de matriz
    // y genero un valor aleatorio
    inputs.forEach((input, index) => {
        const i = Math.floor(index / n);
        const j = index % n;
        const val = Math.floor(Math.random() * 21) - 10;
        input.value = val;
        matrixArray[i][j] = val;
    });
}

// limpiar matriz
function clearMatrix(matrixArray, container) {
    // obtengo todos los inputs
    const inputs = container.querySelectorAll("input");
    // a cada input le asigno 0 y a su posicion en el array de matriz
    inputs.forEach((input, index) => {
        input.value = "0";
        const i = Math.floor(index / n);
        const j = index % n;
        matrixArray[i][j] = 0;
    });
}

// manejando tamaño de matriz
selectSize.addEventListener("change", () => {
    n = parseInt(selectSize.value);
    createMatrixInputs(matrixAContainer, matrixA);
    createMatrixInputs(matrixBContainer, matrixB);
});

// eventos para los botones random A y random B
randomAButton.addEventListener("click", () => randomValues(matrixA, matrixAContainer));
randomBButton.addEventListener("click", () => randomValues(matrixB, matrixBContainer));
// eventos para limpiar A y limpiar B
clearAButton.addEventListener("click", () => clearMatrix(matrixA, matrixAContainer));
clearBButton.addEventListener("click", () => clearMatrix(matrixB, matrixBContainer));

// llamo la funcion para inicializar las dos matrices
createMatrixInputs(matrixAContainer, matrixA);
createMatrixInputs(matrixBContainer, matrixB);