import { useContext } from "react";
import { StockContext } from "../../contexts/StockContext";
import { Link, useParams } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton";

export default function ShowItem() {
  const { getItem } = useContext(StockContext)
  const { id } = useParams() // pega o id da URL

  const item = getItem(id) // chama a função getItem passando o id como parâmetro

  return (
    <div className="item">
      <h2>{item.name}</h2>
      <div style={{ display: "flex", marginTop: "2rem" }}>
        <Link to={`/items/${id}/update`} className="button is-small">Atualizar</Link>
        <DeleteButton itemId={id} itemName={item.name}/>
      </div>
      <div className="row">
        <span>Categoria: {item.category}</span>
        <span>Quantidade: {item.quantity}</span>
        <span>Preço: {item.price}</span>
      </div>
      <p>{item.description}</p>
      <div className="row">
        <p style={{ fontSize: "1rem", color: "gray" }}>Criado em: {item.createdAt.toLocaleDateString()}</p> {/* toDateString transforma a data em string */}
        <p style={{ fontSize: "1rem", color: "gray" }}>Atualizado em: {item.updatedAt.toLocaleDateString()}</p>
      </div>
    </div>
  );
}
