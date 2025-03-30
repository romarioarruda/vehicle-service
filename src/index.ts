import express from 'express'

import vehicleControllers from './api/vehicle.controller'

const app = express()
const port = 3000

app.use(express.json())

app.use('/api', vehicleControllers)


app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})
