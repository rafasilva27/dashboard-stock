import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const StockContext = createContext({})

StockContextProvider.propTypes = {
    children: PropTypes.node
}

// Cada item tem as propriedades: name, description, quantity, price, category, createdAt, updatedAt
export function StockContextProvider({ children }) {

    const [items, setItems] = useState(() => {
        const storedItens = localStorage.getItem("obc-react-stock")
        if (!storedItens) return []
        const items = JSON.parse(storedItens) // transforma o JSON em um objeto
        items.forEach((item) => {
            item.createdAt = new Date(item.createdAt) // converte a string em uma data
            item.updatedAt = new Date(item.updatedAt)        
        })
        return items
    })

    const addItem = (item) => {
        setItems(currentState => {
            const updatedItems = [item, ...currentState] // atualiza o estado com o novo item no inicio da lista
            localStorage.setItem("obc-react-stock", JSON.stringify(updatedItems)) // salva a lista atualizada no localStorage
            return updatedItems // retorna a lista do estado atualizada
        })
    }

    const getItem = (itemId) => {
        return items.find(item => item.id === +itemId) // retorna o item com o id passado
    }

    const deleteItem = (itemId) => {
        setItems(currentState => {
            const updatedItems = currentState.filter(item => item.id !== itemId) // cria uma nova lista com os mesmos itens, exceto o item com o id passado
            localStorage.setItem("obc-react-stock", JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const updateItem = (itemId, newAttributes) => {
        setItems(currentState => {
            const itemIndex = currentState.findIndex(item => item.id === +itemId)
            const updatedItems = [...currentState] // cria uma nova lista com os mesmos itens
            Object.assign(updatedItems[itemIndex], newAttributes, { updatedAt: new Date() }) // atualiza o item e a data com o id passado com os novos atributos
            localStorage.setItem("obc-react-stock", JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const stock = {
        items,
        addItem,
        getItem,
        updateItem,
        deleteItem
    } // que serão o value do provider 

    return (
        <StockContext.Provider value={ stock }> {/* o stock vai ser passado para os componentes filhos */}
            {children}
        </StockContext.Provider>
    )
}