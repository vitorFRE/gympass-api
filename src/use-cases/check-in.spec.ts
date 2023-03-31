import {expect,describe,it, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in use case', () => {

beforeEach(() => {
   checkInRepository = new InMemoryCheckInsRepository()
   sut = new CheckInUseCase(checkInRepository)
})

  it('Should allow check in creation', async () => {
    const {checkIn} = await sut.execute({
      gymId: '123',
      userId: '123'
    })

    expect(checkIn.id).toEqual(expect.any(String))
    
  })

  
})