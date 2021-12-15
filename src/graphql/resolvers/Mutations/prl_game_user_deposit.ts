import { Decimal128, Double } from "mongodb"
import { LogParamActions, LogUserDetail } from "../../../models/LogUserDetail"
import { assets, ecosystem_asset_balances, log_user_details, mongo, users, user_asset_balances } from "../../../mongodb"

type ParamType = {
    user_id: string
    asset_id: number
    amount: string
}
export const prl_game_user_deposit = async (parent: any, args: any) => {
    const session = mongo.startSession()
    try {
        const { user_id, asset_id, amount } = args as ParamType
        if (!user_id) throw new Error("user_id missing")
        if (asset_id < 0) throw new Error("asset_id must integers positive")
        if (new Decimal128(amount).valueOf() < 0) throw new Error("amount must be greater than 0")
        let newUserLog: any
        await session.withTransaction(async () => {
            const foudAsset = await assets.findOne({ id: asset_id })
            const findUserAsset = await user_asset_balances.findOne({ user_id, asset_id })
            if (!foudAsset) throw new Error("asset not support")
            if (!findUserAsset) {
                await Promise.all([
                    users.insertOne({ id: user_id, sta_datetime: +new Date(), status: "active" }, { session }),
                    user_asset_balances.insertOne(
                        { user_id, asset_id, balance: new Decimal128(amount), sta_datetime: +new Date(), status: "", last_update: +new Date() },
                        { session }
                    ),
                ])
            } else {
                await user_asset_balances.updateOne({ user_id, asset_id }, { $inc: { balance: new Decimal128(amount)} }, { session })
            }
            await ecosystem_asset_balances.updateOne({ asset_id }, { $inc: { balance: new Decimal128(amount) }, $set: { last_update: +new Date() } }, { session })
            newUserLog = {
                user_id,
                asset_id,
                fee_ecosystem: new Decimal128('0'),
                amount: new Decimal128(amount.toString()),
                create_date: +new Date(),
                status: 1,
                action: LogParamActions.deposit,
            }
            await log_user_details.insertOne(newUserLog, { session })
        })
        return {...newUserLog, amount: newUserLog.amount.toString()}
    } catch (e) {
        throw e
    }
}
