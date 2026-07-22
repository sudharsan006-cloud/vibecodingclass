const mysql = require("mysql2/promise");

async function checkDatabases() {
  try {
    const connection1 = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "finfix_contact",
    });
    const [rows1] = await connection1.execute("SELECT * FROM contacts");
    console.log("=== finfix_contact.contacts ===");
    console.log(rows1);
    await connection1.end();

    const connection2 = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "Finage_contact",
    });
    const [rows2] = await connection2.execute("SELECT * FROM contacts");
    console.log("=== Finage_contact.contacts ===");
    console.log(rows2);
    await connection2.end();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

checkDatabases();
