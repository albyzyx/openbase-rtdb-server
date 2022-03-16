const db = require("./dbFacade");

const dbHelper = {
  setValue: (keyTrace, value) => {
    const lastIndex = keyTrace.length - 1;
    keyTrace.forEach((element, index) => {
      if (db.has(element)) {
      }
    });
  },
};

module.exports = dbHelper;
