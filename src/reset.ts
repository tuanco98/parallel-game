import { config_MONGO_URI } from "./config";
import { assets, connectMongo, ecosystem_asset_balances, log_user_details, users, user_asset_balances } from "./mongodb";

(async() => {
    try {
        await connectMongo(config_MONGO_URI);
        await Promise.all([
            assets.deleteMany({}),
            assets.dropIndexes({}),
            users.deleteMany({}),
            users.dropIndexes({}),
            log_user_details.deleteMany({}),
            log_user_details.dropIndexes({}),
            ecosystem_asset_balances.deleteMany({}),
            ecosystem_asset_balances.dropIndexes({}),
            user_asset_balances.deleteMany({}),
            user_asset_balances.dropIndexes({}),
        ])
        console.log('🚀 clear success!')
    } catch (e) {
        throw e
    }
})()