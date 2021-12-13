import { gql } from "apollo-server";

export const typeDefs = gql`
    type Query {
        prl_game_user_balance_get(id: String): String
    }
    type Mutation {
        prl_game_user_withdraw: String
        prl_game_user_deposit: String
    }
`;
