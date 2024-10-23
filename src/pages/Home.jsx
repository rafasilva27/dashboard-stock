import { useContext } from "react";
import { Link } from "react-router-dom";
import { StockContext } from "../contexts/StockContext";

export default function Home() {
  const { items } = useContext(StockContext);

  const totalItems = items.length;

  const totalStock = items.reduce((sum, item) => sum + item.quantity, 0);

  const today = new Date();

  const limitData = today.setDate(today.getDate() - 10); 

  const recentItems = items.filter(
    (item) => item.createdAt >= limitData && item.createdAt <= today
  ); // filtra os itens criados nos últimos 10 dias

  const recentTotal = recentItems.length;

  const lowQuantityItems = items.filter((item) => item.quantity < 10);

  const lowQuantityTotal = lowQuantityItems.length;

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="dashboard-card">
          Itens
          <span>{totalItems}</span>
        </div>
        <div className="dashboard-card">
          Total do estoque
          <span>{totalStock}</span>
        </div>
        <div className="dashboard-card">
          Itens recentes
          <span>{recentTotal}</span>
        </div>
        <div className="dashboard-card">
          Itens com menos de 10 unidades
          <span>{lowQuantityTotal}</span>
        </div>
      </div>

      <div className="row">
        <div className="recent">
          <table>
            <thead>
              <tr>
                <th>Itens Recentes</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <Link to={`/items/${item.id}`} className="button is-small">
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row">
          <table>
            <thead>
              <tr>
                <th>Itens acabando</th>
                <th>Qtd.</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lowQuantityItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Link to={`/items/${item.id}`} className="button is-small">
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
