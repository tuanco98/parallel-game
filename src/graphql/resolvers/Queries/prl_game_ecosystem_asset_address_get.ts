import { Double } from "mongodb"
import { EcosystemAssetBalance } from "../../../models/EcosystemAssetBalance"
import { ecosystem_asset_balances, users, user_asset_balances } from "../../../mongodb"

type ParamType = {
    asset_id: number,
}
export const prl_game_ecosystem_asset_address_get = async (parent: any, args: any) => {
    try {
        const { asset_id } = args as ParamType
        const  foundaddress  = await ecosystem_asset_balances.findOne({asset_id})
        if (!foundaddress) throw new Error('asset balance not exists')
        const {address} = foundaddress
        return address
    } catch (e) {
        throw e
    }
}