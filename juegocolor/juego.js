const tamaño = 4;
const tablero = document.getElementById("tablero");

let celdas = [];
let juegoActivo = true;



function crearTablero() {

    tablero.innerHTML = "";
    celdas = [];
    juegoActivo = true;

    for (let i = 0; i < tamaño; i++) {

        celdas[i] = [];

        for (let j = 0; j < tamaño; j++) {

            let div = document.createElement("div");
            div.classList.add("casilla");

            if ((i + j) % 2 == 0) {
                div.classList.add("blanco");
            } else {
                div.classList.add("negro");
            }

            div.addEventListener("click", () => jugadorClick(i, j));

            tablero.appendChild(div);

            celdas[i][j] = div;
        }
    }

    guardarEstado(); // ← usamos JSON aquí
}



function cambiarColorAlrededor(fila, col, color) {

    for (let i = fila - 1; i <= fila + 1; i++) {

        for (let j = col - 1; j <= col + 1; j++) {

            if (i >= 0 && i < tamaño && j >= 0 && j < tamaño) {

                celdas[i][j].classList.remove("blanco");
                celdas[i][j].classList.remove("negro");

                celdas[i][j].classList.add(color);
            }
        }
    }

    guardarEstado(); // ← guardar cada cambio
}



function jugadorClick(fila, col) {

    if (!juegoActivo) return;

    cambiarColorAlrededor(fila, col, "blanco");

    if (verificarGanador()) return;

    setTimeout(turnoMaquina, 500);
}



function turnoMaquina() {

    if (!juegoActivo) return;

    let fila = Math.floor(Math.random() * tamaño);
    let col = Math.floor(Math.random() * tamaño);

    cambiarColorAlrededor(fila, col, "negro");

    verificarGanador();
}



function verificarGanador() {

    let primerColor = "";

    for (let i = 0; i < tamaño; i++) {
        for (let j = 0; j < tamaño; j++) {

            if (i == 0 && j == 0) {

                if (celdas[i][j].classList.contains("blanco")) {
                    primerColor = "blanco";
                } else {
                    primerColor = "negro";
                }

            } else {

                if (!celdas[i][j].classList.contains(primerColor)) {
                    return false;
                }

            }
        }
    }

    juegoActivo = false;

    setTimeout(() => {
        alert("GANASTE");
    }, 200);

    return true;
}



function guardarEstado() {

    let matriz = [];

    for (let i = 0; i < tamaño; i++) {

        matriz[i] = [];

        for (let j = 0; j < tamaño; j++) {

            if (celdas[i][j].classList.contains("blanco")) {
                matriz[i][j] = "blanco";
            } else {
                matriz[i][j] = "negro";
            }

        }
    }

    let json = JSON.stringify(matriz);

    console.log("Estado JSON:", json);

    localStorage.setItem("tablero", json);
}



function reiniciar() {
    crearTablero();
}


crearTablero();