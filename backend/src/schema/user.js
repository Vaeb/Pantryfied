// CRUD
// Create
// Read
// Update
// Delete

export default `

    type User {
        id: Int!
        username: String!
        email: String!
    }

    type RegisterResponse {
        ok: Boolean!
        user: User
        errors: [Error!]
    }

    type LoginResponse {
        ok: Boolean!
        user: User
        errors: [Error!]
    }

    type Query {
        allUsers: [User!]!
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): RegisterResponse!
        login(userKey: String!, password: String!): LoginResponse!
    }

`;
