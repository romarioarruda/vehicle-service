import sinon from "sinon"
import { expect } from 'chai'

import { VehicleDTO } from '../../src/dtos/vehicle.dto'
import { VehicleModel } from '../../src/models/vehicle.model'
import { VehicleService } from '../../src/services/vehicle.service'
import { VehicleRepository } from '../../src/repositories/vehicle.repository'

const mockVehicleModel: VehicleModel = {
	id: '1',
	placa: 'ABC1234',
	chassi: '1234567890',
	renavam: '987654321',
	modelo: 'Fusca',
	marca: 'Volkswagen',
	ano: 1980,
}

const mockVehicleDTO: VehicleDTO = {
    id: '1',
	placa: 'ABC1234',
	chassi: '1234567890',
	renavam: '987654321',
	modelo: 'Fusca',
	marca: 'Volkswagen',
	ano: 1980,
}

describe('CRUD de Veículos', () => {
    let vehicleService: VehicleService
    let vehicleRepositoryStub: sinon.SinonStubbedInstance<VehicleRepository>

	beforeEach(() => {
        vehicleRepositoryStub = sinon.createStubInstance(VehicleRepository)
        vehicleService = new VehicleService(vehicleRepositoryStub)
    })
    
    afterEach(() => {
      sinon.restore()
    })

	describe("create", () => {
        it("should create a new vehicle", async () => {
            vehicleRepositoryStub.create.resolves(mockVehicleModel)
            const vehicle = await vehicleService.create(mockVehicleDTO)

            expect(vehicle).to.have.property('id')
            expect(vehicle.placa).to.equal(mockVehicleDTO.placa)
            expect(vehicle.chassi).to.equal(mockVehicleDTO.chassi)
            expect(vehicle.renavam).to.equal(mockVehicleDTO.renavam)
            expect(vehicle.modelo).to.equal(mockVehicleDTO.modelo)
            expect(vehicle.marca).to.equal(mockVehicleDTO.marca)
            expect(vehicle.ano).to.equal(mockVehicleDTO.ano)
        })
    })    

	describe("update", () => {
        it("should update a vehicle", async () => {
            const updatedDTO: Partial<VehicleDTO> = { modelo: 'Gol', ano: 1990 }
            const updatedVehicle: VehicleModel = { ...mockVehicleModel, ...updatedDTO }
        
            vehicleRepositoryStub.update.resolves(updatedVehicle)
        
            const result = await vehicleService.update(mockVehicleModel.id, updatedDTO)
        
            expect(result).to.have.property('id')
            expect(result.modelo).to.equal(updatedDTO.modelo)
            expect(result.ano).to.equal(updatedDTO.ano)
        })
    })

    describe('findAll', () => {
        it('should return all vehicles', async () => {
          const mockVehicle: VehicleModel = {
            id: '1',
            placa: mockVehicleDTO.placa,
            chassi: mockVehicleDTO.chassi,
            renavam: mockVehicleDTO.renavam,
            modelo: mockVehicleDTO.modelo,
            marca: mockVehicleDTO.marca,
            ano: mockVehicleDTO.ano,
          }
    
          vehicleRepositoryStub.findAll.resolves([mockVehicle])
    
          const vehicles = await vehicleService.findAll()
    
          expect(vehicles).to.be.an('array')
          expect(vehicles).to.have.lengthOf(1)
          expect(vehicles[0]).to.have.property('id')
          expect(vehicles[0].placa).to.equal(mockVehicleDTO.placa)
        })
    })

    describe('delete', () => {
        it('should delete an existing vehicle', async () => {
          const vehicle: VehicleModel = {
            id: '1',
            placa: mockVehicleDTO.placa,
            chassi: mockVehicleDTO.chassi,
            renavam: mockVehicleDTO.renavam,
            modelo: mockVehicleDTO.modelo,
            marca: mockVehicleDTO.marca,
            ano: mockVehicleDTO.ano,
          }
    
          vehicleRepositoryStub.delete.resolves(vehicle.id)
    
          const deletedId = await vehicleService.delete(vehicle.id)
    
          expect(deletedId).to.equal(vehicle.id)
        })
    })
})
