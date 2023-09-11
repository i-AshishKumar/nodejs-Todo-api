import axios from "axios";
import { useState } from "react";

const apiURL = "http://localhost:5000/api/todos";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const data = {
        title: title,
        description: description,
      };

      // Make a POST request to the API endpoint
      const response = await axios.post(apiURL, data);

      // Handle the response if needed
      console.log("Todo added:", response.data);

      // Clear the input fields
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleChange}
        />
        <button type="submit">Add task</button>
      </form>
    </>
  );
}

export default AddTodo;
