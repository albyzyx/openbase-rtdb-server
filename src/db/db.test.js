const dbRef = require("./dbFacade.js");

test("set and get simple value", () => {
  let ref = dbRef.child("test");
  ref.setValue("value");
  const res = ref.getValue();
  expect(res).toBe("value");
});

test("change ref", () => {
  let ref = dbRef.child("testNew").cr("test1/test2").child("test3");
  expect(ref.path).toBe("/root/testNew/test1/test2/test3");
});

test("set empty ref - backtrack from root", () => {
  let ref = dbRef.child("testNew").cr("test1/test2").child("test3");
  ref.setValue("valuetest");
  // expect(dbRef.cr("testNew/test1/test2/test3").getValue()).toBe("valuetest");
});

test("set empty ref - direct from root", () => {
  let ref = dbRef.cr("/testFromRoot/test2/test3");
  ref.setValue("valuetest");
  // expect(dbRef.cr("testNew/test1/test2/test3").getValue()).toBe("valuetest");
});
