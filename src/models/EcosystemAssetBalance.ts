
import { Decimal128, Double, IndexDescription } from "mongodb"

export type EcosystemAssetBalance = {
    asset_id: number
    address?: string
    encrypt_private_key?: {
        iv: string,
        encrypted: string,
    }
    safe_percent?: number
    safe_address?: string[]
    sta_datetime: number
    balance: Decimal128
    total_fee_ecosystem: Double
    total_fee_brick: Double
    last_update: number
}

export const EcosystemAssetBalanceIndexes: IndexDescription[] = [
    { key: { asset_id: 1, address: 1 }, unique: true },
    { key: { asset_id: 1 } },
    { key: { address: 1 } },
    { key: { sta_datetime: 1 } },
    { key: { balance: 1 } },
    { key: { total_fee_ecosystem: 1 } },
    { key: { total_fee_brick: 1 } },
    { key: { last_update: 1 } },
    { key: { isAvailable: 1 } },
]

