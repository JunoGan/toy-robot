const { expect } = require('chai');
const path = require('path')
const FileReader = require('../src/FileReader')

describe('FileReader', () => {
  const fileReader = new FileReader()

  it('should throw an error when file does not esist', () => {
    fileReader.read(path.join(__dirname, 'data/not-exist.txt'), (err, data) => {
      expect(err).to.be.throw
    })
  })

  it('should throw an error when file is empty', () => {
    fileReader.read(path.join(__dirname, 'data/empty.txt'), (err, data) => {
      expect(err).to.exist
    })
  })

  it('should read commands correctly', () => {
    fileReader.read(path.join(__dirname, 'data/command1.txt'), (err, data) => {
      expect(err).to.be.null
      expect(data).to.equal('PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT');
    })
  })

})