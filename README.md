# business-logics

A library to query business logics via truth table.

[![npm version](https://badge.fury.io/js/business-logics.svg)](https://badge.fury.io/js/business-logics)
[![Build Status](https://travis-ci.org/ozziest/business-logics.svg?branch=master)](https://travis-ci.org/ozziest/business-logics)

**Business logics** could be hardest parts to manage in a software when they are too complicated. Writing so many if-else block doesn't help usually too. But there is many simple solution to detech business logics and application behavior which is [**Truth Table**](https://en.wikipedia.org/wiki/Truth_table).

You might see a simple truth table in following lines;

| is_logged_in  |  is_admin   | read_permission   | write_permission  |
|---------------|-------------|-------------------|-------------------|
| true          | false       | true              | false             |
| true          | true        | true              | true              |

With *this library*, **business-logics**, you might define your business logics as truth tables and query them whenever you need.

*You don't have to write **if-else** blocks anymore.*

## 🔧 Installation

```
$ yarn add business-logics
```

## 📖 Basic Usage

It is easy to use;

```js
import BusinessLogics from 'business-logics'

const logics = new BusinessLogics({
  parameters: ['is_logged_in', 'is_admin'],
  results: {
    read: { default: false },
    write: { default: false }
  },
  data: [
    //  is_logged is_admin   read     write
    //--------------------------------------
    [   true,     false,     true,    false ],
    [   true,     true,      true,    true  ]
  ]
})

const status = logics.get({
  is_logged_in: true,
  is_admin: false
})

console.log(status)
```

These are following result of a query;

```json
{
  "is_logged_in": true,
  "is_admin": false,
  "read": true,
  "write": false
}
```

> If there is not any truth table definition for your query, you'll get your **default values**. So that you don't have to write all possible values for parameters.

## 🚀 VueJS Example

[![Edit recursing-sun-uwl85](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/recursing-sun-uwl85?fontsize=14&hidenavigation=1&theme=dark)

You might review simple usage for a VueJS application in following code;

```js
import BusinessLogics from 'business-logics'

export default {
  data () {
    return {
      map: {
        parameters: ['is_logged_in', 'is_admin'],
        results: {
          read: { default: false },
          write: { default: false }
        },
        data: [
          //  is_logged is_admin   read     write
          //--------------------------------------
          [   true,     false,     true,    false ],
          [   true,     true,      true,    true  ]
        ]
      },
      isLoggedIn: true,
      isAdmin: false,
      logics: null
    }
  },

  mounted () {
    this.logics = new BusinessLogics(this.map)
  },

  computed: {
    status () {
      if (!this.logics) {
        return {}
      }
      return this.logics.get({
        is_logged_in: this.isLoggedIn,
        is_admin: this.isAdmin
      })
    }
  }
}
```

In this example, you can calculate the statuses of business logic with your truth table.

## 🔑 License

[MIT](LICENSE) © [Özgür Adem Işıklı](https://github.com/ozziest)