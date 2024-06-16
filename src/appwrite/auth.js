import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client()
    account 

    constructor (){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email , password , name}){
        try {
            const userAccount = await this.account.create(ID.unique()  , email , password , name)
            if (userAccount) {
                // call another method
                this.login(email , password) 
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email , password}){
        try {
            return this.account.createEmailPasswordSession(email , password)
        } catch (error) {
            throw error
        }
    }

    async currentAccountStatus (){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Error at appwrite current Account status::",error);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Error at appwrite Logout::",error);
        }
    }
}

const authService = new AuthService

export default authService
