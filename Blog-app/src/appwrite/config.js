/* eslint-disable no-unused-vars */
import conf from "../conf/conf"
import { Client,Databases,Storage,Query ,ID} from "appwrite"

class AppwriteService{
    constructor(){
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client);
    }
    async getPost(slug){
        try {
            const response = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return response;
        } catch (error) {
            console.log("appwrite Service :: getPost()",error)
            throw error;
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("appwrite Service :: getPosts()",error)
            throw error;
        }
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
            try {
                if (!title || !slug || !content || !featuredImage || !userId) {
                    throw new Error('Missing required fields');
                }

                const normalizedStatus = status?.toLowerCase() || 'active';

                const response = await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    ID.unique(),
                    {
                        title,
                        slug, 
                        content: content.toString(), 
                        featuredImage, 
                        status:normalizedStatus, 
                        userId
                    }
                )
                return response;
            } catch (error) {
                console.log("appwrite Service :: createPost()",error)
                throw error;
            }
        }
    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            const response = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title, content, featuredImage, status}
            )
            return response;
        } catch (error) {
            console.log("appwrite Service :: updatePost()",error)
            throw error;
        }
    }
    async deletePost(slug){
        try {
            const response = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return response;
        } catch (error) {
            console.log("appwrite Service :: deletePost()",error)
            throw error;
        }
    }
    async uploadFile(file){
        try {
            const response = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            return response;
        } catch (error) {
            console.log("appwrite Service :: uploadFile()",error)
            throw error;
        }
    }
    async deleteFile(fileId){
        try {
            const response = await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return response;
        } catch (error) {
            console.log("appwrite Service :: deleteFile()",error)
            throw error;
        }
    }
    async getFilePreview(fileId){
        try{
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
        }catch(error){
            console.log("appwrite Service :: getFilePreview()",error)
            return null
        }
    }
}

const appwriteService = new AppwriteService();
export default appwriteService;



// import conf from "../conf/conf"
// import { Client,Databases,Storage,Query ,ID} from "appwrite"

// export class Service {
//     client = new Client()
//     databases;
//     bucket;

//     constructor(){
//         this.client
//         .setEndpoint(conf.appwriteUrl)
//         .setProject(conf.appwriteProjectId)

//         this.databases = new Databases(this.client)
//         this.bucket = new Storage( this.client)
//     }

//     async getPost(slug){
//         try {
//             return await this.databases.getDocument(
//                 conf.appwriteDatabaseId, 
//                 conf.appwriteCollectionId, 
//                 slug
//             ) ;
//         } catch (error) {
//             console.log("appwrite Service :: getPost()",error)
//             throw error;
//         }
//     }

//     async getPosts(queries = [ Query.equal("status","active")]){
//         try {
//             return await this.databases.listDocuments(
//                 conf.appwriteDatabaseId, 
//                 conf.appwriteCollectionId, 
//                 queries)
//         } catch (error) {
//             console.log("appwrite Service :: getPosts()",error)
//         }

//     }

//     async createPost({title,slug,content,featuredImage,status,userId}){
//         try {
//             if (!featuredImage){
//                 throw new Error("Featured Image is required")
//             }
//             const response = await this.databases.createDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 ID.unique(),
//                 {title, slug, content, featuredImage, status, userId}
//             )
//             return response;
//             // return await this.databases.createDocument(
//             //     conf.appwriteDatabaseId,
//             //     conf.appwriteCollectionId,
//             //     slug,
//             //     {title, content, featuredImage, status, userId}
//             // )
            
//         } catch (error) {
//             console.log("appwrite Service :: createPost() in config.js",error)
//             throw error;
//         }
//     }

//     async updatePost (slug,{title, content, featuredImage, status}){
//         try {
//             return await this.databases.updateDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId, 
//                 slug,
//                 {
//                     title, content, featuredImage, status  
//                 }
//             )
            
//         } catch (error) {
//             console.log("appwrite Service :: updatePost()",error)
//         }
//     }

//     async deletePost (slug){
//         try {
//             await this.databases.deleteDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId, 
//                 slug
//             )
//         return true;
            
//         } catch (error) {
//             console.log("appwrite Service :: deletePost()",error)
//         }
//     }

//     async uploadFile(file){
//         try {
//             return await this.bucket.createFile(
//                 conf.appwriteBucketId,
//                 ID.unique(),
//                 file
//             )
//         } catch (error) {
//             console.log("appwrite Service :: uploadFile()",error)
//             return false;
//         }
//     }
//     async deleteFile (fileId){
//         try {
//             return await this.bucket.deleteFile(
//                 conf.appwriteBucketId,
//                 fileId
//             )
            
//         } catch (error) {
//             console.log("appwrite Service :: deleteFile()",error)
//             return false;
//         }
//     }
//     getFilePreview(fileId){
//         return this.bucket.getFilePreview(
//             conf.appwriteBucketId,
//             fileId
//         ).href
//     }

// }

// const appwriteService = new Service()
// export default appwriteService;