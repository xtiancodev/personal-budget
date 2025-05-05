// Creamos el array donde se guardarán los movimientos
let movimientos = [];

/* ------------------------------------------------
   FUNCION 1 - Registrar Movimiento (HU original)
-------------------------------------------------- */
function registrarMovimiento() {
    let nombre = prompt("Nombre del movimiento:");

    // Validación: nombre no puede estar vacío
    while (nombre.trim() === "") {
        console.log("❌ El nombre no puede estar vacío.");
        nombre = prompt("Nombre del movimiento:");
    }

    let tipo = prompt("Tipo (Ingreso / Egreso):");
    tipo = tipo.toLowerCase();

    // Validación: solo puede ser ingreso o egreso
    while (tipo !== "ingreso" && tipo !== "egreso") {
        console.log("❌ Tipo inválido. Debe ser 'Ingreso' o 'Egreso'.");
        tipo = prompt("Tipo (Ingreso / Egreso):").toLowerCase();
    }

    let monto = parseFloat(prompt("Monto:"));

    // Validación: monto debe ser número mayor a 0
    while (isNaN(monto) || monto <= 0) {
        console.log("❌ Monto inválido. Debe ser un número mayor a 0.");
        monto = parseFloat(prompt("Monto:"));
    }

    // Guardamos el movimiento en el array
    movimientos.push({
        nombre: nombre,
        tipo: tipo,
        monto: monto
    });
}

/* ------------------------------------------------
   FUNCION 2 - Calcular Total del Saldo
-------------------------------------------------- */
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

/* ------------------------------------------------
   FUNCION 3 - Mostrar Resumen General
-------------------------------------------------- */
function mostrarResumen() {
    console.log("\nResumen Final");
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
    if (totalEgresos > 0) console.log("- Egresos: $" + totalEgresos.toFixed(2));
    if (totalIngresos > 0) console.log("- Ingresos: $" + totalIngresos.toFixed(2));
}

/* ------------------------------------------------
   HU1 - Listar nombres de movimientos usando map()
-------------------------------------------------- */
function listarNombresMovimientos() {
    const nombres = movimientos.map(movimiento => movimiento.nombre);
    console.log("\nNombres de movimientos registrados:");
    console.log(nombres);
}

/* ------------------------------------------------
   HU2 - Filtrar egresos mayores a $100 usando filter()
-------------------------------------------------- */
function filtrarEgresosMayores100() {
    const egresosMayores = movimientos.filter(movimiento =>
        movimiento.tipo === "egreso" && movimiento.monto > 100
    );

    console.log("\nEgresos mayores a $100:");
    console.log(egresosMayores);
}

/* ------------------------------------------------
   HU3 - Buscar movimiento por nombre usando find()
-------------------------------------------------- */
function buscarMovimientoPorNombre() {
    const nombreBuscado = prompt("Buscar movimiento por nombre:");
    const movimientoEncontrado = movimientos.find(movimiento =>
        movimiento.nombre.toLowerCase() === nombreBuscado.toLowerCase()
    );

    console.log("\nResultado encontrado:");
    if (movimientoEncontrado) {
        console.log(movimientoEncontrado);
    } else {
        console.log(`❌ No se encontró un movimiento con el nombre "${nombreBuscado}".`);
    }
}

/* ------------------------------------------------
   Bucle principal para registrar movimientos
-------------------------------------------------- */

console.log("Registro de Gastos");
console.log("-------------------");

let continuar = "si";

while (continuar.toLowerCase() === "si") {
    registrarMovimiento();

    continuar = prompt("¿Registrar otro movimiento? (si/no):");
}

/* ------------------------------------------------
   Mostramos todos los resúmenes solicitados
-------------------------------------------------- */
mostrarResumen();
listarNombresMovimientos();
filtrarEgresosMayores100();
buscarMovimientoPorNombre();
