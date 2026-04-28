import React, {useState} from "react";



function App(){
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  }
  return (
    <div className="App">
      <h1>Contador: {count}</h1>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}


export default App
