const dbStore = require("curly-db");
// const dbStore = new curlyDB();

const buildRef = (db, refPath, parentDbRef) => {
  let ref = {};
  ref.path = refPath;

  ref.value = db;
  //   ref.parentDbRef = parentDbRef;
  ref.key =
    ref.path.split("/").at(-1) === ""
      ? ref.path.split("/").at(-2)
      : ref.path.split("/").at(-1);

  ref.setValue = (value) => {
    // console.log(ref.key, value, parentDbRef);
    if (parentDbRef) {
      parentDbRef.set(ref.key, value);
      ref.value = parentDbRef.get(ref.key);
      dbStore.save();
    } else if (ref.path) {
      if (ref.path.at(0) === "/" && false) {
      } else {
        const pathArr = ref.path.split("/");
        console.log(ref.path, pathArr);
        pathArr.at(-1) === "" && pathArr.splice(-1, 1);
        pathArr.at(1) === "root" && pathArr.splice(1, 1);
        (pathArr.at(0) === "" || pathArr.at(0) === "root") &&
          pathArr.splice(0, 1);
        console.log(pathArr);

        let currentRef = ref.getRootref();
        pathArr.forEach((key) => {
          currentRef = currentRef.child(key);
          if (!currentRef.exist()) {
            currentRef.setValue({});
          }
        });
        currentRef.setValue(value);
      }
    }
  };
  ref.getKey = () => {
    return ref.key;
  };
  ref.getValue = () => {
    return ref.value;
  };
  ref.hasChild = (key) => {
    return ref.exist() ? ref.value.hasOwnProperty(key) : false;
  };
  ref.setChild = (key, value) => {
    ref.value.set(key, value);
  };
  ref.child = (key) => {
    return ref.hasChild(key)
      ? buildRef(ref.value[key], ref.path + "/" + key, ref.value)
      : buildRef(null, ref.path + "/" + key, ref.value);
  };
  ref.exist = () => {
    return !!ref.value;
  };
  ref.cr = (path) => {
    //TODO: perform path validation
    if (path.at(0) === "/") {
      //TODO: from root
      return buildRef(null, path, null);
    } else {
      return buildRef(null, ref.path + "/" + path, null);
    }
  };

  ref.getRootref = () => {
    return buildRef(dbStore.get("root"), "/root", dbStore);
  };
  return ref;
};

dbStore.set("root", {});
dbStore.save();
const dbRootRef = buildRef(dbStore.get("root"), "/root", dbStore);
// dbRoottoJSON = function () {
//   //   return omitKeys(dbStore, ["ref"]);
//   return dbStore.value;
// };
module.exports = dbRootRef;
