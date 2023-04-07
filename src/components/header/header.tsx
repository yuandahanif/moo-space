import { Link } from "wouter";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex rounded-b-lg border bg-white p-6 py-6 shadow-md items-center">
      <div aria-label="Forum sepi, eh sapi moo . . ." className="w-10 h-10">
        <img src="/canvas.svg" alt="canvas logo" className="object-contain" />
      </div>

      <nav className="ml-auto">
        <ul className="flex gap-x-2">
          <li>
            <Link href="/" className="active">
              Home
            </Link>
          </li>
          <li>
            <Link href="/leaderboard" className="active">
              Leaderboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
