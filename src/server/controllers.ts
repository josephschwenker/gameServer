const data = require('./Map.js')

class Controller {
  getMap = async () => {
    return new Promise(
      (resolve, reject) => {
        resolve(map)
      }
    )
  }
}

module.exports = Controller