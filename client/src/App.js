import logo from './logo.svg';
import './App.css';
import { useQuery, gql, useMutation } from '@apollo/client';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Form from './Form';


const TodosQuery = gql`
  {
    todos {
      id
      text
      complete
    }
  }
`;

const updateMutation = gql`
  mutation($id: ID!, $complete: Boolean!) {
    updateTodo(id: $id, complete: $complete)
  }
`;

const removeMutation = gql`
  mutation($id: ID!) {
    removeTodo(id: $id)
  }
`;

const createMutation = gql`
  mutation($text: String!) {
    createTodo(text: $text) {
      id
      text
      complete
    }
  }
`;

function DisplayTodos() {
  const [updateTodo] = useMutation(updateMutation);
  const [removeTodo] = useMutation(removeMutation);
  const [createTodo] = useMutation(createMutation);
  
  // ******************* for displaying all  ******************* \\
  const { loading, error, data, refetch } = useQuery(TodosQuery);
  console.log(loading, data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(loading, data);
  const { todos } = data;
  // console.log(todos);
  // let test=5
    // ********************************************************* \\
    
  const UpdateTodo = async (todo, onUpdate) => {
    console.log(`update ${todo.id}`);

    try {
      await updateTodo({
        variables: {
          id: todo.id,
          complete: !todo.complete
        }
      })
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
    // console.log(test)
    onUpdate();
  };

  const RemoveTodo = async (todo, onRemove) => {
    console.log(`remove ${todo.id}`)

    try {
      await removeTodo({
        variables: {
          id: todo.id
        }
      })
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
    // console.log(test)
    onRemove();
  };

  const CreateTodo = async (text, onCreate) => {
    console.log(`create ${text}`)

    try {
      await createTodo({
        variables: {
          text: text
        }
      })
    } catch (error) {
      console.error('Error creating todo:', error.message);
    }
    // console.log(test)
    onCreate();
  };

  return (
    <>
      <Form submit={(arg1) => CreateTodo(arg1, () => refetch())} />
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {todos.map((todo) => {
          const labelId = `checkbox-list-secondary-label-${todo.id}`;
          return (
            <ListItem
              key={todo.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={() => UpdateTodo(todo, () => refetch())}
                  checked={todo.complete}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <DeleteIcon onClick={() => RemoveTodo(todo, () => refetch())}
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemText id={labelId} primary={`${todo.text}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
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

