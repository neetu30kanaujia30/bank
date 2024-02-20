import userSeed from "./user.js";
import cardSeeder from "./cards.js";
import connection from "../database/mongoConnect.js";
const seeder = () => {
  connection()
    .then(async () => {
      await userSeed();
      await cardSeeder();
    })
    .then(() => {
      console.log("---end----");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
seeder();
export { seeder };
