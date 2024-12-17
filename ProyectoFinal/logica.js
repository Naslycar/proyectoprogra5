// Simulación de variables (en lugar de sesión)
function cargarResumen() {
    const datosReserva = JSON.parse(localStorage.getItem("datosReserva"));

    if (!datosReserva) {
        alert("No hay datos disponibles. Por favor complete el Paso 2.");
        window.location.href = "reserva_paso2.html";
        return;
    }

    const { nombre, pasaporte, telefono, email, fecha, tiquetes, ninos, clase, destino } = datosReserva;
    const tarifaBase = obtenerTarifaBase(destino);
    const temporada = obtenerTemporada(fecha);
    const temporadaExtra = calcularTemporadaExtra(temporada);
    const claseExtra = calcularClaseExtra(clase);

    const tarifaAdulto = tarifaBase * temporadaExtra * claseExtra;
    const tarifaNino = tarifaAdulto * 0.4;
    const total = (tarifaAdulto * tiquetes) + (tarifaNino * ninos);

    // Actualizar los campos del formulario
    document.getElementById("nombre").value = nombre;
    document.getElementById("cedula").value = pasaporte;
    document.getElementById("telefono").value = telefono;
    document.getElementById("email").value = email;
    document.getElementById("fecha").value = fecha;
    document.getElementById("temporada").value = temporada;
    document.getElementById("adultos").value = tiquetes;
    document.getElementById("ninos").value = ninos;
    document.getElementById("clase").value = clase;
    document.getElementById("tarifa_adulto").value = tarifaAdulto.toFixed(2);
    document.getElementById("monto_adulto").value = tarifaAdulto.toFixed(2);
    document.getElementById("monto_nino").value = tarifaNino.toFixed(2);
    document.getElementById("total").value = total.toFixed(2);
}

function obtenerTarifaBase(destino) {
    const tarifas = { "Perú": 500, "USA": 250, "España": 1000, "Panamá": 300, "Guatemala": 400 };
    return tarifas[destino];
}

function obtenerTemporada(fecha) {
    const mes = new Date(fecha).getMonth() + 1;
    if ([1, 2, 3].includes(mes)) return "Alta";
    if ([7, 12].includes(mes)) return "Especial";
    return "Baja";
}

function calcularTemporadaExtra(temporada) {
    return temporada === "Alta" ? 1.35 : temporada === "Especial" ? 1.2 : 1.0;
}

function calcularClaseExtra(clase) {
    return clase === "Empresarial" ? 1.2 : clase === "Primera Clase" ? 1.45 : 1.0;
}

function finalizarReserva() {
    alert("Reserva finalizada correctamente. Gracias por su compra.");
    document.getElementById("informacion").style.display = "block";
    localStorage.clear();
}

cargarResumen();

