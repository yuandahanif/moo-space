import MainLayout from "@layouts/main.layout";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MainLayout>
      <header className="sticky top-0 flex rounded-b-md bg-white p-4 shadow-md">
        <span>MooForum</span>

        <nav className="ml-auto">
          <ul>
            <li>Home</li>
            <li>Thread</li>
            <li>Leaderboard</li>
          </ul>
        </nav>
      </header>
      <div className=""></div>
    </MainLayout>
  );
}

export default App;
