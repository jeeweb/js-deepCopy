const deepCopy = require("./deep-copy");

test("Number 복사 비교", () => {
  const num = 100;
  const copiedNum = deepCopy(num);
  expect(copiedNum).toBe(num);
});

test("String 복사 비교", () => {
  const str = "abc";
  const copiedStr = deepCopy(str);
  expect(copiedStr).toBe(str);
});

test("Null 복사 비교", () => {
  const nullData = null;
  const copiedNull = deepCopy(nullData);
  expect(copiedNull).toBeNull();
});

test("Undefined 복사 비교", () => {
  let undefinedData;
  let copiedUndefined = deepCopy(undefinedData);
  expect(copiedUndefined).toBeUndefined();
});

test("Date 깊은 복사 비교", () => {
  const dateData = new Date();
  const copiedDate = deepCopy(dateData);
  expect(copiedDate).toStrictEqual(dateData);
});

test("Map 깊은 복사 비교", () => {
  const map = new Map();
  map.set("a", 1).set(2, "num").set(true, "bool");
  const copiedMap = deepCopy(map);
  expect(copiedMap).toStrictEqual(map);
});

test("Set 깊은 복사 비교", () => {
  const set = new Set([1, 2, 3, 4]);
  const copiedSet = deepCopy(set);
  expect(copiedSet).toStrictEqual(set);
});

test("RegExp 깊은 복사 비교", () => {
  const reg = new RegExp(/ab+c/, "i");
  const copiedReg = deepCopy(reg);
  expect(copiedReg).toStrictEqual(reg);
});

test("Array 깊은 복사 비교1 - 2depth까지 복사되었는지", () => {
  const arr = [1, 2, "가", ["a", "b"], undefined];
  const copiedArr = deepCopy(arr);
  expect(copiedArr).toMatchObject(arr);
});

test("Array 깊은 복사 비교2 - 메모리 분리가 되었는지", () => {
  const arr = [1, 2, "가", ["a", "b"], undefined];
  const copiedArr = deepCopy(arr);
  copiedArr[3][1] = "x";
  expect(copiedArr).not.toMatchObject(arr);
});

test("Object 깊은 복사 비교1 - 3depth까지 복사되었는지", () => {
  const obj = {
    a: 1,
    b: "abc",
    c: {
      x: 222,
      y: "def",
      z: [100, 200, 300],
    },
    d: function () {
      console.log("hello world");
    },
    e: undefined,
  };
  const copiedObj = deepCopy(obj);
  expect(copiedObj).toStrictEqual(obj);
  expect(copiedObj).toHaveProperty("c.z[0]", 100);
});

test("Object 깊은 복사 비교2 - 메모리 분리가 되었는지", () => {
  const obj = {
    a: 1,
    b: "abc",
    c: {
      x: 222,
      y: "def",
      z: [100, 200, 300],
    },
    d: function () {
      console.log("hello world");
    },
    e: undefined,
  };
  const copiedObj = deepCopy(obj);
  copiedObj["c"]["z"][2] = 333;
  expect(copiedObj).not.toStrictEqual(obj);
  expect(obj).not.toHaveProperty("c.z[2]", 333);
});
