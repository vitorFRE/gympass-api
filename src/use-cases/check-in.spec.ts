import {expect,describe,it, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in use case', () => {

beforeEach(() => {
   checkInRepository = new InMemoryCheckInsRepository()
   gymsRepository = new InMemoryGymsRepository()
   sut = new CheckInUseCase(checkInRepository, gymsRepository)

   gymsRepository.items.push({
    id: 'aca-01',
    title: 'Academia 01',
    description: 'uma academia',
    latitude: new Decimal(-16.446391),
    longitude: new Decimal(-51.126203),
    phone: '123456789',
  })

   vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

  it('Should allow check in creation', async () => {

    const {checkIn} = await sut.execute({
      gymId: 'aca-01',
      userId: '123',
      userLatitude: -16.446391,
      userLongitude: -51.126203
    })
    

    expect(checkIn.id).toEqual(expect.any(String))
    
  })

it('Should not allow check in twice on the same day', async () => {
  vi.setSystemTime(new Date(2021, 2, 31, 8, 0, 0))

    await sut.execute({
      gymId: 'aca-01',
      userId: '123',
      userLatitude: -16.446391,
      userLongitude: -51.126203
    })

    await expect(() => sut.execute({
      gymId: 'aca-01',
      userId: '123',
      userLatitude: -16.446391,
      userLongitude: -51.126203
    })).rejects.toBeInstanceOf(Error)
    
  })
  
it('Should allow check in twice but in different days', async () => {
  vi.setSystemTime(new Date(2021, 2, 31, 8, 0, 0))

    await sut.execute({
      gymId: 'aca-01',
      userId: '123',
      userLatitude: -16.446391,
      userLongitude: -51.126203
    })

  vi.setSystemTime(new Date(2021, 3, 1, 8, 0, 0))

    const {checkIn} = await sut.execute({
      gymId: 'aca-01',
      userId: '123',
      userLatitude: -16.446391,
      userLongitude: -51.126203
    })

    expect(checkIn.id).toEqual(expect.any(String))
    
  })

  it('Must not allow check-in away from the gym', async () => {

    gymsRepository.items.push({
    id: 'aca-02',
    title: 'Academia 01',
    description: 'uma academia',
    latitude: new Decimal(-16.446391),
    longitude: new Decimal(-51.126203),
    phone: '123456789',
  })  

   await expect(() => sut.execute({
      gymId: 'aca-02',
      userId: '123',
      userLatitude: -16.444120,
      userLongitude: -51.123316
    })).rejects.toBeInstanceOf(Error)
    
  })
  
})