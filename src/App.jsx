import { useState } from "react";
import NavBar from "./components/navbar/NavbarComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <div>
        <h1>Hi!</h1>
      </div>
    </>
  );
}

export default App;
