import axios from "axios";

export const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await axios.get("https://api.github.com/users");
        return users.data.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url
        }));
      } catch (error) {
        throw error;
      }
    },
    getNotes: async () => {
      try {
        const notes = await axios.get("http://localhost:3000/api/notes");
        return notes.data.data.map(({ _id, name, content }) => ({
          _id,
          name,
          content
        }));
      } catch (error) {
        throw error;
      }
    },
    getUser: async (_, args) => {
      try {
        const user = await axios.get(
          `https://api.github.com/users/${args.name}`
        );
        return {
          id: user.data.id,
          login: user.data.login,
          avatar_url: user.data.avatar_url
        };
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    addNote: async (_, args) => {
      try {
        const notes = await axios.post(
          "http://localhost:3000/api/notes", {
            ...args
          }
        )
        console.error('@_addNote POST', notes);
        return notes; 
      } catch (error) {
        throw error
      }
    }
  }
};