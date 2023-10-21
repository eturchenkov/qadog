import "./App.css";
import AddTodo from "./Components/AddTodo";
import TodoList from "./Components/TodoList";
import Filters from "./Components/Filters";
import NavBar from "./Components/NavBar";
import { Container } from "@material-ui/core";

function App() {

  return (

    < Container maxWidth="sm" >
      <NavBar></NavBar>
      <AddTodo />
      <TodoList />
      <Filters />
    </Container >
  );
}

export default App;
