
/*********************************************************
 PROYECTO FINAL: Control de presupuesto personal 
 DESCRIPCIÓN: Registramos ingresos y egresos usando
 funciones constructoras, herencia prototipal, validaciones,
 menú interactivo y análisis financiero desde consola.
**********************************************************/

/* -----------------------------------------------
  PASO 1: Crear el array global de movimientos
-------------------------------------------------- */
let movimientos = []; // Aquí se guardan todos los movimientos

/* -----------------------------------------------
  PASO 2: Función constructora base Movimiento
-------------------------------------------------- */
function Movimiento(tipo, monto, descripcion) {
  this.tipo = tipo;
  this.monto = monto;
  this.descripcion = descripcion;
}

/* -----------------------------------------------
  PASO 3: Métodos comunes en el prototipo
-------------------------------------------------- */
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
    console.log("❌ Descripción vacía.");
    return false;
  }

  return true;
};

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
  console.log("💰 Total Ingresos: S/" + totalIngresos.toFixed(2));
  console.log("💸 Total Egresos:  S/" + totalEgresos.toFixed(2));
  console.log("🧮 Saldo Disponible: S/" + (totalIngresos - totalEgresos).toFixed(2));
};

/* -----------------------------------------------
  PASO 4: Subtipos usando herencia prototipal
-------------------------------------------------- */
function Ingreso(monto, descripcion) {
  Movimiento.call(this, "ingreso", monto, descripcion);
}
Ingreso.prototype = Object.create(Movimiento.prototype);
Ingreso.prototype.constructor = Ingreso;
Ingreso.prototype.validar = function () {
  return this.validarDatosBasicos();
};

function Egreso(monto, descripcion) {
  Movimiento.call(this, "egreso", monto, descripcion);
}
Egreso.prototype = Object.create(Movimiento.prototype);
Egreso.prototype.constructor = Egreso;
Egreso.prototype.validar = function () {
  return this.validarDatosBasicos();
};

/* -----------------------------------------------
  PASO 5: Registro de movimientos con validación
-------------------------------------------------- */
function registrarMovimiento() {
  let tipo = prompt("¿Tipo de movimiento? (ingreso/egreso):").toLowerCase();
  let monto = parseFloat(prompt("¿Monto?:"));
  let descripcion = prompt("Descripción del movimiento:");

  let nuevoMovimiento;

  if (tipo === "ingreso") {
    nuevoMovimiento = new Ingreso(monto, descripcion);
  } else if (tipo === "egreso") {
    nuevoMovimiento = new Egreso(monto, descripcion);
  } else {
    console.log("❌ Tipo inválido.");
    return;
  }

  if (nuevoMovimiento.validar()) {
    movimientos.push(nuevoMovimiento);
    console.log("✅ Movimiento registrado correctamente.");
    nuevoMovimiento.recalcularTotales();
  } else {
    console.log("❌ No se pudo registrar el movimiento.");
  }
}

/* -----------------------------------------------
  PASO 6: Funciones adicionales (map, filter, find)
-------------------------------------------------- */
function listarNombresMovimientos() {
  const nombres = movimientos.map(function (mov) {
    return mov.descripcion;
  });
  console.log("\n📝 Nombres de movimientos:");
  console.log(nombres);
}

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
  NUEVO PASO 7: Funciones para análisis financiero
-------------------------------------------------- */
function calcularPromedioEgresos() {
  const egresos = movimientos.filter(function (mov) {
    return mov instanceof Egreso;
  });

  if (egresos.length === 0) {
    console.log("⚠️ Aún no hay egresos registrados.");
    return;
  }

  let total = 0;
  for (let i = 0; i < egresos.length; i++) {
    total += egresos[i].monto;
  }

  let promedio = total / egresos.length;
  console.log(`📉 Promedio de egresos: S/${promedio.toFixed(2)}`);
}

function mostrarEgresoMasAlto() {
  const egresos = movimientos.filter(function (mov) {
    return mov instanceof Egreso;
  });

  if (egresos.length === 0) {
    console.log("⚠️ No hay egresos registrados.");
    return;
  }

  let mayor = egresos[0];
  for (let i = 1; i < egresos.length; i++) {
    if (egresos[i].monto > mayor.monto) {
      mayor = egresos[i];
    }
  }

  console.log("💸 Egreso más alto:");
  console.log(`- Descripción: ${mayor.descripcion}`);
  console.log(`- Monto: S/${mayor.monto.toFixed(2)}`);
}

function mostrarGastosHormiga() {
    const hormigas = movimientos.filter(function (mov) {
    return mov instanceof Egreso && mov.monto < 50;
  });

  if (hormigas.length === 0) {
    console.log("👏 ¡No tienes gastos hormiga registrados!");
    return;
  }

  console.log("🐜 Gastos hormiga detectados (menores a S/50):");
  hormigas.forEach(function (mov) {
    console.log(`- ${mov.descripcion}: S/${mov.monto.toFixed(2)}`);
  });
}

/* -----------------------------------------------
  PASO 8: Menú interactivo para revisar finanzas
-------------------------------------------------- */
function mostrarMenu() {
  let opcion = "";

  while (opcion !== "6") {
    opcion = prompt(
      "\n📊 MENÚ DE OPCIONES\n" +
      "1. Ver promedio de egresos\n" +
      "2. Ver egreso más alto\n" +
      "3. Ver gastos hormiga (menores a S/50)\n" +
      "4. Listar nombres de movimientos\n" +
      "5. Buscar movimiento por nombre\n" +
      "6. Salir\n\n" +
      "Elige una opción (1-6):"
    );

    switch (opcion) {
      case "1":
        calcularPromedioEgresos();
        break;
      case "2":
        mostrarEgresoMasAlto();
        break;
      case "3":
        mostrarGastosHormiga();
        break;
      case "4":
        listarNombresMovimientos();
        break;
      case "5":
        buscarMovimientoPorNombre();
        break;
      case "6":
        console.log("👋 Saliendo del menú. ¡Gracias por usar la app!");
        break;
      default:
        console.log("❌ Opción inválida. Ingresa un número del 1 al 6.");
    }
  }
}

/* -----------------------------------------------
  PASO 9: Bucle para registrar movimientos
-------------------------------------------------- */
console.log("💼 Bienvenido al Control de Presupuesto Personal 💼");
console.log("--------------------------------------------------");

let continuar = "si";
while (continuar === "si") {
  registrarMovimiento();
  continuar = prompt("¿Deseas registrar otro movimiento? (si/no):").toLowerCase();
}

/* -----------------------------------------------
  PASO 10: Mostrar menú de análisis financiero
-------------------------------------------------- */
mostrarMenu();
