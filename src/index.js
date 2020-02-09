class BusinessLogics {
  constructor (map) {
    if (!map) {
      throw Error('Initialization data should be passed.')
    }

    if (map.parameters === undefined || map.parameters === null || typeof map.parameters !== 'object') {
      throw Error('Map parameters couldn`t found.')
    }

    if (map.results === undefined || map.results === null || typeof map.results !== 'object') {
      throw Error('Map result set couldn`t found.')
    }

    this.parameters = map.parameters
    this.results = map.results
    this.setMap(map.data)
  }

  setMap (data) {
    if (!data) {
      data = []
    }

    this.map = data.map((row) => {
      const item = {}
      this.parameters.forEach((parameter, index) => {
        item[parameter] = row[index]
      })
      let index = 0
      for (const key in this.results) {
        item[key] = row[this.parameters.length + index++]
      }
      return item
    })
  }

  getDefaults () {
    const values = {}
    this.parameters.forEach((key) => { values[key] = null })
    return values
  }

  getMixedDefaults (params) {
    const result = {}
    for (const key in this.results) {
      result[key] = this.results[key].default
    }
    Object.assign(result, params)
    return result
  }

  get (params) {
    params = Object.assign(this.getDefaults(), params)

    const result = this.map
      .find((item) => {
        let result = true
        for (const key in params) {
          if (item[key] !== params[key]) {
            result = false
            break
          }
        }
        return result
      })

    if (result) {
      return result
    }

    return this.getMixedDefaults(params)
  }
}

export default BusinessLogics
