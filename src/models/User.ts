
import { IndexDescription, IndexSpecification } from "mongodb"

export enum CustomerStatus {
    active = "active",
    inactive = "inactive"
}

export type User = {
    id: string
    sta_datetime: number
    status: string
}

export const UserIndexes: IndexDescription[] = [
    { key: { id: 1 } },
    { key: { enterprise_id: 1 } },
    { key: { id: 1, enterprise_id: 1 }, unique: true },
    { key: { sta_datetime: 1 } },
    { key: { status: 1 } },
]

