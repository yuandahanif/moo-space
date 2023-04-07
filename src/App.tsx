import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-red-200">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
