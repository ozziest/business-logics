import each from 'jest-each'
import BusinessLogics from './../src/index'

/* eslint-disable no-new */
test('I should be able to send a map', () => {
  expect(() => {
    new BusinessLogics()
  }).toThrow('Initialization data should be passed.')
})

each([
  {},
  { parameters: null },
  { parameters: 1 },
  { parameters: 'x' }
]).test('I should not be able to send a map with %s', (map) => {
  expect(() => {
    new BusinessLogics(map)
  }).toThrow('Map parameters couldn`t found.')
})

each([
  { parameters: [] },
  { parameters: [], results: null },
  { parameters: [], results: 1 },
  { parameters: [], results: 'x' }
]).test('I should not be able to send a map with %s', (map) => {
  expect(() => {
    new BusinessLogics(map)
  }).toThrow('Map result set couldn`t found.')
})

test('I should be able to send a map wihtout data section', () => {
  expect(() => {
    new BusinessLogics({
      parameters: [],
      results: {}
    })
  }).not.toThrow()
})

test('I should be able to see manipulated map in the TTable', () => {
  const table = new BusinessLogics({
    parameters: ['is_logged_in', 'is_admin'],
    results: {
      read: { default: false },
      write: { default: false }
    },
    data: [
      // is_logged_in,is_admin,is_team_members,read,write
      [true, false, true, false]
    ]
  })
  expect(table.parameters).not.toBeNull()
  expect(table.parameters.length).toBe(2)

  expect(table.results).not.toBeNull()
  expect(table.results.read).not.toBeNull()
  expect(table.results.write).not.toBeNull()
  expect(typeof table.results.read).toBe('object')
  expect(typeof table.results.write).toBe('object')
  expect(table.results.read.default).toBe(false)
  expect(table.results.write.default).toBe(false)

  expect(table.map).not.toBeNull()
  expect(table.map.length).toBe(1)
  expect(table.map[0].is_logged_in).toBe(true)
  expect(table.map[0].read).not.toBeNull()
  expect(table.map[0].write).not.toBeNull()
})

test('I should be able to see correct result by my query', () => {
  const table = new BusinessLogics({
    parameters: ['is_logged_in', 'is_admin'],
    results: {
      read: { default: false },
      write: { default: false }
    },
    data: [
      // is_logged_in,is_admin,is_team_members,read,write
      [true, false, true, false],
      [true, true, true, true]
    ]
  })

  // Checking default value
  expect(table.get()).toEqual({
    is_logged_in: null,
    is_admin: null,
    read: false,
    write: false
  })

  // Checking first scenario
  expect(table.get({ is_logged_in: true, is_admin: false })).toEqual({
    is_logged_in: true,
    is_admin: false,
    read: true,
    write: false
  })

  // Checking second scenario
  expect(table.get({ is_logged_in: true, is_admin: true })).toEqual({
    is_logged_in: true,
    is_admin: true,
    read: true,
    write: true
  })

  // Checking undefined scenario and default value
  expect(table.get({ is_logged_in: true })).toEqual({
    is_logged_in: true,
    is_admin: null,
    read: false,
    write: false
  })
})
/* eslint-enable no-new */
