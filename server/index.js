import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import mongoose from 'mongoose';

main().catch(err => console.log(err));

async function main() {

    // models
    const Todo = mongoose.model('Todo', {
        text: String,
        complete: Boolean
    });

    // Schemas + Resolvers
    const yoga = createYoga({
        schema: createSchema({
            typeDefs: /* GraphQL */ `
            type Query {
              hello: String,
              todos: [Todo]
            }
            type Todo {
                id: ID!
                text: String!
                complete: Boolean!
                nonexistent: String
            }
            type Mutation {
                createTodo(text: String!): Todo 
                updateTodo(id: ID!, complete: Boolean!): Boolean
                removeTodo(id: ID!): Boolean
            }
          `,
            resolvers: {
                Query: {
                    hello: () => 'Hello from Yoga!',
                    todos: () => Todo.find()
                },
                Mutation: {
                    createTodo: async (_, { text }) => {
                        const todo = new Todo({ text, complete: false });
                        await todo.save();
                        console.log(todo)
                        return todo;
                    },
                    updateTodo: async (_, { id, complete }) => {
                        await Todo.findByIdAndUpdate(id, {complete} );
                        return true;
                    },
                    removeTodo: async (_, { id }) => {
                        await Todo.findByIdAndDelete(id)
                        return true;
                    }
                }
            }
        })
    })

    // services
    await mongoose.connect('mongodb://127.0.0.1:27017/test'); // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    console.log('db connected')
    const server = createServer(yoga)

    server.listen(4000, () => {
        console.info('Server is running on http://localhost:4000/graphql')
    })
    console.log('server started')
}