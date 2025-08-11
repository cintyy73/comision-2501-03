# 📚 Guía de Repaso: Arrays y Loops

## ✨ ¿Qué incluye este repaso?

### 🔄 **Loops FOR**
- `for` básico (con índices)
- `for...of` (para valores directos)
- `for...in` (para índices/propiedades)

### 🛠️ **Métodos de Array**
- `forEach()` - Ejecutar acción para cada elemento
- `map()` - Transformar elementos
- `filter()` - Filtrar elementos
- `find()` - Encontrar un elemento
- `some()` y `every()` - Verificar condiciones
- `reduce()` - Reducir a un valor
- `sort()` - Ordenar elementos

## 🚀 Cómo usar este repaso

1. **Abre el archivo HTML**: `repaso-arrays-y-loops.html`
2. **Ejecuta cada ejemplo**: Haz clic en los botones para ver los resultados
3. **Revisa la consola**: Usa F12 para ver logs detallados
4. **Practica**: Modifica el código y experimenta

## 💡 Conceptos clave para recordar

| Método | ¿Qué hace? | ¿Retorna? |
|--------|------------|-----------|
| `forEach` | Ejecuta función para cada elemento | `undefined` |
| `map` | Transforma cada elemento | Nuevo array |
| `filter` | Filtra elementos que cumplan condición | Nuevo array |
| `find` | Encuentra primer elemento que cumpla condición | Un elemento o `undefined` |
| `reduce` | Combina todos los elementos | Un valor |
| `some` | ¿Al menos uno cumple la condición? | `boolean` |
| `every` | ¿Todos cumplen la condición? | `boolean` |
| `sort` | Ordena elementos | Array modificado |

## 🎯 Ejercicios adicionales

### Datos para practicar:
```javascript
const productos = [
    { nombre: "Laptop", precio: 80000, categoria: "Tecnología" },
    { nombre: "Mouse", precio: 2500, categoria: "Tecnología" },
    { nombre: "Escritorio", precio: 15000, categoria: "Muebles" },
    { nombre: "Silla", precio: 8500, categoria: "Muebles" },
    { nombre: "Monitor", precio: 25000, categoria: "Tecnología" }
];
```

### Ejercicios:
1. **Filtrar**: Productos de categoría "Tecnología"
2. **Calcular**: Precio total de todos los productos
3. **Encontrar**: El producto más caro
4. **Transformar**: Lista de nombres en mayúscula
5. **Verificar**: Si hay productos con precio > 30000
6. **Ordenar**: Por precio (menor a mayor)

## 🎓 Para las profesoras

Este material cubre:
- ✅ Sintaxis clara y ejemplos prácticos
- ✅ Comparación entre diferentes enfoques
- ✅ Casos de uso reales
- ✅ Ejercicios progresivos
- ✅ Consejos nemotécnicos
- ✅ Datos realistas para practicar

### Sugerencias didácticas:
1. Empezar con los loops básicos
2. Mostrar diferencias entre `for`, `for...of` y `for...in`
3. Explicar cuándo usar cada método de array
4. Enfatizar que algunos métodos modifican el array original y otros no
5. Practicar con el ejercicio integrador

## 🔧 Archivos incluidos

- `repaso-arrays-y-loops.html` - Interfaz interactiva
- `repaso-arrays-y-loops.js` - Código JavaScript con ejemplos
- `README.md` - Esta guía

---

*Creado para la Comisión 2501-03 - Clase 07*
