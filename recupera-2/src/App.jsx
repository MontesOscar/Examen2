import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [nombres, setNombres] = useState([]);
  const [pagina, setPagina] = useState(0);

  //Va a realizar la peticion o va a obtener una vez más los pokemones segun el cambio del estado "pagina"
  useEffect(() => {
    obtener();
  }, [pagina])

  async function obtener(){
    try{
      //Realizamos la peticon con el indice de desde que pokemon se va obtener
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset='+ pagina);
      //console.log(response.data.results);
      //Guardamos la respuesta en el estado de "nombres"
      setNombres(response.data.results);     
    } catch(error) {
      //Mensaje a consola 
      console.log("No se pudo obtener los datos");
      console.log(error)
    }
  }
  return (
        <div>
          <h1>Lista de pokemones</h1>
          {/*Itera los elementos del arreglo "nombres"*/}
        {nombres.map((pokemon, index) =>
          <div key={index}>
            <h2>{pokemon.name}</h2>
          {/*Muestra la imagen de acuerdo con el indice del map, para que coincidan los nombres con los pajemones, 
          y desde que pokemon se va a realizar la vista*/}
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ ((index + 1) + (pagina)) + ".png"}/>
          </div>
        )}
        {/*Botones para el cambio de pagina, ejecuta la funcion obtener y cambia el valor del estado "pagina" y altermos el valor del indice
        del map para que tambien cambie la imagen de acuerdo al pojemon*/}
        <button onClick={() => {
            setPagina(pagina - 10);
            obtener();   
        }}>Anterior</button>
        <button onClick={() => {
            setPagina(pagina + 10);
            obtener();  
            (index + 10);        
        }}>Siguiente</button>
      </div>
  )
}
export default App