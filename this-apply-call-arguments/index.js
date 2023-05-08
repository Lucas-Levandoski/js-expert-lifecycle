'use strict';

const { watch, promises: { readFile } } = require('fs');

class File{

  //on this scenario this watch is actually using the watch that was imported, so 'this.showContent' does not exists inside the watch class imported, which fails.
  watch(event, fileName) {
    console.log('this', this);
    console.log('arguments', arguments);
    console.log('arguments', Array.prototype.slice.call(arguments));
    this.showContent(fileName);
  }

  async showContent(fileName) {
    console.log((await readFile(fileName)).toString());
  }
}

const file = new File();

const t = Array.prototype.slice.call({0: 'test1', 1: 'test2', length: 2});
const s = Array.prototype.slice.call({0: 'test1', 1: 'test2'});

console.log(t, Array.isArray(t));
console.log(s, Array.isArray(s));

//this will fail because watch is being called twice
//watch(__filename, file.watch);

//this is a workaround with arrow functions
//watch(__filename, (event, filename) => file.watch(event, filename));


//IT IS POSSIBLE TO DEFINE THE CONTEXT OF THE FUNCTION
//this bind is actually forcing the context to be the one inside the bind function
watch(__filename, file.watch.bind(file));


//another way to fix it
// this ~call will replace the actual showContent method
//file.watch.call({ showContent: () => console.log('inside the mocked method') }, null, __filename)

