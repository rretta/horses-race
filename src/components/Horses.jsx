import { useState, useEffect } from "react";
import "./CarreraDeCaballos.css";
import Modal from "react-modal";
import Confetti from "react-confetti";

const CarreraDeCaballos = () => {
  const [cartaActual, setCartaActual] = useState(null);
  const [posiciones, setPosiciones] = useState([0, 0, 0, 0]);
  const [ganador, setGanador] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarConfeti, setMostrarConfeti] = useState(false);

  const [mazo, setMazo] = useState([
    "1 de Espadas",
    "2 de Espadas",
    "3 de Espadas",
    "4 de Espadas",
    "5 de Espadas",
    "6 de Espadas",
    "7 de Espadas",
    "8 de Espadas",
    "9 de Espadas",
    "10 de Espadas",
    "12 de Espadas",
    "1 de Bastos",
    "2 de Bastos",
    "3 de Bastos",
    "4 de Bastos",
    "5 de Bastos",
    "6 de Bastos",
    "7 de Bastos",
    "8 de Bastos",
    "9 de Bastos",
    "10 de Bastos",
    "12 de Bastos",
    "1 de Copas",
    "2 de Copas",
    "3 de Copas",
    "4 de Copas",
    "5 de Copas",
    "6 de Copas",
    "7 de Copas",
    "8 de Copas",
    "9 de Copas",
    "10 de Copas",
    "12 de Copas",
    "1 de Oros",
    "2 de Oros",
    "3 de Oros",
    "4 de Oros",
    "5 de Oros",
    "6 de Oros",
    "7 de Oros",
    "8 de Oros",
    "9 de Oros",
    "10 de Oros",
    "12 de Oros",
  ]);

  const palos = ["Espadas", "Bastos", "Copas", "Oros"];
  const lineaDePartida = [0, 150, 300, 450]; // Posiciones iniciales de los caballos
  const lineaDeMeta = 10; // Casilleros para alcanzar la meta

  useEffect(() => {
    const paloGanador = posiciones.findIndex(
      (posicion) => posicion >= lineaDeMeta
    );
    if (paloGanador !== -1) {
      setGanador(palos[paloGanador]);
      setMostrarConfeti(true);
      setMostrarModal(true);
    }
  }, [posiciones]);

  const darVueltaCarta = () => {
    if (ganador) {
      reiniciarJuego();
      return;
    }

    const nuevaCartaIndex = Math.floor(Math.random() * mazo.length);
    const nuevaCarta = mazo[nuevaCartaIndex];
    setCartaActual(nuevaCarta);

    const palo = obtenerPalo(nuevaCarta);
    const nuevaPosiciones = posiciones.map((posicion, index) =>
      index === palo ? posicion + 1 : posicion
    );
    setPosiciones(nuevaPosiciones);

    const nuevoMazo = mazo.filter((carta, index) => index !== nuevaCartaIndex);
    setMazo(nuevoMazo);
  };

  const obtenerPalo = (carta) => {
    const paloCarta = carta.split(" ")[2];
    return palos.findIndex((palo) => palo === paloCarta);
  };

  const renderCaballos = () => {
    const nombresCaballos = ["11 🗡️", "11 🥦", "11 ⚱️", "11 🌞"];

    return posiciones.map((posicion, index) => (
      <div
        key={index}
        className={`caballo caballo-todos`}
        style={{
          left: `${lineaDePartida[index]}px`,
          top: `${posicion * 50}px`,
        }}
      >
        {nombresCaballos[index]}
      </div>
    ));
  };

  const reiniciarJuego = () => {
    setCartaActual(null);
    setPosiciones([0, 0, 0, 0]);
    setGanador(null);
    setMazo([
      "1 de Espadas",
      "2 de Espadas",
      "3 de Espadas",
      "4 de Espadas",
      "5 de Espadas",
      "6 de Espadas",
      "7 de Espadas",
      "8 de Espadas",
      "9 de Espadas",
      "10 de Espadas",
      "12 de Espadas",
      "1 de Bastos",
      "2 de Bastos",
      "3 de Bastos",
      "4 de Bastos",
      "5 de Bastos",
      "6 de Bastos",
      "7 de Bastos",
      "8 de Bastos",
      "9 de Bastos",
      "10 de Bastos",
      "12 de Bastos",
      "1 de Copas",
      "2 de Copas",
      "3 de Copas",
      "4 de Copas",
      "5 de Copas",
      "6 de Copas",
      "7 de Copas",
      "8 de Copas",
      "9 de Copas",
      "10 de Copas",
      "12 de Copas",
      "1 de Oros",
      "2 de Oros",
      "3 de Oros",
      "4 de Oros",
      "5 de Oros",
      "6 de Oros",
      "7 de Oros",
      "8 de Oros",
      "9 de Oros",
      "10 de Oros",
      "12 de Oros",
    ]);
    setMostrarModal(false);
    setMostrarConfeti(false);
  };

  return (
    <>
      <div className="carrera-de-caballos">
        <div className="carta-actual">
          {cartaActual !== null && (
            <div className={`carta carta-${obtenerPalo(cartaActual)}`}>
              <div className="carta-valor">{cartaActual.split(" ")[0]}</div>
              <div className="carta-simbolo">
                {obtenerPalo(cartaActual) === 0 && "🗡️"}
                {obtenerPalo(cartaActual) === 1 && "🥦"}
                {obtenerPalo(cartaActual) === 2 && "⚱️"}
                {obtenerPalo(cartaActual) === 3 && "🌞"}
              </div>
            </div>
          )}
        </div>
        <button onClick={darVueltaCarta}>
          {ganador ? "Reiniciar" : "Dar Vuelta"}
        </button>
        <div className="pista"></div>
        {renderCaballos()}
        {mostrarModal && (
          <Modal
            isOpen={true}
            onRequestClose={() => setMostrarModal(false)}
            contentLabel="Ganador"
            overlayClassName="overlay"
            style={{
              content: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "300px",
                maxHeight: "300px",
                margin: "auto",
                backgroundColor: "#fff",
                borderRadius: "10px",
                color: "black",
                padding: "20px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              },
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <h3>
              {ganador === "Espadas" && "GANÓ ESPADA 🗡️"}
              {ganador === "Bastos" && "GANÓ BASTO 🥦"}
              {ganador === "Copas" && "GANÓ COPA ⚱️"}
              {ganador === "Oros" && "GANÓ ORO 🌞"}
            </h3>

            <button onClick={darVueltaCarta}>
              {ganador ? "Reiniciar" : "Dar Vuelta"}
            </button>
          </Modal>
        )}
        {mostrarConfeti && <Confetti />}
      </div>
      <footer className="footer">
        Creado con{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>{"🤍"}</span> por{" "}
        <a href="https://github.com/rretta">rretta</a>
      </footer>
    </>
  );
};

export default CarreraDeCaballos;
