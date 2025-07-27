const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((cur, next) => cur + next.likes, 0)
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0
    let favBlog = null
    for (const blog of blogs) {
        if (blog.likes > maxLikes) {
            favBlog = blog
            maxLikes = blog.likes
        }
    }
    return favBlog
}

const mostBlogs = (blogs) => {
    const freqMap = new Map()
    for (const blog of blogs) {
        freqMap.set(blog.author, (freqMap.get(blog.author) || 0) + 1)
    }
    if (freqMap.size === 0) {
        return null
    } else {
        let res = {
            blogs: 0,
            author: null
        }
        freqMap.forEach( (val, key) => {
            if (val > res.blogs) {
                res.author = key
                res.blogs = val
            }
        } )
        return res
    }

}

const mostLikes = (blogs) => {
    const freqMap = new Map()
    for (const blog of blogs) {
        freqMap.set(blog.author, (freqMap.get(blog.author) || 0) + blog.likes)
    }
    if (freqMap.size === 0) {
        return null
    } else {
        let res = {
            likes: 0,
            author: null
        }
        freqMap.forEach( (val, key) => {
            if (val > res.likes) {
                res.author = key
                res.likes = val
            }
        } )
        return res
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}