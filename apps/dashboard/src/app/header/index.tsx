export interface HeaderProps {
  name: string;
  onProductionClick: () => void;
  onSalesClick: () => void;
  onGoalsClick: () => void;
}

export default function Header({
  name,
  onProductionClick,
  onSalesClick,
  onGoalsClick,
}: HeaderProps) {
  return (
    <header className="bg-primary text-white p-4 w-full">
      <h1 className="text-2xl font-bold">Farm Management System: {name}</h1>
      <nav className="mt-2">
        <ul className="flex space-x-4">
          <li>
            <a
              onClick={onProductionClick}
              className="text-white hover:underline hover:cursor-pointer"
            >
              Production
            </a>
          </li>
          <li>
            <a
              onClick={onSalesClick}
              className="text-white hover:underline hover:cursor-pointer"
            >
              Sales
            </a>
          </li>
          <li>
            <a
              onClick={onGoalsClick}
              className="text-white hover:underline hover:cursor-pointer"
            >
              Goals
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
