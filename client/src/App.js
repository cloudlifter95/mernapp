import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';


const TodosQuery = gql`
  {
    todos {
      id
      text
      complete
    }
  }
`;

function DisplayTodos() {


  const updateTodo = todo => {
    console.log(`update ${todo.id}`);
  };
  const removeTodo = todo => {
    console.log(`remove ${todo.id}`)
  };

  const { loading, error, data } = useQuery(TodosQuery);
  console.log(loading, data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(loading, data);
  const { todos } = data;
  // console.log(todos);
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos.map((todo) => {
        const labelId = `checkbox-list-secondary-label-${todo.id}`;
        return (
          <ListItem
            key={todo.id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => updateTodo(todo)}
                checked={todo.complete}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <DeleteIcon onClick={() => removeTodo(todo)}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemText id={labelId} primary={`${todo.text}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Paper elevation={1}>
          <DisplayTodos />
        </Paper>
      </header>
    </div>
  );
}

export default App;

