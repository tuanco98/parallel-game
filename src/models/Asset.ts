import { Double } from "bson"
import { IndexDescription } from "mongodb"


export type Asset = {
    id: number
    asset_name: string
    platform: string
    token_address?: string
    fee_brick: Double
    create_date: number
    last_update: number
    status?: number
}

export const AssetIndexes: IndexDescription[] = [
    { key: { id: 1 },unique:true },
    { key: { asset_name: 1 } },
    { key: { platform: 1 } },
    { key: { token_address: 1 } },
    { key: { fee_brick: 1 } },
    { key: { create_date: 1 } },
    { key: { status: 1 } },
]

