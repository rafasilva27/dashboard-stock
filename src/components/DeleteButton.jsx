import PropTypes from "prop-types";
import { useContext } from "react";
import { StockContext } from "../contexts/StockContext";
import { useNavigate } from "react-router-dom";

DeleteButton.propTypes = {
  itemId: PropTypes.number,
  itemName: PropTypes.string,
};

export default function DeleteButton({ itemId, itemName }) {
  const { deleteItem } = useContext(StockContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir o item ${itemName}?`)) {
      deleteItem(itemId);
      navigate("/items"); // redireciona para a tela de itens após a exclusão
    }
  };

  return (
    <button className="button is-danger is-small" onClick={handleDelete}>
      Excluir
    </button>
  );
}
