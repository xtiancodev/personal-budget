/***********************************************
 RESUMEN: CONTROL DE PRESUPUESTO PERSONAL
 Ahora cada movimiento será un objeto creado con 
 una función constructora llamada Movimiento.
***********************************************/

/* -------------------------------------------
 PASO 1: Crear el array para guardar movimientos
--------------------------------------------- */
let movimientos = []; // Lista donde guardaremos cada movimiento

/* -------------------------------------------
 PASO 2: Definir la función constructora
--------------------------------------------- */
// Esta función es el "molde" para crear movimientos nuevos

function Movimiento(tipo, monto, descripcion) {

    // VALIDACIONES BÁSICAS
    if (tipo !== "ingreso" && tipo !== "egreso") {
        console.log("❌ Tipo inválido. Usa 'ingreso' o 'egreso'.");
        return; // Cancelamos si el tipo no es válido
    }

    if (isNaN(monto) || monto <= 0) {
        console.log("❌ Monto inválido. Debe ser un número mayor que 0.");
        return;
    }

    if (!descripcion || descripcion.trim() === "") {
        console.log("❌ La descripción no puede estar vacía.");
        return;
    }

    // SI TODO ES CORRECTO, CREAMOS LAS PROPIEDADES
    this.tipo = tipo;
    this.monto = monto;
    this.descripcion = descripcion;
}

/* -------------------------------------------
 PASO 3: Función para registrar movimientos
--------------------------------------------- */

function registrarMovimiento() {
    let tipo = prompt("Tipo (ingreso/egreso):").toLowerCase();
    let monto = parseFloat(prompt("Monto:"));
    let descripcion = prompt("Descripción del movimiento:");

    // Creamos un nuevo objeto Movimiento
    let nuevoMovimiento = new Movimiento(tipo, monto, descripcion);

    // Si el objeto se creó correctamente, lo agregamos al array
    if (nuevoMovimiento.tipo) { // Solo si pasó las validaciones
        movimientos.push(nuevoMovimiento);
        console.log("✅ Movimiento registrado correctamente.");
    } else {
        console.log("❌ No se pudo registrar el movimiento.");
    }
}

/* -------------------------------------------
 PASO 4: Función para calcular saldo total
--------------------------------------------- */

function calcularTotalSaldo() {
    let total = 0;

    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i].tipo === "ingreso") {
            total += movimientos[i].monto;
        } else {
            total -= movimientos[i].monto;
        }
    }

    return total;
}

/* -------------------------------------------
 PASO 5: Función para mostrar resumen general
--------------------------------------------- */

function mostrarResumen() {
    console.log("\n🔎 RESUMEN GENERAL");
    console.log("-------------------");
    console.log("Total de movimientos registrados: " + movimientos.length);
    let saldo = calcularTotalSaldo();
    console.log("Saldo total: $" + saldo.toFixed(2));

    // Totales por tipo
    let totalIngresos = 0;
    let totalEgresos = 0;

    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i].tipo === "ingreso") {
            totalIngresos += movimientos[i].monto;
        } else {
            totalEgresos += movimientos[i].monto;
        }
    }

    console.log("\nDesglose por tipo:");
    console.log("- Ingresos: $" + totalIngresos.toFixed(2));
    console.log("- Egresos: $" + totalEgresos.toFixed(2));
}

/* -------------------------------------------
 PASO 6: Funciones adicionales (map, filter, find)
--------------------------------------------- */

// HU1 - Listar nombres de movimientos
function listarNombresMovimientos() {
    const nombres = movimientos.map(function(movimiento) {
        return movimiento.descripcion;
    });
    console.log("\n📝 Nombres de movimientos registrados:");
    console.log(nombres);
}

// HU2 - Filtrar egresos mayores a $100
function filtrarEgresosMayores100() {
    const egresosMayores = movimientos.filter(function(movimiento) {
        return movimiento.tipo === "egreso" && movimiento.monto > 100;
    });

    console.log("\n💰 Egresos mayores a $100:");
    console.log(egresosMayores);
}

// HU3 - Buscar movimiento por nombre
function buscarMovimientoPorNombre() {
    const nombreBuscado = prompt("Ingresa el nombre del movimiento que quieres buscar:");
    const movimientoEncontrado = movimientos.find(function(movimiento) {
        return movimiento.descripcion.toLowerCase() === nombreBuscado.toLowerCase();
    });

    console.log("\n🔍 Resultado de búsqueda:");
    if (movimientoEncontrado) {
        console.log(movimientoEncontrado);
    } else {
        console.log(`❌ No se encontró un movimiento con el nombre "${nombreBuscado}".`);
    }
}

/* -------------------------------------------
 PASO 7: Bucle principal para registrar movimientos
--------------------------------------------- */

console.log("Bienvenido al Control de Presupuesto Personal");
console.log("---------------------------------------------");

let continuar = "si";

while (continuar === "si") {
    registrarMovimiento();
    continuar = prompt("¿Deseas registrar otro movimiento? (si/no):").toLowerCase();
}

/* -------------------------------------------
 PASO 8: Mostrar resultados finales
--------------------------------------------- */

mostrarResumen();
listarNombresMovimientos();
filtrarEgresosMayores100();
buscarMovimientoPorNombre();
