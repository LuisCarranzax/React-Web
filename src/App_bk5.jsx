import React, {useState} from "react";

function App(){
  const [name, setName] = useState('');
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSumit = (event) => {
    event.preventDefault();
    alert(`Hola, ${name}!`);
  }
  return (
    <div>
      <h2>Formulario</h2>
      <form onSubmit={handleSumit}>
        <label>
          Nombre: 
          <input type="text" value={name} onChange={handleChange} />
        </label>
        <button type="submit">Enviar</button>

      </form>
    </div>
  );
}


export default App;
