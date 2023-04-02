import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import {expect,describe,it, beforeEach} from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use case', () => {

beforeEach(async () => {
   gymsRepository = new InMemoryGymsRepository()
   sut = new SearchGymsUseCase(gymsRepository)
})


  it('Should allow to search for gyms', async () => {

    await gymsRepository.create({
      title: 'Academia 01',
      description: null,
      phone: null,
      latitude: -16.446391,
      longitude: -51.126203,
    })

    await gymsRepository.create({
      title: 'Academia 02',
      description: null,
      phone: null,
      latitude: -16.446391,
      longitude: -51.126203,
    })

    const {gyms} = await sut.execute({
      query: 'Academia 01',
      page: 1,
    })
    

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'Academia 01'}),
    ])
    
  })

  it('Should allow to fetch paginated gyms search', async () => {

    for (let i = 1; i <= 22; i++) {
     await gymsRepository.create({
       title: `Academia ${i}`,
       description: null,
       phone: null,
       latitude: -16.446391,
       longitude: -51.126203,
     })
    }
 
     const {gyms} = await sut.execute({
       query: 'Academia',
       page: 2,
     })
     
 
     expect(gyms).toHaveLength(2);
     expect(gyms).toEqual([
       expect.objectContaining({title: 'Academia 21'}),
       expect.objectContaining({title: 'Academia 22'}),
     ]);
     
   })
  
})