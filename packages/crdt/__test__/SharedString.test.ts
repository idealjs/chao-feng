import SharedString from "../src/SharedString";

const string1 = new SharedString();
const string2 = new SharedString();

string1.concat("hello");

string2.concat("world");

string1.merge(string2);
string2.merge(string1);

console.log("test test1", string1.toString());
console.log("test test2", string2.toString());
