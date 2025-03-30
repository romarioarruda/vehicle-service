import path from 'path'
import { promises as fs } from 'fs'

import { VehicleModel } from '../models/vehicle.model'

const dirPath = path.resolve(__dirname, 'local')
const filePath = path.join(dirPath, 'vehicles.json')

const query= async (): Promise<VehicleModel[]> => {
    const data = await fs.readFile(filePath, 'utf-8')

    if (!data) return []
  
    return JSON.parse(data)

}

const insert = async (vehicle: VehicleModel): Promise<any> => {
    const currentVehicles = await query()
    currentVehicles.push(vehicle)

    await fs.writeFile(filePath, JSON.stringify(currentVehicles, null, 2))

    return vehicle
}

const update = async (id: string, vehicle: Partial<VehicleModel>): Promise<any> => {
    if (vehicle.id) delete vehicle.id

    const currentVehicles = await query()
    const index = currentVehicles.findIndex((vehicle) => vehicle.id === id)

    if (index === -1) return null

    const filteredNonUndefinedFields = Object.fromEntries(
        Object.entries(vehicle).filter(([key, value]) => Boolean(value))
    )

    currentVehicles[index] = { ...currentVehicles[index], ...filteredNonUndefinedFields }

    await fs.writeFile(filePath, JSON.stringify(currentVehicles, null, 2))

    return {id, ...vehicle}
}

const remove = async (id: string): Promise<string | null> => {
    const currentVehicles = await query()
    const index = currentVehicles.findIndex((vehicle) => vehicle.id === id)
    if (index === -1) return null

    currentVehicles.splice(index, 1)

    await fs.writeFile(filePath, JSON.stringify(currentVehicles, null, 2))

    return id
}

export default {
    query,
    insert,
    update,
    delete: remove
}
