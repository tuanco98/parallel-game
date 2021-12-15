
import { Decimal128, Double, IndexDescription, IndexSpecification } from "mongodb"

export enum LogParamActions {
    internal_transfer = "internal_transfer",
    external_transfer = "internal_transfer",
    exchange = "exchange",
    withdraw = "withdraw",
    deposit = "deposit",
}

export const LogCustomerListAction = {
    deposit_when_asset_inactive: "deposit_when_asset_inactive"
}

export type LogUserDetail = {
    user_id?: string
    asset_id: number
    amount: Decimal128
    fee_ecosystem?: Decimal128
    create_date: number
    status?: number
    action?: string | LogParamActions
}

export const LogUserDetailIndexes: IndexDescription[] = [
    { key: { user_id: 1 } },
    { key: { asset_id: 1 } },
    { key: { amount: 1 } },
    { key: { fee_ecosystem: 1 } },
    { key: { txid: 1 } },
    { key: { create_date: 1 } },
    { key: { status: 1 } },
    { key: { action: 1 } },
]

