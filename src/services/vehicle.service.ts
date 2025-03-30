import { VehicleDTO } from "../dtos/vehicle.dto"
import { VehicleModel } from "../models/vehicle.model"
import { VehicleRepository } from "../repositories/vehicle.repository"

export class VehicleService {
    constructor(
        private readonly repository: VehicleRepository
    ) {}

    async create(vehicle: VehicleDTO): Promise<VehicleModel> {
        return this.repository.create(vehicle)
    }

    async update(id: string, vehicle: Partial<VehicleDTO>): Promise<VehicleModel> {
        return this.repository.update(id, vehicle)
    }

    async findAll(params = {}): Promise<VehicleModel[]> {
        return this.repository.findAll()
    }

    async delete(id: string): Promise<string| null> {
        return await this.repository.delete(id)
    }
}