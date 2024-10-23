import { useContext } from "react";
import ItemForm from "../../components/ItemForm";
import { StockContext } from "../../contexts/StockContext";
import { useParams } from "react-router-dom";

export default function UpdateItem() {
  const { getItem } = useContext(StockContext)
  const { id } = useParams()
  const item = getItem(id)

    return (
      <>
        <h2>Atualizar Item</h2>
        <ItemForm itemToUpdate={item}/>
      </>
    );
  }
  