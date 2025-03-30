import { VehicleDTO } from "../dtos/vehicle.dto"
import { VehicleModel } from "../models/vehicle.model"
import { DataBaseProtocol } from "../protocols/database.protocol"

export class VehicleRepository {
    constructor(private readonly db: DataBaseProtocol) {}

    async create(vehicle: VehicleDTO): Promise<VehicleModel> {
        const response = await this.db.insert(vehicle)

        return response
    }


    async update(id: string, vehicle: Partial<VehicleDTO>): Promise<VehicleModel> {
        const response = await this.db.update(id, vehicle)

        return response
    }


    async findAll(): Promise<VehicleModel[]> {
        return await this.db.query({})
    }


    async delete(id: string): Promise<string| null> {
        return await this.db.delete(id)
    }

}