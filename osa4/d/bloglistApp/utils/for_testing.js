const reverse = (s) => {
    return s
        .split('')
        .reverse()
        .join('')
}

const average = (arr) => {
    const sum = (prev, next) => {
        return prev + next
    }
    return arr.length === 0 
        ? 0
        : arr.reduce(sum, 0) / arr.length
}

module.exports = {
    reverse,
    average
}