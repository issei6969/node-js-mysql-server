const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const dbPool = createComboPool({
  host: "sql6.freemysqlhosting.net",
  user: "sql6697517",
  password: "JD59N3vqBh",
  database: "sql6697517",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

async function createComboPool(config) {
  return await mysql.createPool(config);
}
// db.connect((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   } else console.log("Connected to DB");
// });

app.post("/update", async (req, res) => {
  try {
    // getting user details
    const { userName, locationCordinates, location } = req.body;

    // getting connection from combopool and executing query
    (await dbPool).query(
      "INSERT INTO user_location ( username, location_coordinates,locaiton_name,latest_timestamp) VALUES (?,?,?,CURRENT_TIMESTAMP)",
      [userName, locationCordinates, location],
      (err, data) => {
        if (err) throw new err();
        res.json({
          message: "Data updated successfully",
          id: data.insertId,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
