import Link from "next/link";

export function Header() {
  return (
    <header className="w-full h-8 md:h-10 lg:h-12 xl:h-15 content-center bg-slate-200">
      <div className="flex justify-around">
        <Link href="/" className="text-xl font-bold">
          PersonalHub
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/notes" className="text-lg font-medium">
                Notes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
