import DBConfig from "~/server/db/DB.Config";

export default class UseUser {
    public isLoggedIn = async () => {
        try {

            // const AccessToken = await db_config.get("Access-Token", true)
            const AccessToken = await IndexDBGet('config', 'Access-Token')
            // const userInfo = await db_config.get("UserInfo", false)
            const userInfo = await IndexDBGet('config', 'UserInfo')
            // userInfo === undefined || AccessToken === undefined
            if (!userInfo || !AccessToken) return false;
            else return true
        } catch (e) {
            return false
        }
    }

    public user = async () => {
        try {
          let data = await IndexDBGet('config', 'UserInfo')
            return data;
        } catch (e) {
            return false
        }
    }

}
