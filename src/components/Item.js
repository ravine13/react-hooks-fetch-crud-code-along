import React, { useState } from "react";

function ItemForm({ onItemAdded }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    };

    // Send a POST request to the server with the new item data
    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Fix the content type header
      },
      body: JSON.stringify(itemData), // Pass itemData, not setItems
    })
      .then((res) => res.json())
      .then((newItem) => {
        console.log(newItem);

        // If you want to notify the parent component about the new item, call onItemAdded
        onItemAdded(newItem);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
