
import { Double, IndexDescription, IndexSpecification } from "mongodb"

export type EnterpriseAssetBalance = {
    enterprise_id: string
    asset_id: number
    enterprise_address?: string
    encrypt_private_key?: {
        iv: string,
        encrypted: string,
    }
    safe_percent?: number
    safe_address?: string[]
    sta_datetime: Date
    balance: Double
    total_fee_enterprise: Double
    total_fee_brick: Double
    last_update: Date
}

export const EnterpriseAssetBalanceIndexes: IndexDescription[] = [
    { key: { enterprise_id: 1, asset_id: 1, enterprise_address: 1 }, unique: true },
    { key: { enterprise_id: 1 } },
    { key: { asset_id: 1 } },
    { key: { enterprise_address: 1 } },
    { key: { sta_datetime: 1 } },
    { key: { balance: 1 } },
    { key: { total_fee_enterprise: 1 } },
    { key: { total_fee_brick: 1 } },
    { key: { last_update: 1 } },
    { key: { isAvailable: 1 } },
]

