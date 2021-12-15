import { gql } from "apollo-server";

export const typeDefs = gql`
    type UserBalanceGet {
        asset_id: Int
        balance: String
    }
    type LogUserDetail {
        user_id: String
        asset_id: Int
        amount: String
        fee_enterprise: String
        create_date: Float
        status: Float
        action: String
    }
    type Query {
        prl_game_user_balance_get(user_id: String, asset_id: Int): UserBalanceGet
        prl_game_ecosystem_asset_address_get(asset_id: Int): String
    }
    type Mutation {
        prl_game_user_withdraw(user_id: String!, asset_id: Int!, amount: String!, address: String!): LogUserDetail
        prl_game_user_deposit(user_id: String!, asset_id: Int!, amount: String!): LogUserDetail
    }
`;
