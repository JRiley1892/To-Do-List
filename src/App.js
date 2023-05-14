import React, { useState, useEffect } from "react";
import "./App.css";
//Importing components
import Form from "./components/Form";
import TodoList from "./components/ToDoList";

function App() {
  //State Stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //Run ONCE
  useEffect(() => {
    getLocalTodos();
  }, []);
  //Use Effect
  useEffect(() => {
    filterHandler();
    savelocalTodos();
  }, [todos, status]);

  //Functions

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const savelocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("I am Working!");
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      if (todoLocal.length === 0) {
        return null;
      }
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Your Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
