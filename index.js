const selectSizeA = document.getElementById("selectSizeA");
const selectSizeB = document.getElementById("selectSizeB");
const matrixAContainer = document.getElementById("matrixA");
const matrixBContainer = document.getElementById("matrixB");
const randomAButton = document.getElementById("randomA");
const randomBButton = document.getElementById("randomB");
const clearAButton = document.getElementById("clearA");
const clearBButton = document.getElementById("clearB");
const resultContainer = document.getElementById("result");
const messageDiv = document.getElementById("message");
const scalarInputSection = document.getElementById("scalarInput");
const scalarValueInput = document.getElementById("scalarValue");
const identityInputSection = document.getElementById("identityInput");
const identitySizeSelect = document.getElementById("identitySize");
const inverseVerification = document.getElementById("inverseVerification");
const inverseVerificationButton = document.getElementById("inverseVerificationButton");
const applyScalarButton = document.getElementById("applyScalar");

const addABButton = document.getElementById("addAB");
const subtractABButton = document.getElementById("subtractAB");
const subtractBAButton = document.getElementById("subtractBA");
const multiplyABButton = document.getElementById("multiplyAB");
const scalarAButton = document.getElementById("scalarA");
const transposeAButton = document.getElementById("transposeA");
const determinantAButton = document.getElementById("determinantA");
const inverseAButton = document.getElementById("inverseA");
const identityButton = document.getElementById("identity");

let nA = parseInt(selectSizeA.value);
let nB = parseInt(selectSizeB.value);
let matrixA = [];
let matrixB = [];

function createMatrixInputs(container, matrixArray, size) {
    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${size}, auto)`;
    matrixArray.length = 0;
    for (let i = 0; i < size; i++) {
        matrixArray[i] = [];
        for (let j = 0; j < size; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.value = "0";
            input.addEventListener("input", () => {
                matrixArray[i][j] = parseFloat(input.value);
            });
            matrixArray[i][j] = 0;
            container.appendChild(input);
        }
    }
}

function randomValues(matrixArray, container, size) {
    resultContainer.innerHTML = "";
    identityInputSection.style.display = "none";
    scalarInputSection.style.display = "none";
    messageDiv.textContent = "";
    inverseVerification.style.display = "none";

    const inputs = container.querySelectorAll("input");
    inputs.forEach((input, index) => {
        const i = Math.floor(index / size);
        const j = index % size;
        const val = Math.floor(Math.random() * 21) - 10;
        input.value = val;
        matrixArray[i][j] = val;
    });
}

function clearMatrix(matrixArray, container, size) {
    resultContainer.innerHTML = "";
    identityInputSection.style.display = "none";
    scalarInputSection.style.display = "none";
    messageDiv.textContent = "";
    inverseVerification.style.display = "none";
    const inputs = container.querySelectorAll("input");
    inputs.forEach((input, index) => {
        input.value = "0";
        const i = Math.floor(index / size);
        const j = index % size;
        matrixArray[i][j] = 0;
    });
}

function add(A, B) {
    const size = A.length;
    const C = [];
    for (let i = 0; i < size; i++) {
        C[i] = [];
        for (let j = 0; j < size; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }
    return C;
}

function sub(A, B) {
    const size = A.length;
    const C = [];
    for (let i = 0; i < size; i++) {
        C[i] = [];
        for (let j = 0; j < size; j++) {
            C[i][j] = A[i][j] - B[i][j];
        }
    }
    return C;
}

function multiply(A, B) {
    const sizeA = A.length;
    const sizeB = B.length;
    const C = [];
    for (let i = 0; i < sizeA; i++) {
        C[i] = [];
        for (let j = 0; j < sizeB; j++) {
            let sum = 0;
            for (let k = 0; k < sizeA; k++) {
                sum += (A[i][k] || 0) * (B[k][j] || 0);
            }
            C[i][j] = sum;
        }
    }
    return C;
}

function scalarMultiply(A, k) {
    const size = A.length;
    const C = [];
    for (let i = 0; i < size; i++) {
        C[i] = [];
        for (let j = 0; j < size; j++) {
            C[i][j] = A[i][j] * k;
        }
    }
    return C;
}

function transpose(A) {
    const size = A.length;
    const C = [];
    for (let i = 0; i < size; i++) {
        C[i] = [];
        for (let j = 0; j < size; j++) {
            C[i][j] = A[j][i];
        }
    }
    return C;
}

function determinant(A) {
    const size = A.length;
    const M = A.map(row => row.slice());
    let det = 1;
    for (let i = 0; i < size; i++) {
        let pivot = i;
        for (let j = i + 1; j < size; j++) {
            if (Math.abs(M[j][i]) > Math.abs(M[pivot][i])) pivot = j;
        }
        if (Math.abs(M[pivot][i]) < 1e-10) return 0;
        if (i !== pivot) {
            [M[i], M[pivot]] = [M[pivot], M[i]];
            det *= -1;
        }
        det *= M[i][i];
        for (let j = i + 1; j < size; j++) {
            const factor = M[j][i] / M[i][i];
            for (let k = i; k < size; k++) {
                M[j][k] -= factor * M[i][k];
            }
        }
    }
    return det;
}

function inverse(A) {
    const size = A.length;
    const M = A.map(row => row.slice());
    const I = [];
    for (let i = 0; i < size; i++) {
        I[i] = Array(size).fill(0);
        I[i][i] = 1;
    }
    for (let i = 0; i < size; i++) {
        let pivot = i;
        for (let j = i + 1; j < size; j++) {
            if (Math.abs(M[j][i]) > Math.abs(M[pivot][i])) pivot = j;
        }
        if (Math.abs(M[pivot][i]) < 1e-10) return null;
        [M[i], M[pivot]] = [M[pivot], M[i]];
        [I[i], I[pivot]] = [I[pivot], I[i]];
        const pivVal = M[i][i];
        for (let j = 0; j < size; j++) {
            M[i][j] /= pivVal;
            I[i][j] /= pivVal;
        }
        for (let j = 0; j < size; j++) {
            if (j !== i) {
                const factor = M[j][i];
                for (let k = 0; k < size; k++) {
                    M[j][k] -= factor * M[i][k];
                    I[j][k] -= factor * I[i][k];
                }
            }
        }
    }
    return I;
}

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

function readMatrix(matrixArray, container, size) {
    const inputs = container.querySelectorAll("input");
    inputs.forEach((input, index) => {
        const i = Math.floor(index / size);
        const j = index % size;
        matrixArray[i][j] = parseFloat(input.value) || 0;
    });
}

function displayMatrix(matrix) {
    resultContainer.innerHTML = "";
    resultContainer.style.gridTemplateColumns = `repeat(${matrix.length}, auto)`;

    matrix.forEach(row => {
        row.forEach(val => {
            const cell = document.createElement("input");
            cell.type = "text";
            cell.value = val.toFixed(4);
            cell.disabled = true;
            cell.style.backgroundColor = "#e8f4f8";
            cell.style.fontWeight = "bold";
            resultContainer.appendChild(cell);
        });
    });
}

selectSizeA.addEventListener("change", () => {
    messageDiv.textContent = "";
    resultContainer.innerHTML = "";
    scalarInputSection.style.display = "none";
    identityInputSection.style.display = "none";
    inverseVerification.style.display = "none";

    nA = parseInt(selectSizeA.value);
    createMatrixInputs(matrixAContainer, matrixA, nA);
});

selectSizeB.addEventListener("change", () => {
    messageDiv.textContent = "";
    resultContainer.innerHTML = "";
    scalarInputSection.style.display = "none";
    identityInputSection.style.display = "none";
    inverseVerification.style.display = "none";

    nB = parseInt(selectSizeB.value);
    createMatrixInputs(matrixBContainer, matrixB, nB);
});

randomAButton.addEventListener("click", () => randomValues(matrixA, matrixAContainer, nA));
randomBButton.addEventListener("click", () => randomValues(matrixB, matrixBContainer, nB));
clearAButton.addEventListener("click", () => clearMatrix(matrixA, matrixAContainer, nA));
clearBButton.addEventListener("click", () => clearMatrix(matrixB, matrixBContainer, nB));

addABButton.addEventListener("click", () => {
    nA = parseInt(selectSizeA.value);
    nB = parseInt(selectSizeB.value);
    readMatrix(matrixA, matrixAContainer, nA);
    readMatrix(matrixB, matrixBContainer, nB);
    
    resultContainer.innerHTML = "";
    messageDiv.textContent = "";
    scalarInputSection.style.display = "none";
    identityInputSection.style.display = "none";
    inverseVerification.style.display = "none";
    
    if (nA !== nB) {
        messageDiv.textContent = "Solo se puede sumar si A y B tienen mismo tamaño";
        return;
    }
    displayMatrix(add(matrixA, matrixB));
});

subtractABButton.addEventListener("click", () => {
    nA = parseInt(selectSizeA.value);
    nB = parseInt(selectSizeB.value);
    readMatrix(matrixA, matrixAContainer, nA);
    readMatrix(matrixB, matrixBContainer, nB);
    
    resultContainer.innerHTML = "";
    messageDiv.textContent = "";
    scalarInputSection.style.display = "none";
    identityInputSection.style.display = "none";
    inverseVerification.style.display = "none";
    
    if (nA !== nB) {
        messageDiv.textContent = "Solo se puede restar si A y B tienen mismo tamaño";
        return;
    }
    displayMatrix(sub(matrixA, matrixB));
});

subtractBAButton.addEventListener("click", () => {
    nA = parseInt(selectSizeA.value);
    nB = parseInt(selectSizeB.value);
    readMatrix(matrixA, matrixAContainer, nA);
    readMatrix(matrixB, matrixBContainer, nB);
    
    resultContainer.innerHTML = "";
    messageDiv.textContent = "";
    scalarInputSection.style.display = "none";
    identityInputSection.style.display = "none";
    inverseVerification.style.display = "none";
    
    if (nA !== nB) {
        messageDiv.textContent = "Solo se puede restar si A y B tienen mismo tamaño";
        return;
    }
    displayMatrix(sub(matrixB, matrixA));
});

multiplyABButton.addEventListener("click", () => {
    nA = parseInt(selectSizeA.value);
    nB = parseInt(selectSizeB.value);
    readMatrix(matrixA, matrixAContainer, nA);
    readMatrix(matrixB, matrixBContainer, nB);
    
    resultContainer.innerHTML = "";
    messageDiv.textContent = "";
    scalarInputSection.style.display = "none";
    identityInputSection.style.display = "none";
    inverseVerification.style.display = "none";
    
    if (nA !== nB) {
        messageDiv.textContent = "Para multiplicar, las matrices deben tener el mismo tamaño";
        return;
    }
    displayMatrix(multiply(matrixA, matrixB));
});

scalarAButton.addEventListener("click", () => {
    nA = parseInt(selectSizeA.value);
    resultContainer.innerHTML = "";
    messageDiv.textContent = "";
    identityInputSection.style.display = "none";
    inverseVerification.style.display = "none";

    scalarInputSection.style.display = "block";
    scalarValueInput.value = "";
    scalarValueInput.focus();

    applyScalarButton.onclick = () => {
        readMatrix(matrixA, matrixAContainer, nA);

        const k = parseFloat(scalarValueInput.value);
        if (isNaN(k)) {
            messageDiv.textContent = "Ingresa un valor numérico válido para k";
            resultContainer.innerHTML = "";
            return;
        }

        messageDiv.textContent = "";
        const result = scalarMultiply(matrixA, k);
        displayMatrix(result);
    };
});



transposeAButton.addEventListener("click", () => {
    nA = parseInt(selectSizeA.value);
    readMatrix(matrixA, matrixAContainer, nA);
    
    resultContainer.innerHTML = "";
    messageDiv.textContent = "";
    scalarInputSection.style.display = "none";
    identityInputSection.style.display = "none";
    inverseVerification.style.display = "none";
    
    displayMatrix(transpose(matrixA));
});

determinantAButton.addEventListener("click", () => {
    nA = parseInt(selectSizeA.value);
    readMatrix(matrixA, matrixAContainer, nA);
    
    resultContainer.innerHTML = "";
    scalarInputSection.style.display = "none";
    identityInputSection.style.display = "none";
    inverseVerification.style.display = "none";
    
    if (nA < 1) {
        messageDiv.textContent = "La matriz A debe ser cuadrada";
        return;
    }
    const detVal = determinant(matrixA);
    messageDiv.textContent = `det(A) = ${detVal.toFixed(4)}`;
});

inverseAButton.addEventListener("click", () => {
    nA = parseInt(selectSizeA.value);
    readMatrix(matrixA, matrixAContainer, nA);
    
    resultContainer.innerHTML = "";
    messageDiv.textContent = "";
    scalarInputSection.style.display = "none";
    identityInputSection.style.display = "none";
    
    const detA = determinant(matrixA);
    if (Math.abs(detA) < 1e-10) {
        messageDiv.textContent = "La matriz A no es invertible (det = 0)";
        return;
    }
    const invA = inverse(matrixA);
    if (!invA) {
        messageDiv.textContent = "Error al calcular la inversa de A";
        return;
    }
    displayMatrix(invA);
    inverseVerification.style.display = "block";
});

identityButton.addEventListener("click", () => {
    resultContainer.innerHTML = "";
    messageDiv.textContent = "";
    scalarInputSection.style.display = "none";
    inverseVerification.style.display = "none";
    
    identityInputSection.style.display = "block";
    identitySizeSelect.focus();
    
    const size = parseInt(identitySizeSelect.value);
    displayMatrix(identity(size));
    
    identitySizeSelect.onchange = () => {
        const newSize = parseInt(identitySizeSelect.value);
        displayMatrix(identity(newSize));
    };
});

inverseVerificationButton.addEventListener("click", () => {
    nA = parseInt(selectSizeA.value);
    readMatrix(matrixA, matrixAContainer, nA);
    const invA = inverse(matrixA);
    if (invA) displayMatrix(multiply(matrixA, invA));
});

createMatrixInputs(matrixAContainer, matrixA, nA);
createMatrixInputs(matrixBContainer, matrixB, nB);