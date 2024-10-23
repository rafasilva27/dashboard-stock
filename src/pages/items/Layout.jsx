import { Link, Outlet, useLocation } from "react-router-dom";

export default function ItemsLayout() {
  const { pathname } = useLocation(); // retorna o objeto do local atual, com as informações da url

  return (
    <main>
      <h1>Stock Itens</h1>
      <div className="tabs">
        <Link
          to="/items"
          className={`tab ${pathname === "/items" ? "active" : ""}`} // se pathname for igual a /items, adicionar a classe active
        >
          Todos os itens
        </Link>
        <Link 
          to="/items/new" 
          className={`tab ${pathname === "/items/new" ? "active" : ""}`}
        >
          Novo Item
        </Link>
      </div>
      <Outlet /> {/* renderiza as rotas filhas desse elemento */}
    </main>
  );
}
