import { Client, Account, ID } from "appwrite"
import env_config from "../env_config/env_config";
export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(env_config.appwriteUrl)
            .setProject(env_config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async CreateAcount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // TODO call another method
                return this.Login({ email, password })
            } else {
                return null
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async Login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async Logout() {
        try {
            return await this.account.deleteSession("current")
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async GetCurrentUser() {
        try {
            const currentUser = await this.account.get();
            console.log(currentUser);
            return currentUser
        } catch (error) {
            console.log("error");
            console.error("Appwrite service :: GetCurrentUser :: ", error);
        }
        return false
    }
}
const authService = new AuthService();
export default authService;