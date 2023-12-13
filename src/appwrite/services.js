import { Client, Databases, ID, Query ,Storage } from "appwrite";
import env_config from "../env_config/env_config"
export class Service {
    client = new Client()
    database
    bucket
    constructor() {
        this.client
            .setEndpoint(env_config.appwriteUrl)
            .setProject(env_config.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ slug, title, content, fetureImage, status, userID }) {
        try {
            const res = await this.database.createDocument(
                env_config.appwriteDatabaseId,
                env_config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    fetureImage,
                    status,
                    userID
                }
            )
            return res
        } catch (error) {
            console.log(error);
        }
        return false
    }

    async updatePost(slug , {title, content, fetureImage, status, userID }){
        try {
            const res = await this.database.updateDocument(
                env_config.appwriteDatabaseId,
                env_config.appwriteCollectionId,
                slug,
                {title, content, fetureImage, status, userID }
                )
            return res
        } catch (error) {
            console.log(error);
        }
        return false
        
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                env_config.appwriteDatabaseId,
                env_config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log(error);
        }
        return false
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            const res= await this.database.listDocuments(
                env_config.appwriteDatabaseId,
                env_config.appwriteCollectionId,
                queries
            )
            return res
        } catch (error) {
            console.log(error);
        }
        return false
    }
    async getPost(slug){
        try {
            const res = await this.database.getDocument(env_config.appwriteDatabaseId,env_config.appwriteCollectionId,slug)
            
            return res
            
        } catch (error) {
            console.log(error);
        }
    }

    async uploadFile(file){
        try {
            const res = await this.bucket.createFile(
                env_config.appwriteBucketId,
                ID.unique(),
                file)
            return res
        } catch (error) {
            console.log(error);
        }
        return false
    }

    async deleteFile(fileId){
        try {
            const res = await this.bucket.deleteFile(fileId)
            return res
        } catch (error) {
            console.log(error);
        }
        return false
    }
  
    getFilePreview(fileId){
        try {
            return  this.bucket.getFilePreview(
                env_config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(error);
        }
        return false
    }

}

const appwriteService = new Service;

export default appwriteService