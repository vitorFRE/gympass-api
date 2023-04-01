
import {expect,describe,it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym use case', () => {

beforeEach(() => {
  gymsRepository = new InMemoryGymsRepository()
   sut = new CreateGymUseCase(gymsRepository)
})

  it('Should allow gym creation', async () => {
    const {gym} = await sut.execute({
      title: 'Ulix Gym',
      description: null,
      phone: null,
      latitude: -16.446391,
      longitude: -51.126203,
    })

    expect(gym).toHaveProperty('id')
    
  })

})