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
        const items = JSON.parse(storedItens) 
        items.forEach((item) => {
            item.createdAt = new Date(item.createdAt) 
            item.updatedAt = new Date(item.updatedAt)        
        })
        return items
    })

    const addItem = (item) => {
        setItems(currentState => {
            const updatedItems = [item, ...currentState] 
            localStorage.setItem("obc-react-stock", JSON.stringify(updatedItems)) 
            return updatedItems
        })
    }

    const getItem = (itemId) => {
        return items.find(item => item.id === +itemId) 
    }

    const deleteItem = (itemId) => {
        setItems(currentState => {
            const updatedItems = currentState.filter(item => item.id !== itemId) 
            localStorage.setItem("obc-react-stock", JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const updateItem = (itemId, newAttributes) => {
        setItems(currentState => {
            const itemIndex = currentState.findIndex(item => item.id === +itemId)
            const updatedItems = [...currentState]
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
    }

    return (
        <StockContext.Provider value={ stock }> 
            {children}
        </StockContext.Provider>
    )
}