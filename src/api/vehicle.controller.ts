import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import express, { Request, Response } from 'express'

import { VehicleDTO } from '../dtos/vehicle.dto'
import { VehicleService } from '../services/vehicle.service'
import { VehicleRepository } from '../repositories/vehicle.repository'
import localDB from '../database/local.db'

const router = express.Router()

router.post('/vehicles', async (req: Request, res: Response): Promise<any> => {
    const vehicleDTO = plainToClass(VehicleDTO, req.body)
    const errors = await validate(vehicleDTO, { groups: ['create'] })
    if (errors.length > 0) {
        return res.status(422).json({ message: 'Preencha os campos corretamente', errors })
    }

    const repository = new VehicleRepository(localDB)
    const service = new VehicleService(repository)
    
    const newVehicle = await service.create(vehicleDTO)
    return res.status(201).json(newVehicle)
})

router.get('/vehicles', async (req: Request, res: Response): Promise<any> => {
    const repository = new VehicleRepository(localDB)
    const service = new VehicleService(repository)

    const list = await service.findAll()

    return res.status(200).json(list)
})

router.put('/vehicles/:id', async (req: Request, res: Response): Promise<any> => {
    const vehicleDTO = plainToClass(VehicleDTO, req.body)
    const errors = await validate(vehicleDTO, { groups: ['update'] })
    if (errors.length > 0) {
        return res.status(422).json({ message: 'Preencha os campos corretamente', errors })
    }

    const repository = new VehicleRepository(localDB)
    const service = new VehicleService(repository)

    const response = await service.update(req.params.id, vehicleDTO)
    if (!response) {
        return res.status(422).json({ message: 'Veículo não encontrado.'})
    }

    return res.status(200).json(response)
})

router.delete('/vehicles/:id', async (req: Request, res: Response): Promise<any> => {
    const repository = new VehicleRepository(localDB)
    const service = new VehicleService(repository)

    const deletedVehicleId = await service.delete(req.params.id)
    if (!deletedVehicleId) {
        return res.status(422).json({ message: 'Veículo não encontrado.'})
    }

    return res.status(200).json([deletedVehicleId])
})

export default router