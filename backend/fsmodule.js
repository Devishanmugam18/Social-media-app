const fs = require("fs");
function writFileFunc() {
  fs.writeFile(
    "demo.txt",
    "written using nodejs fs library function",
    (err, data) => {
      if (err) {
        console.log("error while writing", err);
      }
      //   console.log(data);
    }
  );
}

function append() {
  fs.appendFile("demo.txt", "content apended", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
}

function readd() {
  fs.readFile("demo.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log("read from file", data.toString());
  });
}

function deleteFile() {
  fs.unlink("demo.txt", (err, data) => {
    if (err) {
      console.log("err", err);
    }
  });
}
// writFileFunc();
// append();
// readd();
deleteFile();
