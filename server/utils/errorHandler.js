const errorHandler = (res) => res.status(500).json({ error: 'server error', message: 'server has failed' })

module.exports = errorHandler
