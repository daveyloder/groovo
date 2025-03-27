import { useState } from "react";
import NavbarComponent from "./components/navbar/NavbarComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarComponent />

      <div>
        <h1>Welcome to Groovo!</h1>
      </div>
    </>
  );
}

export default App;
