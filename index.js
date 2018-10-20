const app = require('./src/app')

const fileName = process.argv[2];

console.log('-----------Start toy robot-----------')
console.log('')
app.run(fileName, (err, robot) => {
  if(err) {
    console.log('Error happened: ' + (err.message))
    return
  }

  if(!robot.isPlaced) {
    console.log('robot is not on the talbe')
  }
  console.log('')
  console.log('-----------End toy robot-----------')
})
