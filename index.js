const selectSize = document.getElementById("selectSize");
const matrixAContainer = document.getElementById("matrixA");
const matrixBContainer = document.getElementById("matrixB");
const randomAButton = document.getElementById("randomA");
const randomBButton = document.getElementById("randomB");
const clearAButton = document.getElementById("clearA");
const clearBButton = document.getElementById("clearB");
//retorna una lista con todos los elementos html que coincidan con el selector
const operations = document.querySelectorAll(".operations button");
const resultText = document.querySelector(".footer h2") 
const resultContainer = document.getElementById("result");
const messageDiv = document.getElementById("message");

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

// a continuacion tenemos las funciones de las operaciones matematicas
// las cuales retornan siempre una matriz

// suma de matrices
function addMatrices(A, B) {
    const C = [];
    for (let i = 0; i < n; i++) {
        C[i] = [];
        for (let j = 0; j < n; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }
    return C;
}

// resta de matrices
function subMatrices(A, B) {
    const C = [];
    for (let i = 0; i < n; i++) {
        C[i] = [];
        for (let j = 0; j < n; j++) {
            C[i][j] = A[i][j] - B[i][j];
        }
    }
    return C;
}

// multiplicacion de matrices
function multiplyMatrices(A, B) {
    const C = [];
    for (let i = 0; i < n; i++) {
        C[i] = [];
        for (let j = 0; j < n; j++) {
            let sum = 0;
            for (let k = 0; k < n; k++) {
                sum += A[i][k] * B[k][j];
            }
            C[i][j] = sum;
        }
    }
    return C;
}

// multiplicar por escalar
function scalarMultiply(A, k) {
    const C = [];
    for (let i = 0; i < A.length; i++) {
        C[i] = [];
        for (let j = 0; j < A.length; j++) {
            C[i][j] = A[i][j] * k;
        }
    }
    return C;
}

// leo los inputs de la matriz para colocarlos en su array 
function readMatrix(matrixArray, container) {
    const inputs = container.querySelectorAll("input");
    inputs.forEach((input, index) => {
        const i = Math.floor(index / n);
        const j = index % n;
        matrixArray[i][j] = parseFloat(input.value) || 0;
    });
}

// muestra la matriz en el contenedor de los resultados
function displayMatrix(matrix) {
    resultContainer.innerHTML = "";
    resultContainer.style.gridTemplateColumns = `repeat(${matrix.length}, auto)`;
    // por cada fila
    matrix.forEach(row => {
        // por cada elemento (columna), crea un input no editable con su valor del
        // array de matrices
        row.forEach(val => {
            const cell = document.createElement("input");
            cell.type = "number";
            cell.value = val;
            cell.disabled = true;
            resultContainer.appendChild(cell);
        });
    });
}

// manejar los eventos para cada boton del contenedor "operations"
operations.forEach(button => {
    button.addEventListener("click", () => {
        // vacio el resultado antes de manejar la operacion, en caso de que
        // se haya hecho alguna antes
        resultContainer.innerHTML = "";
        // aprovecho el atributo personalizado "data-op" que representa
        // la operacion que realiza cada boton para hacer un switch
        // con el valor op que seria la operacion como tal
        const op = button.dataset.op;
        // coloco los input en el array correspondiente a cada matriz
        readMatrix(matrixA, matrixAContainer);
        readMatrix(matrixB, matrixBContainer);
        switch (op) {
            case "add":
                displayMatrix(addMatrices(matrixA, matrixB));
                break;
            case "subAB":
                displayMatrix(subMatrices(matrixA, matrixB));
                break;
            case "subBA":
                displayMatrix(subMatrices(matrixB, matrixA));
                break;
            case "mul":
                displayMatrix(multiplyMatrices(matrixA, matrixB));
                break;
            case "scalarA":
                // muestro el input para el escalar
                scalarInputSection.style.display = "block";
                // el evento onchange para guardar el valor del escalar cuando
                // el usuario haga un cambio/ingrese un numero
                scalarValueInput.onchange = () => {
                    const k = parseFloat(scalarValueInput.value);
                    // prevencion de que no sea NaN not a number o sea nulo
                    if (isNaN(k) || null ) {
                        messageDiv.textContent = "Ingrese un valor numerico valido para k.";
                        return;
                    }
                    // al ejecutar esta funcion se mostraria el resultado de la multiplicacion
                    // por el escalar directamente
                    displayMatrix(scalarMultiply(matrixA, k));
                };
                break;
            default:
                break;
        }
    });
});

// manejando tamaño de matriz
selectSize.addEventListener("change", () => {
    // si se cambia el tamaño de las matrices se vacia el contenido del resultado
    resultContainer.innerHTML = "";
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