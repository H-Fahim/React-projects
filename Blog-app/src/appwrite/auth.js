import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)

const account = new Account(client)

const authService = {
    account,

    async createAccount({email, password, name}){

        try {
            const userAccount = await account.create(ID.unique(),email, password, name)
            
            if (userAccount){
                return this.login({email, password})
            }else{
                return userAccount
            }

        } catch (error) {
            console.log("appwrith service createAccount() in auth.js",error);
            throw error;
        }
    },

    async login({email, password}){

        try {
            return await account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("appwrith service login() in auth.js",error);
            throw error;
        }
    },

    async getCurrentUser(){
        try {
            return await account.get()
            
        } catch (error) {
            console.log("appwrith service getCurrentUser() in auth.js",error);
            throw error;
            
        }
    },
    
    async logout(){
        try {
            await this.account.deleteSession("current")
            
        } catch (error) {
            console.log("appwrith service logout() in auth.js",error);
            throw error;
        }
    },
};

export default authService