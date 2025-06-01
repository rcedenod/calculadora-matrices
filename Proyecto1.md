# REPÚBLICA BOLIVARIANA DE VENEZUELA
## UNIVERSIDAD RAFAEL URDANETA
### FACULTAD DE INGENIERÍA
### LENGUAJE DE CLIENTES WEB
**PROFESOR:** ING. VICTOR KNEIDER

---

# **PROYECTO 1: CALCULADORA DE MATRICES INTERACTIVA**

## **OBJETIVO GENERAL**
Desarrollar una aplicación web interactiva que permita a los usuarios realizar operaciones matemáticas con matrices cuadradas de tamaño n×n (donde 2 ≤ n ≤ 10), implementando algoritmos matemáticos precisos y proporcionando una interfaz de usuario intuitiva y responsive.

## **OBJETIVOS ESPECÍFICOS**
1. Implementar algoritmos matemáticos para operaciones matriciales
2. Diseñar una interfaz web responsive y accesible
3. Validar datos de entrada y manejar errores apropiadamente
4. Aplicar principios de programación limpia y modular
5. Documentar el código y crear casos de prueba

---

## **REQUERIMIENTOS FUNCIONALES**

### **Operaciones Obligatorias**
La aplicación debe implementar las siguientes operaciones con validación completa:

1. **Suma de matrices (A + B)**
   - Validar que ambas matrices tengan las mismas dimensiones
   - Mostrar mensaje de error si las dimensiones no coinciden

2. **Resta de matrices (A - B)**
   - Validar dimensiones compatibles
   - Implementar tanto A-B como B-A

3. **Multiplicación de matrices (A × B)**
   - Validar compatibilidad (columnas de A = filas de B)

4. **Multiplicación por escalar (k × A)**
   - Permitir números enteros y decimales
   - Validar entrada numérica

5. **Transposición de matriz (A<sup>T</sup>)**
   - Intercambiar filas por columnas
   - Mostrar matriz original y transpuesta simultáneamente

6. **Determinante de matriz (det(A))**
   - Implementar para matrices de 2×2 a 10×10
   - Usar método de expansión por cofactores o eliminación gaussiana
   - Mostrar el valor numérico con precisión de 4 decimales

7. **Matriz inversa (A<sup>-1</sup>)**
   - Implementar método de Gauss-Jordan
   - Validar que det(A) ≠ 0
   - Mostrar mensaje claro si la matriz no es invertible
   - Verificación: mostrar A × A<sup>-1</sup> = I

8. **Matriz identidad (I<sub>n</sub>)**
   - Generar matriz identidad de tamaño especificado
   - Permitir tamaños de 2×2 hasta 10×10

### **Funcionalidades de Entrada**
- **Entrada manual:** Formulario con campos numéricos organizados en grid
- **Generación aleatoria:** Números enteros entre -10 y 10
- **Carga de ejemplos:**   Generación de matriz de ejemplo para pruebas rápidas
- **Limpieza de matrices:** Botón para resetear todas las entradas

### **Validaciones Obligatorias**
- Entrada numérica válida (enteros y decimales)
- Verificación de dimensiones para operaciones

## **ENTREGA Y DOCUMENTACIÓN**

### **Modalidad de Entrega**
- **Fecha límite:** [28-05-25 - 2 semanas desde asignación]
- **Formato:** Repositorio Github y proyecto para la defensa
- **Plataforma:** Google Classroom y Github
- **Demostración:** Defensa evaluada

### **Documentación Requerida**
1. **README.md:** Instrucciones de uso y funcionalidades

### **Criterios de Calidad del Código**
- Funciones puras para operaciones matemáticas
- Separación de lógica de negocio y presentación
- Nombres descriptivos para variables y funciones
- Manejo apropiado de errores con try-catch
- Código indentado y consistente

---

*Este proyecto constituye el 25% de la calificación final del curso.*