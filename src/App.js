import { useState } from "react";



export default function App() {
  const [items, setItems] = useState([])

  function handleAddItems(item) {
    setItems((items) => [...items, item])
    // console.log(items)
    // console.log(item)
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  function handleTogleItem(id) {
    setItems(items => items.map(item => item.id === id ?
      { ...item, packed: !item.packed } : item))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleTogleItem} />
      <Stats items={items} />
    </div>
  )
}


function Logo() {
  return (
    <h1>🌴Far Away 🧳</h1>
  )
}

function Form({ onAddItems }) {

  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)


  function handleSubmit(e) {
    e.preventDefault()

    if (!description) return;

    const newItem = {
      description,
      quantity,
      package: false,
      id: Date.now()
    }
    console.log(newItem)


    onAddItems(newItem)

    setDescription("")
    setQuantity(0)

  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select value={quantity} onChange={(e) =>
        setQuantity(Number(e.target.value))} >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(
          num =>
            <option value={num} key={num}>
              {num}</option>
        )} </select>
      <input type="text" placeholder="Item..." value={description}
        onChange={(e) => (setDescription(e.target.value))} />
      <button>Add</button>
    </form>
  )
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((el) => (<Item item={el}
          onDeleteItem={onDeleteItem}
          onToggleItem={onToggleItem}
          key={el.id} />))}
      </ul>
    </div>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description} </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>

  )
}

function Stats({ items }) {
  if (!items.length) return (
    <p className="stats">
      <em>
        Start adding some items to yourpacking list
      </em>
    </p>
  )
  const numItems = items.length
  const numPacked = items.filter(item => item.packed).length
  const pourcentage = Math.round((numPacked / numItems) * 100)
  return (
    <footer className="stats">
      <em>
        {pourcentage === 100 ? 'Vous avez compris, Pret a partit ✈ ' :
          `🧳 You have ${numItems} items on your list, and you already packed
        ${numPacked} (${pourcentage} %)`
        }
      </em>
    </footer>
  )
}