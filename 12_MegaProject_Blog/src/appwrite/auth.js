import conf from "../comf/comf";
import { Client,Account,ID } from "appwrite";

export class Authservice{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }
    async createaccount({email,password,name}){
        try {
             const userAccount=   await this.account.create(ID.unique(),email,password,name);
             if(userAccount){
            //call another function
            return this.login({email,password});
             }else{
                return userAccount
             }
        } catch (error) {
            throw error
        }
    }
    async login({email,password}){
        try {
            return    await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error
        }
    }
    async getCurrentuser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }
    async logout(){
        try {
         return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
}

const authservice=new Authservice();

export default authservice;