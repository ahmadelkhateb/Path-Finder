module.exports = (durationInMinutes) => {
    return `${parseInt(durationInMinutes / 60)}h ${durationInMinutes % 60}m`
}