const db = require("./src/db/dbFacade.js");

// db.set("test", 123);

const tmp = db.get("test");

console.log(tmp.has(""));
