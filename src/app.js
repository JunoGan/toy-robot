const Robot = require('./Robot')
const FileReader = require('./FileReader')
const Parser = require('./Parser')

const robot = new Robot()
const fileReader = new FileReader()
const parser = new Parser()

const app = {}

app.run = (fileName, callBack) => {
  fileReader.read(fileName, (err, data) => {
    if (err) {
      callBack(err) 
      return
    }

    parser.parse(data, (err, parsedCommands) => {
      if (err) {
        callBack(err) 
        return
      }
      robot.execute(parsedCommands)
      callBack(null, robot)
    })
  })
}

module.exports = app;