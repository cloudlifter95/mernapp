/*
*   Possible refactorization retained for informational and archival purposes
*   Use App.js not this file
*
*/


import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

// Define your gql queries and mutations

function UpdateTodo({ todo, onTodoUpdate }) {
    const [updateTodo] = useMutation(updateMutation);

    const handleUpdateTodo = async () => {
        console.log(`update ${todo.id}`);
        try {
            await updateTodo({
                variables: {
                    id: todo.id,
                    complete: !todo.complete
                }
            });
            // Call the parent component's update function
            onTodoUpdate();
        } catch (error) {
            console.error('Error updating todo:', error.message);
        }
    };

    return (
        <Checkbox
            edge="end"
            onChange={handleUpdateTodo}
            checked={todo.complete}
            inputProps={{ 'aria-labelledby': labelId }}
        />
    );
}

function DisplayTodos() {
    const { loading, error, data, refetch } = useQuery(TodosQuery);

    const handleTodoUpdate = () => {
        // Manually trigger refetch to update todo list
        refetch();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const { todos } = data;

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {todos.map((todo) => {
                const labelId = `checkbox-list-secondary-label-${todo.id}`;
                return (
                    <ListItem
                        key={todo.id}
                        secondaryAction={<UpdateTodo todo={todo} onTodoUpdate={handleTodoUpdate} />}
                        disablePadding
                    >
                        {/* Other ListItem content */}
                    </ListItem>
                );
            })}
        </List>
    );
}
