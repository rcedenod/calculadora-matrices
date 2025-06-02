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
const scalarInputSection = document.getElementById("scalarInput");
const scalarValueInput = document.getElementById("scalarValue");
const identityInputSection = document.getElementById("identityInput");
const identitySizeSelect = document.getElementById("identitySize");
const inverseVerification = document.getElementById("inverseVerification");

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
                matrixArray[i][j] = parseFloat(input.value);
            });
            matrixArray[i][j] = 0;
            // agrego este hijo (el input) a su contenedor, en este caso "container"
            container.appendChild(input);
        }
    }
}

// valores aleatorios
function randomValues(matrixArray, container) {
    resultContainer.innerHTML = "";
    identityInputSection.style.display = "none";
    scalarInputSection.style.display = "none";
    messageDiv.textContent = "";
    inverseVerification.style.display = "none";
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
    resultContainer.innerHTML = "";
    identityInputSection.style.display = "none";
    scalarInputSection.style.display = "none";
    messageDiv.textContent = "";
    inverseVerification.style.display = "none";
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
function add(A, B) {
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
function sub(A, B) {
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
function multiply(A, B) {
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

// transpuesta
function transpose(A) {
    const C = [];
    for (let i = 0; i < A.length; i++) {
        C[i] = [];
        for (let j = 0; j < A.length; j++) {
            C[i][j] = A[j][i];
        }
    }
    return C;
}

// determinante
function determinant(A) {
    const M = A.map(row => row.slice());
    let det = 1;
    for (let i = 0; i < n; i++) {
        let pivot = i;
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(M[j][i]) > Math.abs(M[pivot][i])) pivot = j;
        }
        if (Math.abs(M[pivot][i]) < 1e-10) return 0;
        if (i !== pivot) {
            [M[i], M[pivot]] = [M[pivot], M[i]];
            det *= -1;
        }
        det *= M[i][i];

        for (let j = i + 1; j < n; j++) {
            const factor = M[j][i] / M[i][i];
            for (let k = i; k < n; k++) {
                M[j][k] -= factor * M[i][k];
            }
        }
    }
    return det;
}

// inversa
function inverse(A) {
      const n = A.length;
      // Copia profunda de A en M
      const M = A.map(row => row.slice());
      // Crear matriz identidad I de tamaño n
      const I = [];
      for (let i = 0; i < n; i++) {
        I[i] = Array(n).fill(0);
        I[i][i] = 1;
      }

      for (let i = 0; i < n; i++) {
        // Pivoteo parcial: buscar fila con mayor |M[row][i]| a partir de la fila i
        let pivot = i;
        for (let j = i + 1; j < n; j++) {
          if (Math.abs(M[j][i]) > Math.abs(M[pivot][i])) {
            pivot = j;
          }
        }
        // Si el valor absoluto del pivote es (casi) cero, la matriz es singular
        if (Math.abs(M[pivot][i]) < 1e-10) {
          return null;
        }
        // Intercambiar filas i y pivot en M e I
        [M[i], M[pivot]] = [M[pivot], M[i]];
        [I[i], I[pivot]] = [I[pivot], I[i]];

        // Dividir la fila pivote por su elemento principal (normalizar a 1)
        const pivVal = M[i][i];
        for (let j = 0; j < n; j++) {
          M[i][j] /= pivVal;
          I[i][j] /= pivVal;
        }

        // Anular las demás filas en la columna i
        for (let j = 0; j < n; j++) {
          if (j !== i) {
            const factor = M[j][i];
            for (let k = 0; k < n; k++) {
              M[j][k] -= factor * M[i][k];
              I[j][k] -= factor * I[i][k];
            }
          }
        }
      }

      return I;
}

// matriz identidad
function identity(size) {
    const I = [];
    for (let i = 0; i < size; i++) {
        I[i] = [];
        for (let j = 0; j < size; j++) {
            I[i][j] = i === j ? 1 : 0;
        }
    }
    return I;
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
                displayMatrix(add(matrixA, matrixB));
                break;
            case "subAB":
                displayMatrix(sub(matrixA, matrixB));
                break;
            case "subBA":
                displayMatrix(sub(matrixB, matrixA));
                break;
            case "mul":
                displayMatrix(multiply(matrixA, matrixB));
                break;
            case "scalarA":
                // muestro el input para el escalar
                identityInputSection.style.display = "none";
                inverseVerification.style.display = "none";
                scalarInputSection.style.display = "block";
                // el evento onchange para guardar el valor del escalar cuando
                // el usuario haga un cambio/ingrese un numero
                scalarValueInput.focus();
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
                        case "transposeA":
                displayMatrix(transpose(matrixA));
                break;
            case "detA":
                inverseVerification.style.display = "none";
                const detVal = determinant(matrixA);
                messageDiv.textContent = `det(A) = ${detVal.toFixed(4)}`;
                break;
            case "invA":
                const detA = determinant(matrixA);
                if (Math.abs(detA) < 1e-10) {
                    messageDiv.textContent = "La matriz no es invertible (det(A) = 0).";
                    return;
                }
                const invA = inverse(matrixA);
                if (!invA) {
                    messageDiv.textContent = "Error al calcular la inversa.";
                    return;
                }
                displayMatrix(invA);
                inverseVerification.style.display = "block";

                break;
            case "identity":
                messageDiv.textContent = "";
                resultContainer.innerHTML = "";
                scalarInputSection.style.display = "none";
                inverseVerification.style.display = "none";
                identityInputSection.style.display = "block";
                identitySizeSelect.focus();
                identitySizeSelect.onchange = () => {
                    const size = parseInt(identitySizeSelect.value);
                    displayMatrix(identity(size));
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
    identityInputSection.style.display = "none";
    scalarInputSection.style.display = "none";
    messageDiv.textContent = "";
    inverseVerification.style.display = "none";
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

inverseVerification.addEventListener("click", () => {
    displayMatrix( multiply( matrixA, inverse(matrixA) ) );
});

// llamo la funcion para inicializar las dos matrices
createMatrixInputs(matrixAContainer, matrixA);
createMatrixInputs(matrixBContainer, matrixB);