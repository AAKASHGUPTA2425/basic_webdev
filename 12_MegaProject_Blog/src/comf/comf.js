const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPONT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

}
console.log("Appwrite Config", conf.appwriteProjectId, conf.appwriteUrl);

export default conf