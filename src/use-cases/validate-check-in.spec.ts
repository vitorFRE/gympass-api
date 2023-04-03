import {expect,describe,it, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInValidateUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInValidateUseCase

describe('Validate check in use case', () => {

beforeEach(async () => {
  checkInRepository = new InMemoryCheckInsRepository()
  sut = new CheckInValidateUseCase(checkInRepository)


  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

  it('Should allow to validate the check-in', async () => {

    const createdCheckIn = await checkInRepository.create({
      user_id: '123',
      gym_id: 'aca-01',
    })

    const {checkIn} = await sut.execute({
      checkInId: createdCheckIn.id
    })
    

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
    
  })

  it('Should not allow to validate an inexistent check-in', async () => {
    await expect(() => sut.execute({
      checkInId: 'Ine-0930'
    }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
    
  })

  it('Should not be able to validate the check-in adter 20 minutes of creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 14, 55))

    const createdCheckIn = await checkInRepository.create({
      user_id: '123',
      gym_id: 'aca-01',
    })

    const twentyOneMinutesInMs = 21 * 60 * 1000
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() => sut.execute({
      checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(Error)
    
  })
  
})