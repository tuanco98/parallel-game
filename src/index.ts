import { config_MONGO_URI } from "./config";
import { initGraphQLServer } from "./graphql";
import { connectMongo, initMongo } from "./mongodb";

(async () => {
    try {
        // await initSentry();
        Promise.all([
            await connectMongo(config_MONGO_URI),
            await initGraphQLServer(),
        ])
        // await initMongo()
    } catch (e) {
        throw e
    }
})();