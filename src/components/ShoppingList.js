import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/items")
    .then((resp)=>resp.json())
    .then((items)=> setItems(items))
  }, [])

  //callback fn to update add to cart items
  function handleUpdateitem(updatedItem){
    const updatedItems = items.map((item)=>{
      if (item.id === updatedItem.id){
        return updatedItem;
      }else {
        return item;
      }
    })
    setItems( updatedItems)
  }

  // callback fn to add new item
  function handleAddNewItem(newItem){
    setItems([...items, newItem])
  }

  // callback fn to delete items
  function handleDeleteItem(deletedItem){
    const updatedItems = items.filter((item)=> item.id !== deletedItem.id)
    setItems(updatedItems);
  }


  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddNewItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateitem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
