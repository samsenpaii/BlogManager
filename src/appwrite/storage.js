import conf from "../conf/conf.js";
import { Client, Account, ID, Databases, Storage, ImageFormat } from "appwrite";

class StorageService{
    client = new Client()
    databses;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databses = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost ({title , slug , content , featuredImage , status , userId}){
        try {
            return await this.databses.createDocument(conf.appwriteDatabseId ,conf.appwriteCollectionId , slug , 
                {title , content , featuredImage ,status ,userId})
        } catch (error) {
            console.log("Error at the appwrite create post ::",error);
        }
    }

    async updatePost(slug , {title  , content , featuredImage , status }){
        try {
            return await this.databses.updateDocument(conf.appwriteDatabseId ,conf.appwriteCollectionId , slug , 
                {title , content , featuredImage , status});
        } catch (error) {
            console.log("Error at appwrite , updatePost::",error);
        }
    }
    
    async deletePost(slug){
        try {
            await this.databses.deleteDocument(conf.appwriteDatabseId ,conf.appwriteCollectionId , slug )
            return true
        } catch (error) {
            console.log("Error at appwrite , deletePost::",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databses.getDocument(conf.appwriteDatabseId ,conf.appwriteCollectionId , slug)
        } catch (error) {
            console.log("Error at appwrite , getPost::",error);
        }
    }

    async getAllPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databses.listDocuments(conf.appwriteDatabseId ,conf.appwriteCollectionId , queries)
        } catch (error) {
            console.log("Error at appwrite , getAllPosts::",error);
        }
    }


    //file upload servies 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId , ID.unique() , file)
        } catch (error) {
            console.log("Error at appwrite , uploadFile::",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId , fileId)
            return true
        } catch (error) {
            console.log("Error at appwrite , deleteFile::",error);
            return false;
        }
    }
    getFilePreview(){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )

    }
}