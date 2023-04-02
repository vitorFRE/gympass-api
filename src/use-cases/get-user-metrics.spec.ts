import {expect,describe,it, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics use case', () => {

beforeEach(async () => {
   checkInRepository = new InMemoryCheckInsRepository()
   sut = new GetUserMetricsUseCase(checkInRepository)
})


  it('Should be able to get check-ins count from metrics', async () => {

    await checkInRepository.create({
      gym_id: 'Acad-01',
      user_id: '4587',
    })

    await checkInRepository.create({
      gym_id: 'Acad-02',
      user_id: '4587',
    })

    const {checkInsCount} = await sut.execute({
      userId: '4587',
    })
    

    expect(checkInsCount).toEqual(2)
    
  })
  
})