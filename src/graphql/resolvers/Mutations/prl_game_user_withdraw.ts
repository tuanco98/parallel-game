import BigNumber from "bignumber.js"
import BN from "bn.js"
import { Decimal128, Double } from "mongodb"
import { config_ENTERPRISE_ID } from "../../../config"
import { LogParamActions, LogUserDetail } from "../../../models/LogUserDetail"
import { assets, ecosystem_asset_balances, log_user_details, mongo, users, user_asset_balances } from "../../../mongodb"

type ParamType = {
    user_id: string
    asset_id: number
    amount: string
    address: string
}
export const prl_game_user_withdraw = async (parent: any, args: any): Promise<LogUserDetail> => {
    const session = mongo.startSession()
    try {
        const { user_id, asset_id, amount, address } = args as ParamType
        let newUserLog: any
        if (!user_id) throw new Error(`user_id missing`)
        if (asset_id < 0) throw new Error("asset_id must integers positive")
        if (new Decimal128(amount).valueOf() <= 0) throw new Error("amount must be greater than 0")
        if (!address) throw new Error("address missing")
        await session.withTransaction(async () => {
            const [foudUserAsset, foudAsset, foudEnterpriseAsset] = await Promise.all([
                user_asset_balances.findOne({ user_id, asset_id }),
                assets.findOne({ id: asset_id }),
                ecosystem_asset_balances.findOne({ asset_id }),
            ])
            if (!foudAsset) throw new Error("asset not exists")
            if (!foudEnterpriseAsset) throw new Error("ecosystem asset not exists")
            if (!foudUserAsset) throw new Error("user asset not exists")
            if (new BN(foudEnterpriseAsset.balance.toString()).lt(new BN(amount))) throw new Error("ecosystem asset not enough balance")
            if (new BN(foudUserAsset.balance.toString()).lt(new BN(amount))) throw new Error("user asset not enough balance")
            await Promise.all([
                user_asset_balances.updateOne(
                    { user_id, asset_id },
                    {
                        $set: {
                            balance: new Decimal128(new BN(foudUserAsset.balance.toString()).sub(new BN(amount)).toString()),
                            last_update: +new Date()
                        },
                    },
                    { session }
                ),
                ecosystem_asset_balances.updateOne(
                    { asset_id },
                    {
                        $set: {
                            balance: new Decimal128(new BN(foudEnterpriseAsset.balance.toString()).sub(new BN(amount)).toString()),
                            last_update: +new Date()
                        },
                    },
                    { session }
                ),
            ])
            newUserLog = {
                user_id,
                asset_id,
                amount: new Decimal128(amount),
                fee_ecosystem: new Decimal128("0"),
                create_date: +new Date(),
                status: 1,
                action: LogParamActions.withdraw,
            }
            await log_user_details.insertOne(newUserLog, { session })
        })
        if (!newUserLog) throw new Error("err: unexpected")
        return { ...newUserLog, amount: newUserLog.amount.toString() }
    } catch (e) {
        throw e
    }
}
