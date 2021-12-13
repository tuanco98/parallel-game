import { prl_game_user_deposit } from "./Mutations/prl_game_user_deposit";
import { prl_game_user_withdraw } from "./Mutations/prl_game_user_withdraw";
import { prl_game_user_balance_get } from "./Queries/prl_game_user_balance_get";

const resolvers = {
    Query: {
        prl_game_user_withdraw,
        prl_game_user_deposit
    },
    Mutation: {
        prl_game_user_balance_get
    }
};
export { resolvers };
