/*********************************************************
 DESCRIPCIÓN: Registramos ingresos y egresos, usando
 funciones constructoras, herencia prototipal, validaciones
 y actualizaciones automáticas de totales. 
**********************************************************/

/* -----------------------------------------------
  PASO 1: Crear el array global de movimientos
-------------------------------------------------- */
// Aquí se guardarán todos los objetos registrados
let movimientos = [];

/* -----------------------------------------------
  PASO 2: Crear la función constructora base
-------------------------------------------------- */
// Esta es la función "madre" para todos los movimientos
function Movimiento(tipo, monto, descripcion) {
  this.tipo = tipo;
  this.monto = monto;
  this.descripcion = descripcion;
}

/* -------------------------------------------------
  PASO 3: Agregar métodos comunes al prototipo
-------------------------------------------------- */

// Validaciones generales para cualquier movimiento
Movimiento.prototype.validarDatosBasicos = function () {
  if (this.tipo !== "ingreso" && this.tipo !== "egreso") {
    console.log("❌ Tipo inválido. Usa 'ingreso' o 'egreso'.");
    return false;
  }

  if (isNaN(this.monto) || this.monto <= 0) {
    console.log("❌ Monto inválido. Debe ser un número mayor que 0.");
    return false;
  }

  if (!this.descripcion || this.descripcion.trim() === "") {
    console.log("❌ Descripción vacía. Debes ingresar un texto.");
    return false;
  }

  return true;
};

// Este método se encarga de recalcular los totales automáticamente
Movimiento.prototype.recalcularTotales = function () {
  let totalIngresos = 0;
  let totalEgresos = 0;

  for (let i = 0; i < movimientos.length; i++) {
    if (movimientos[i] instanceof Ingreso) {
      totalIngresos += movimientos[i].monto;
    } else if (movimientos[i] instanceof Egreso) {
      totalEgresos += movimientos[i].monto;
    }
  }

  console.log("\n🔄 Totales actualizados:");
  console.log("💰 Total Ingresos: $" + totalIngresos.toFixed(2));
  console.log("💸 Total Egresos:  $" + totalEgresos.toFixed(2));
  console.log("🧮 Saldo Disponible: $" + (totalIngresos - totalEgresos).toFixed(2));
};

/* -------------------------------------------------
  PASO 4: Crear subtipos usando herencia prototipal
-------------------------------------------------- */

// Subtipo Ingreso
function Ingreso(monto, descripcion) {
  Movimiento.call(this, "ingreso", monto, descripcion); // heredamos propiedades
}

// Heredamos métodos de Movimiento
Ingreso.prototype = Object.create(Movimiento.prototype);
Ingreso.prototype.constructor = Ingreso;

// Validación específica para ingresos (usa las generales)
Ingreso.prototype.validar = function () {
  return this.validarDatosBasicos();
};

// Subtipo Egreso
function Egreso(monto, descripcion) {
  Movimiento.call(this, "egreso", monto, descripcion); // heredamos propiedades
}

// Heredamos métodos de Movimiento
Egreso.prototype = Object.create(Movimiento.prototype);
Egreso.prototype.constructor = Egreso;

// Validación específica para egresos (usa las generales)
Egreso.prototype.validar = function () {
  return this.validarDatosBasicos();
};

/* -------------------------------------------------
  PASO 5: Función para registrar un movimiento
-------------------------------------------------- */
// Aquí usamos prompt() para pedir los datos al usuario
function registrarMovimiento() {
  let tipo = prompt("¿Tipo de movimiento? (ingreso/egreso):").toLowerCase();
  let monto = parseFloat(prompt("¿Monto?:"));
  let descripcion = prompt("Descripción del movimiento:");

  let nuevoMovimiento;

  // Creamos el objeto adecuado según el tipo
  if (tipo === "ingreso") {
    nuevoMovimiento = new Ingreso(monto, descripcion);
  } else if (tipo === "egreso") {
    nuevoMovimiento = new Egreso(monto, descripcion);
  } else {
    console.log("❌ Tipo inválido. Debe ser 'ingreso' o 'egreso'.");
    return;
  }

  // Validamos y si pasa, lo agregamos
  if (nuevoMovimiento.validar()) {
    movimientos.push(nuevoMovimiento);
    console.log("✅ Movimiento registrado correctamente.");
    nuevoMovimiento.recalcularTotales(); // Actualiza totales automáticamente
  } else {
    console.log("❌ No se pudo registrar el movimiento.");
  }
}

/* -------------------------------------------------
  PASO 6: Función para listar movimientos (usando map)
-------------------------------------------------- */
function listarNombresMovimientos() {
  const nombres = movimientos.map(function (mov) {
    return mov.descripcion;
  });

  console.log("\n📝 Nombres de movimientos:");
  console.log(nombres);
}

/* -------------------------------------------------
  PASO 7: Filtrar egresos mayores a $100 (filter)
-------------------------------------------------- */
function filtrarEgresosMayores100() {
  const filtrados = movimientos.filter(function (mov) {
    return mov instanceof Egreso && mov.monto > 100;
  });

  console.log("\n💸 Egresos mayores a $100:");
  console.log(filtrados);
}

/* -------------------------------------------------
  PASO 8: Buscar movimiento por nombre (find)
-------------------------------------------------- */
function buscarMovimientoPorNombre() {
  const nombre = prompt("¿Qué movimiento deseas buscar (por descripción)?");
  const encontrado = movimientos.find(function (mov) {
    return mov.descripcion.toLowerCase() === nombre.toLowerCase();
  });

  console.log("\n🔍 Resultado de búsqueda:");
  if (encontrado) {
    console.log(encontrado);
  } else {
    console.log("❌ No se encontró ningún movimiento con ese nombre.");
  }
}

/* -------------------------------------------------
  PASO 9: Bucle para registrar varios movimientos
-------------------------------------------------- */
console.log("💼 Bienvenido al Control de Presupuesto Personal 💼");
console.log("--------------------------------------------------");

let continuar = "si";

while (continuar === "si") {
  registrarMovimiento();
  continuar = prompt("¿Deseas registrar otro movimiento? (si/no):").toLowerCase();
}

/* -------------------------------------------------
  PASO 10: Mostrar funciones adicionales al final
-------------------------------------------------- */
listarNombresMovimientos();
filtrarEgresosMayores100();
buscarMovimientoPorNombre();
