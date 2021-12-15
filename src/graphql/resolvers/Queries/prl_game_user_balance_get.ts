import { Double } from "mongodb"
import { users, user_asset_balances } from "../../../mongodb"

type ParamType = {
    user_id: string,
    asset_id: number,
}
type ResultType = {
    asset_id: number,
    balance: string,
}
export const prl_game_user_balance_get = async (parent: any, args: any): Promise<ResultType> => {
    try {
        const { user_id, asset_id } = args as ParamType
        const result = await user_asset_balances.findOne({ user_id, asset_id })
        if (!result) throw new Error(`user asset not exists`)
        return {...result, balance:result.balance.toString()}
    } catch (e) {
        throw e
    }
}