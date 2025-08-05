import dotenv from 'dotenv'
dotenv.config()

// if (!process.env.DB_URL) {
//   throw new Error(" DB_URL is not defined in .env file");
// }
// if (!process.env.JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined in .env file");
// }

// if(!process.env.PORT)
// {
//   throw new Error("PORT is not defined in .env file");
// }

export const {PORT,NODE_ENV,DB_URL,JWT_SECRET,EXPIREDIN,ARCJET_KEY,ARCJET_ENV,QSTASH_URL,QSTASH_TOKEN,SERVER_URL,EMAIL_PASSWORD,EMAIL}=process.env;