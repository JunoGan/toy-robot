
// Commands Example

// PLACE 1,2,EAST
// MOVE
// MOVE
// LEFT
// MOVE
// REPORT

class Parser{
  parse(data, callback) {
    if(!data.length) {
      return callback(new Error('Content must not empty'), null)
    }
    console.log('Input Commands: ')
    
    const parsedCommands = data.split('\n').map((command) => {
      console.log(`${command}`)
      return this.parseString(command.toLowerCase())
    }).filter(x => !!x)

    if(!parsedCommands.length) {
      callback(new Error('Input Command is invalid'), null)
    }

    callback(null, parsedCommands)
  }

  parseString(command) {
    const elements = command.split(' ')

    if(elements.length > 1 && elements[0] === 'place') {
        return this.parsePlace(command)
    } else {
      return this.parseOthers(command)
    }
  }

  //parse PLACE commands
  parsePlace(command) {
    const elements = command.split(' ')
    const sub_elements = elements[1].split(',')

    const x = parseInt(sub_elements[0])
    const y = parseInt(sub_elements[1])
    const curDirection = sub_elements[2]

    if (!isNaN(x) && !isNaN(y) && directions.includes(curDirection)) {
      return {
        command: 'place',
        args: [x, y, curDirection]
      };
    } else {
      return null
    }
  }

  //parse command except PLACE
  parseOthers(command) {
    switch (command) {
      case 'move':
        return {
            command: 'move'
        };
      case 'left':
        return {
          command: 'turn',
          args: 'left'
        };
      case 'right':
        return {
          command: 'turn',
          args: 'right'
        };
      case 'report':
        return {
          command: 'report'
        };
      default:
        return null
    }
  }
}

const directions = ['north', 'east', 'south', 'west']

module.exports = Parser