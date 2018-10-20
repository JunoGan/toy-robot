const { expect } = require('chai')
const Parser = require('../src/Parser')

describe('Parser', () => {
  const parser = new Parser()

  it('should throw am error when no command input', () => {
    parser.parse('', (err, parsedCommands) => {
      expect(err).to.exist
    })
  })

  it('should parse commands correctly', () => {
    parser.parse('PLACE 0,0,NORTH\nMOVE\nRIGHT\nRIGHT\nREPORT', (err, parsedCommands) => {
      expect(parsedCommands).to.deep.equal([
        {
          command: 'place',
          args: [0, 0, 'north']
        }, {
          command: 'move',
        }, {
          command: 'turn',
          args: ['right']
        }, {
          command: 'turn',
          args: ['right']
        }, {
          command: 'report'
        }
      ])
    })
  })

  it('should skip the command which is invalid', () => {
    parser.parse('PLACE,1,2,NORTH\nPLACE 1,2,NORTH\nSKIP\nMOVE\nLEFT\nMOVE', (err, parsedCommands) => {
      expect(parsedCommands).to.deep.equal([
        {
          command: 'place',
          args: [1, 2, 'north']
        }, {
          command: 'move'
        },{
          command: 'turn',
          args: ['left']
        }, {
          command: 'move'
        }
      ])
    })
  })

})
