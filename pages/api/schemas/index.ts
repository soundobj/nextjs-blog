import  {  gql  }  from  "apollo-server-micro"; 

export  const  typeDefs  =  gql`
    type  User {
        id: ID
        login: String
        avatar_url: String
    }

    type Note {
       _id: ID
       name: String
       content: String 
    }

    type  Query {
        getNotes: [Note]
        getUsers: [User]
        getUser(name: String!): User!
    }`