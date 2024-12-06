const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'DARK-EWING;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1AxQlFPVFZGdVJEVVo1RDY4TmNta2xOUHFOQm1OQTZxRjZxSTFjYWhVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzVZYTlVUkh4NXc4bEM3NTQzWHp5THV5SXFQblN2cmpvMVdVaUNZeGdFYz0ifX0sInNpZ25lZElkZW50aXR5S2V5Ijp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyS29QMU9yanFZbGZReTQ0ajE5WWR2amJqb2c2WkZPWWNoVzVMbkp6VUY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnYVZxOGQwRUVwZkZmSDRSdkVyOHZRcUJtVHVFSWs4bXNFMXlUa0Z1U2hJPSJ9fSwic2lnbmVkUHJlS2V5Ijp7ImtleVBhaXIiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBFbnlFbmtxSHYxenVEbUZIVkFSazMva0hIZTZ6K3F4RDR6NmpKcDBSVWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhOenIvUWFxQy9HZnM2NUpIdEQ0bXAxbitiT2hiVDlvWXZOWDl3YU56a1k9In19LCJzaWduYXR1cmUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYOVdJdXkwSlZQZk83OFR6eVJ5RnB6LzE0d2dpSEovcVdBRTJIOXJ5ZlFmNXJFRUtsU2JiSmo0dUNsSVN6a2dCYVRZeE1VYkdHd2RhOFUycG1CaXlndz09In0sImtleUlkIjoxfSwicmVnaXN0cmF0aW9uSWQiOjEwNywiYWR2U2VjcmV0S2V5IjoiQWdPa0tycnQ5dElkbmU5ZC96elF3NktXaTdmWTNPZ3BjY0tpaFBWOXMyMD0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiX2JSaWh4NjZRZk80YWdkOE9QeHRzdyIsInBob25lSWQiOiIxYzcwMzM5Yy0yNzllLTQ1ZjctYWZkMC1iNWQ4YzM5ZGZhZDgiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT3dpYzBMc1ZiejhSVW1uN3RvWXRkdWVScEhBPSJ9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjUlp5RWdJQ2FYeHJpOTYxNkg3MTFYSFduaE09In0sInJlZ2lzdHJhdGlvbiI6e30sImFjY291bnQiOnsiZGV0YWlscyI6IkNNTGg5NElERVArM3lib0dHQXNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJDOHcybFlsN1JtQ0lVdDdrWkI2d3V1QytobndoT0FtZVpwc21OMlRPMVRNPSIsImFjY291bnRTaWduYXR1cmUiOiJ5c1BxMzNYWGFDWU5vTXJkQ0NyKzFGaWlaMEoxWDFDL2lrSEdxV0FmSFdOVjVkNEdnVk9PVXFVV3RoOXZMcGV4Z0VVd1lqUkdIUFlLcVh1R05XSnJBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoib3RhbDFiNXJvQWkxem9hMlFlaHR4L3hhNlRiYTRaTUVoQ0U0WGNOeHhTSEJPZEUzdEJPbER3RXhmblpveGlmOXFER1o2NU5jaGVsVTh1NnYwNEtZaGc9PSJ9LCJtZSI6eyJpZCI6Ijk0Nzc5MjAzNzcyOjU0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ismq4rSVIFwi4bSiIOG0jeG0hyDvvKzhtIfhj6nhtIfJtOG0hdeA4bSEyo/KmeG0h8qAICDKn8mq4bSPybQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NzkyMDM3NzI6NTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUXZNTnBXSmUwWmdpRkxlNUdRZXNMcmd2b1o4SVRnSm5tYWJKamRrenRVeiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzQ1MDc1NX0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "⚔  dexter  ⚔",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'true',
    BOT : process.env.BOT_NAME || 'DEXTER-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "true",
    PM_PERMIT: process.env.PM_PERMIT || 'true',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "true",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'true',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
