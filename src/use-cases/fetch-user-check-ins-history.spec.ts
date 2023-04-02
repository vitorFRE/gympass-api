import {expect,describe,it, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch checkIns history use case', () => {

beforeEach(async () => {
   checkInRepository = new InMemoryCheckInsRepository()
   sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
})


  it('Should allow to fetch checkIns history', async () => {

    await checkInRepository.create({
      gym_id: 'Acad-01',
      user_id: '4587',
    })

    await checkInRepository.create({
      gym_id: 'Acad-02',
      user_id: '4587',
    })

    const {checkIns} = await sut.execute({
      userId: '4587',
      page: 1,
    })
    

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'Acad-01'}),
      expect.objectContaining({gym_id: 'Acad-02'}),
    ])
    
  })

  it('Should allow to fetch paginated checkIns history', async () => {

   for (let i = 1; i <= 22; i++) {
    await checkInRepository.create({
      gym_id: `Acad-${i}`	,
      user_id: '4587',
    })
   }

    const {checkIns} = await sut.execute({
      userId: '4587',
      page: 2,
    })
    

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'Acad-21'}),
      expect.objectContaining({gym_id: 'Acad-22'}),
    ]);
    
  })
  
})