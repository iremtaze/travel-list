import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats.js";
import Item from "./Item";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    // Check if the item with the same description exists in the list
    const existingItem = items.find(
      (existingItem) => existingItem.description === item.description
    );

    if (existingItem) {
      // If the item exists, update the quantity
      const updatedItems = items.map((existingItem) =>
        existingItem.description === item.description
          ? { ...existingItem, quantity: existingItem.quantity + item.quantity }
          : existingItem
      );
      setItems(updatedItems);
    } else {
      // If the item does not exist, add it to the list
      setItems((items) => [...items, item]);
    }
  }

  // ...other functions and components...

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteAllItems() {
    const confirmed = window.confirm("Are you sure to delete all the items? ");
    if (confirmed) setItems([]);
    else setItems(items);
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onDeleteAllItems={handleDeleteAllItems}
      />
      <Stats items={items} />
    </div>
  );
}
