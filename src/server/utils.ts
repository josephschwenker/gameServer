getRequestedData = (request) => {
  return new Promise(
    (resolve, reject) => {
      try {
        let body = ''
        request.on(
          'data',
          () => addDataToBody(data)
        )
        request.on(
          'end',
          () => {
            resolve(body)
          }
        )
      }
      catch (error) {
        reject(error)
      }
    }
  )
}

addDataToBody = (data) => {
  body += data
}

module.exoprts = { getReqData }