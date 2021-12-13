import { MongoClient, Db, Collection, Double } from 'mongodb'
import { Asset, AssetIndexes } from './models/Asset'
import { EnterpriseAssetBalance, EnterpriseAssetBalanceIndexes } from './models/EnterpriseAssetBalance'
import { UserAssetBalance, UserAssetBalanceIndexes } from './models/UserAssetBalance'

let mongo: MongoClient
export let assets: Collection<Asset>
export let user_asset_balances: Collection<UserAssetBalance>
export let enterprise_asset_balances: Collection<EnterpriseAssetBalance>

const collections = {
    user_asset_balances: 'user_asset_balance',
    assets: 'asset',
    enterprise_asset_balances: 'enterprise_asset_balance'
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
        user_asset_balances = db.collection(collections.user_asset_balances)
        enterprise_asset_balances = db.collection(collections.enterprise_asset_balances)

        await Promise.all([
            assets.createIndexes(AssetIndexes),
            user_asset_balances.createIndexes(UserAssetBalanceIndexes),
            enterprise_asset_balances.createIndexes(EnterpriseAssetBalanceIndexes)
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
        const newUsdtAsset: Asset = {
            asset_name: "PS",
            create_date: new Date(),
            fee_brick: new Double(0),
            id: 0,
            last_update: new Date(),
            platform: "BSC",
            token_address: "0x00000000000000000900000000000000000"
        }
        const newEnterpriseAssetBalance: EnterpriseAssetBalance = {
            asset_id: 0,
            enterprise_address: "0x6Dc5D513BC36410e8878Eb08D9DC3F788286aB4d",
            balance: new Double(9000000000000000000000),
            enterprise_id: "the_parallel",
            last_update: new Date(),
            safe_percent: 0,
            sta_datetime: new Date(),
            safe_address: [],
            total_fee_brick: new Double(0),
            total_fee_enterprise: new Double(0),
        }
        const newUserAssetBalance: UserAssetBalance = {
            user_id: 'tuanco',
            asset_id: 0,
            balance: new Double(0),
            status: '',
            sta_datetime: +new Date(),
            last_update: +new Date(),
        }
        await assets.insertOne(newUsdtAsset)
        await enterprise_asset_balances.insertMany([newEnterpriseAssetBalance])

    } catch (e) {
        throw e
    }
}