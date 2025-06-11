# Calculadora de matrices

## Descripcion

Esta es una app que funciona como calculadora de matrices, permite realizar varias operaciones matematicas con matrices, como suma, resta, multiplicacion, determinante, inversa, transposicion y mas. El usuario puede definir el tamaño de las matrices y generar valores aleatorios para llenar las matrices A y B. Ademas, se incluyen opciones avanzadas para operar con escalares y matrices identidad.

## Funcionalidades

La aplicacion permite realizar las siguientes funciones:

1. Operaciones:
   - Sumar (A + B)
   - Restar (A - B y B - A)
   - Multiplicar (A × B)
   - Multiplicar una matriz por un escalar (k × A)
   - Transponer la matriz A (A<sup>T</sup>)
   - Calcular el determinante de A (det(A))
   - Calcular la inversa de A (A<sup>-1</sup>)
   - Generar una matriz identidad de tamaño seleccionado

3. Controles:
   - Generacion de valores aleatorios para las matrices A y B
   - Borrar los valores de las matrices A y B

4. Extras:
   - Verificar si A * A<sup>-1</sup> da la matriz identidad
   - Ajuste del tamaño de la matriz identidad
   
## Instrucciones de Uso

1. Seleccionar el tamaño de las matrices:
   - Las matrices A y B pueden ser de tamaño entre 2x2 y 10x10, seleccionando el tamaño en los menús desplegables correspondientes.
   
2. Generar valores aleatorios:
   - Haz clic en los botones Valores aleatorios A o Valores aleatorios B para llenar las matrices con valores aleatorios.

3. Limpiar valores:
   - Puedes borrar los valores de las matrices A o B usando los botones Limpiar valores A y Limpiar valores B.

4. Realizar operaciones:
   - Selecciona una de las operaciones disponibles, como la suma, resta, multiplicacion, etc., haciendo clic en los botones correspondientes.

5. Operaciones avanzadas:
   - Si seleccionas la operacion de multiplicar por un escalar (`k × A`), un campo aparecera para ingresar el valor del escalar k.
   - Si seleccionas la operacion de calcular la inversa de A (`A<sup>-1</sup>`), podras verificar si A * A<sup>-1</sup> da la matriz identidad mediante el boton Verificar A * A<sup>-1</sup>.

6. Ver el resultado:
   - El resultado de la operacion seleccionada aparecera en la seccion Resultado debajo de las matrices.

## Requisitos / Ejecucion

Para usar esta aplicacion, simplemente abre el archivo index.html en cualquier navegador web moderno. 
No se requiere instalacion adicional, sin embargo, LiveServer es una buena herramienta.

## Estructura de Archivos

- index.html: Contiene el marcado HTML de la interfaz de usuario.
- index.js: Script que contiene la logica para manejar las operaciones de matrices y la interfaz de usuario.
- styles.css: Archivo CSS para el estilo de la interfaz (no incluido en los archivos proporcionados).
- /images: Carpeta que guarda imagenes usada en la aplicacion.