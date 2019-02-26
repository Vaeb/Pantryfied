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

    query {
        allUsers: [User!]!
    }

    mutation {
        register(username: String!, email: String!, password: String!): RegisterResponse!
    }

`;
