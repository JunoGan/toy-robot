const Robot = require('../src/Robot')
const { expect } = require('chai')

describe('Robot', () => {
  let robot = new Robot()
  let stub
  
  it('should place toy into right position (within 5x5 table)' , () => {
    robot = robot.place(3, 3, 'north')
    expect(robot.isPlaced).to.be.true
    expect(robot.position).to.deep.equal({x: 3, y: 3})
    expect(robot.curDirection).to.equal('north')
  })

  it('should ignore place command when placing toy outside 5x5 table', () => {
    robot = robot.place(4, 5, 'sourth')
    robot = robot.place(5, 3, 'north')
    robot = robot.place(2, 2, 'east')
    expect(robot.isPlaced).to.be.true
    expect(robot.position).to.deep.equal({x: 2, y: 2})
    expect(robot.curDirection).to.equal('east')
  })

  it ('should go to right position when read a MOVE command', () => {
    robot = robot.place(0, 0, 'north');
    robot = robot.move();
    robot = robot.move();
    expect(robot.position).to.deep.equal({x: 0, y: 2});
  })

  it('should face to right direction when read a TURN command', () => {
    robot = robot.place(3, 3, 'north');
    robot = robot.turn('right');
    expect(robot.curDirection).to.equal('east');
  })

  it('should ingore all commands before a robot is placed in right position', () => {
    robot = robot.move();
    robot = robot.turn('right');
    robot = robot.place(0, 2, 'north');
    expect(robot.position).to.deep.equal({x: 0, y: 2});
    expect(robot.curDirection).to.equal('north');
  })

  it('should discard all commands in the sequence until a valid PLACE command has been executed', () => {
    robot = robot.place(0, 0, 'north')
    robot = robot.move()
    robot = robot.move()
    robot = robot.place(3, 3, 'west');
    expect(robot.position).to.deep.equal({x: 3, y: 3});
    expect(robot.curDirection).to.equal('west');
  })


});