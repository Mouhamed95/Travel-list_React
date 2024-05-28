import { useState } from "react";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Form from "./Form";
import Stats from "./Stats";


export default function App() {
  const [items, setItems] = useState([])

  function handleAddItems(item) {
    setItems((items) => [...items, item])
    console.log(items)
    console.log(item)
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  function handleTogleItem(id) {
    setItems(items => items.map(item => item.id === id ?
      { ...item, packed: !item.packed } : item))
  }

  function handleClearList() {
    const confirm = window.confirm('Etes vous sur de supprimer cette liste')

    if (confirm) setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem}
        onToggleItem={handleTogleItem}
        oneClearList={handleClearList}
      />
      <Stats items={items} />

    </div>
  )
}


