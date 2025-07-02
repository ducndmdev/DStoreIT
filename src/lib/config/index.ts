const config = {
  env: {
    appwrite: {
      urlEndpoint: process.env.NEXT_PUBLIC_APPWRITE_URL_ENDPOINT!,
      project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
      database: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      userCollection: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
      fileCollection: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION!,
      bucket: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
      key: process.env.NEXT_APPWRITE_KEY!,
    },
  },
};

export default config;
