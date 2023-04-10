import { Link } from "wouter";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center rounded-b-lg border bg-white p-6 py-6 shadow-md">
      <div aria-label="Forum sepi, eh sapi moo . . ." className="h-10 w-10">
        <Link href="/" className="hover:cursor-pointer">
          <img
            src="/canvas.svg"
            alt="canvas logo"
            className="object-contain hover:cursor-pointer"
          />
        </Link>
      </div>

      <nav className="ml-auto">
        <ul className="flex gap-x-2">
          <li>
            <Link href="/" className="">
              Home
            </Link>
          </li>
          <li>
            <Link href="/leaderboard" className="">
              Leaderboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
