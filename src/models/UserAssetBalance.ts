
import { Decimal128, Double, IndexDescription } from "mongodb"

export type UserAssetBalance = {
    user_id: string
    asset_id: number
    user_address?: string
    sta_datetime: number
    balance: Decimal128
    last_update: number
    status: string
}

export const UserAssetBalanceIndexes: IndexDescription[] = [
    { key: { user_id: 1 } },
    { key: { asset_id: 1 } },
    { key: { user_id: 1, asset_id: 1 }, unique: true },
    { key: { customer_address: 1 } },
    { key: { sta_datetime: 1 } },
    { key: { balance: 1 } },
    { key: { status: 1 } },
]