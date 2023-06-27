import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/logosimpson.png";
import { Button, Container, Spinner } from "react-bootstrap";
import Frase from "./components/Frase";
import { useState, useEffect } from "react";



function App() {
  const [personaje, setPersonaje] = useState({});
  const [mostrarSpinner, setMostrarSpinner] = useState(true)

  useEffect(() => {
    consualtarAPI();
  }, [])

  const consualtarAPI = async () => {
    try {
      setMostrarSpinner(true)
      //peticion get solo devuelve datos
      const respuesta = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
      const dato = await respuesta.json();
      console.log(respuesta);
      console.log(dato[0]);
      setPersonaje(dato[0]);
      setMostrarSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };

  const componenteRenderizado = (mostrarSpinner === true) ? (<div className="my-5">
    <Spinner animation="border" variant="primary" />
  </div>) : <Frase personaje={personaje} />

  return (
    <>
      <Container className="text-center my-5">
        <img src={logo} alt="Logo de los simpson" className="w-50" />
      {componenteRenderizado}

        <Button variant="warning" onClick={consualtarAPI}>Obtener frase</Button>
      </Container>
    </>
  );
}

export default App;