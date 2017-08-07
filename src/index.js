import express from 'express'

const app = express()

app.listen(process.env.NODE_ENV || 8080)
