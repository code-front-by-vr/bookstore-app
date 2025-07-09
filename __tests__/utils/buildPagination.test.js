import {expect, test, describe} from '@jest/globals'

import {buildSchemePagination} from '@/utils/buildPagination'

describe('buildSchemePagination', () => {
  test('возвращает null для одной страницы', () => {
    expect(buildSchemePagination(1, 1)).toBeNull()
  })

  test('простые случаи без многоточий', () => {
    expect(buildSchemePagination(1, 2)).toEqual([1, 2])
    expect(buildSchemePagination(1, 3)).toEqual([1, 2, 3])
    expect(buildSchemePagination(2, 4)).toEqual([1, 2, 3, 4])
  })

  test('случаи с многоточиями', () => {
    expect(buildSchemePagination(4, 9)).toEqual([1, '...', 3, 4, 5, '...', 9])
    expect(buildSchemePagination(9, 9)).toEqual([1, '...', 8, 9])
  })

  test('первые страницы большой пагинации', () => {
    expect(buildSchemePagination(1, 10)).toEqual([1, 2, '...', 10])
    expect(buildSchemePagination(2, 10)).toEqual([1, 2, 3, '...', 10])
    expect(buildSchemePagination(3, 10)).toEqual([1, 2, 3, 4, '...', 10])
  })

  test('последние страницы большой пагинации', () => {
    expect(buildSchemePagination(10, 10)).toEqual([1, '...', 9, 10])
    expect(buildSchemePagination(8, 10)).toEqual([1, '...', 7, 8, 9, 10])
  })

  test('средние страницы с двумя многоточиями', () => {
    expect(buildSchemePagination(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10])
    expect(buildSchemePagination(6, 15)).toEqual([1, '...', 5, 6, 7, '...', 15])
  })

  test('граничные случаи для многоточий', () => {
    expect(buildSchemePagination(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
    expect(buildSchemePagination(4, 6)).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('очень большие числа', () => {
    expect(buildSchemePagination(500, 1000)).toEqual([1, '...', 499, 500, 501, '...', 1000])
    expect(buildSchemePagination(1, 1000)).toEqual([1, 2, '...', 1000])
  })

  test('граничные значения', () => {
    expect(buildSchemePagination(2, 2)).toEqual([1, 2])

    expect(buildSchemePagination(9, 10)).toEqual([1, '...', 8, 9, 10])
  })

  test('некорректные входные данные', () => {
    expect(buildSchemePagination(5, 3)).toEqual([1, 2, 3])

    expect(buildSchemePagination(0, 5)).toEqual([1, 2, 3, 4, 5])
    expect(buildSchemePagination(-1, 5)).toEqual([1, 2, 3, 4, 5])
    expect(buildSchemePagination(1, 0)).toBeNull()
  })

  test('проверка уникальности элементов', () => {
    const result = buildSchemePagination(5, 10)
    const uniqueNumbers = result.filter(item => typeof item === 'number')
    const set = new Set(uniqueNumbers)
    expect(uniqueNumbers.length).toBe(set.size)
  })

  test('проверка правильного порядка', () => {
    const result = buildSchemePagination(5, 10)
    const numbers = result.filter(item => typeof item === 'number')

    for (let i = 1; i < numbers.length; i++) {
      expect(numbers[i]).toBeGreaterThan(numbers[i - 1])
    }
  })

  test('всегда включает первую и последнюю страницу', () => {
    const testCases = [
      [3, 8],
      [7, 12],
      [15, 25],
      [50, 100],
    ]

    testCases.forEach(([current, total]) => {
      const result = buildSchemePagination(current, total)
      const numbers = result.filter(item => typeof item === 'number')
      expect(numbers[0]).toBe(1)
      expect(numbers[numbers.length - 1]).toBe(total)
    })
  })

  test('всегда включает текущую страницу', () => {
    const testCases = [
      [1, 10],
      [5, 10],
      [10, 10],
      [3, 7],
      [25, 50],
    ]

    testCases.forEach(([current, total]) => {
      const result = buildSchemePagination(current, total)
      if (result) {
        // Если не null
        expect(result).toContain(current)
      }
    })
  })
})
