const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
    const listWithOneBlog = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
        }
    ]
    test('one blog should return its likes', () => {
        assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
    })

    test('empty list should return zero', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    const listWithMultiple = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
        },
        {
        _id: '5a422aa71b54a676244d17f9',
        title: 'Sustained success',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Sustained_Success.html',
        likes: 25,
        __v: 0
        }
    ]
    test('multiple should be summed', () => {
        assert.strictEqual(listHelper.totalLikes(listWithMultiple), 30)
    })
})


describe('favorite blog', () => {
    const listWithOneBlog = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
        }
    ]
    test('one blog should return the single element', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
    })

    const listWithMultiple = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
        },
        {
        _id: '5a422aa71b54a676244d17f9',
        title: 'Sustained success',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Sustained_Success.html',
        likes: 25,
        __v: 0
        }
    ]
    const moreLiked = listWithMultiple[1]
    test('multiple should return one with more likes', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(listWithMultiple), moreLiked)
    })

    test('empty list should return null', () => {
        assert.strictEqual(listHelper.favoriteBlog([]), null)
    })
})

describe('mostBlogs', () => {
    const manyBlogs = [
            {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
    ]
    test('should find the one with most authored through many blogs', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(manyBlogs), {author: "Robert C. Martin", blogs: 3})
    })
    
    const oneBlog = [{
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }]
    test('should return the single author with only one blog', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(oneBlog), {author: "Robert C. Martin", blogs: 1})
    })

    test('on empty list should return null', () => {
        assert.deepStrictEqual(listHelper.mostBlogs([]), null)
    })
})

describe('mostLikes', () => {
    const manyBlogs = [
            {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
    ]
    test('should find the one with most likes through many blogs', () => {
        assert.deepStrictEqual(listHelper.mostLikes(manyBlogs), {author: "Edsger W. Dijkstra", likes: 17})
    })
    
    const oneBlog = [{
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }]
    test('should return the single author with only one blog', () => {
        assert.deepStrictEqual(listHelper.mostLikes(oneBlog), {author: "Robert C. Martin", likes: 2})
    })

    test('on empty list should return null', () => {
        assert.deepStrictEqual(listHelper.mostLikes([]), null)
    })
})