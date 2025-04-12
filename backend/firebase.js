const admin = require("firebase-admin");
const serviceAccount = require("./config/trackdrug-firebase-adminsdk-fbsvc-2136c83eba.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
module.exports=admin;