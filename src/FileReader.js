const fs = require('fs')

class FileReader {
  read(fileName, callback) {
    if (!fileName) {
      return callback(new Error("No file name inputed"), null)
    }
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        return callback(new Error('cannot asscess the file'), null)
      }
      if (!data.length) {
        return callback(new Error('File content is empty'), null)
      }
      return callback(null, data)
    });
  }
}

module.exports = FileReader