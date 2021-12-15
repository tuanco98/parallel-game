import { MongoClient, Db, Collection, Double, Decimal128 } from 'mongodb'
import { Asset, AssetIndexes } from './models/Asset'
import { EcosystemAssetBalance, EcosystemAssetBalanceIndexes } from './models/EcosystemAssetBalance'
import { LogUserDetail, LogUserDetailIndexes } from './models/LogUserDetail'
import { User, UserIndexes } from './models/User'
import { UserAssetBalance, UserAssetBalanceIndexes } from './models/UserAssetBalance'

let mongo: MongoClient
export let assets: Collection<Asset>
export let users: Collection<User>
export let user_asset_balances: Collection<UserAssetBalance>
export let log_user_details: Collection<LogUserDetail>
export let ecosystem_asset_balances: Collection<EcosystemAssetBalance>

const collections = {
    user_asset_balances: 'user_asset_balance',
    assets: 'asset',
    users: 'user',
    log_user_details: 'log_user_detail',
    ecosystem_asset_balances: 'ecosystem_asset_balance'
}

const connectMongo = async (MONGO_URI: string) => {
    try {
        console.log('MONGO_URI', MONGO_URI)
        
        mongo = new MongoClient(MONGO_URI)

        await mongo.connect()

        mongo.on('error', async (e) => {
            try {
                await mongo.close()
                await connectMongo(MONGO_URI)
            } catch (e) {
                setTimeout(connectMongo, 1000)
                throw e
            }
        })

        mongo.on('timeout', async () => {
            try {
                await mongo.close()
                await connectMongo(MONGO_URI)
            } catch (e) {
                setTimeout(connectMongo, 1000)
                throw e
            }
        })

        mongo.on('close', async () => {
            try {
                await connectMongo(MONGO_URI)
            } catch (e) {
                throw e
            }
        })
        const db = mongo.db()
        assets = db.collection(collections.assets)
        users = db.collection(collections.users)
        log_user_details = db.collection(collections.log_user_details)
        user_asset_balances = db.collection(collections.user_asset_balances)
        ecosystem_asset_balances = db.collection(collections.ecosystem_asset_balances)

        await Promise.all([
            assets.createIndexes(AssetIndexes),
            users.createIndexes(UserIndexes),
            log_user_details.createIndexes(LogUserDetailIndexes),
            user_asset_balances.createIndexes(UserAssetBalanceIndexes),
            ecosystem_asset_balances.createIndexes(EcosystemAssetBalanceIndexes)
        ])
        console.log(`🚀 mongodb: connected`)
    } catch (e) {
        console.error(`mongodb: disconnected`)
        await mongo?.close(true)
        setTimeout(connectMongo, 1000)
        throw e
    }
}

export { mongo, connectMongo, collections }

export const initMongo = async () => {
    try {
        const newPSAsset: Asset = {
            asset_name: "PS",
            create_date: +new Date(),
            fee_brick: new Double(0),
            id: 0,
            last_update: +new Date(),
            platform: "BSC",
            token_address: "0x00000000000000000900000000000000000"
        }
        const newEnterpriseAssetBalance: EcosystemAssetBalance = {
            asset_id: 0,
            address: "0x6Dc5D513BC36410e8878Eb08D9DC3F788286aB4d",
            balance: new Decimal128('100000000000000000000'),
            last_update: +new Date(),
            safe_percent: 0,
            sta_datetime: +new Date(),
            safe_address: [],
            total_fee_brick: new Double(0),
            total_fee_ecosystem: new Double(0),
        }
        const newUser: User = {
            id: 'tuan123',
            sta_datetime: +new Date(),
            status: 'active',
        }
        const newUserAssetBalance: UserAssetBalance = {
            user_id: 'tuan123',
            asset_id: 0,
            balance: new Decimal128('0'),
            status: '',
            sta_datetime: +new Date(),
            last_update: +new Date(),
        }
        await Promise.all([
            assets.insertOne(newPSAsset),
            ecosystem_asset_balances.insertOne(newEnterpriseAssetBalance),
            users.insertOne(newUser),
            user_asset_balances.insertOne(newUserAssetBalance)
        ])
        console.log('insert success')
    } catch (e) {
        throw e
    }
}