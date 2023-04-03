import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import {expect,describe,it, beforeEach} from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms use case', () => {

beforeEach(async () => {
   gymsRepository = new InMemoryGymsRepository()
   sut = new FetchNearbyGymsUseCase(gymsRepository)
})


  it('Should allow to fetch nearby gyms', async () => {

    await gymsRepository.create({
      title: 'Academia Perto',
      description: null,
      phone: null,
      latitude: -16.446391,
      longitude: -51.126203,
    })

    await gymsRepository.create({
      title: 'Academia Longe',
      description: null,
      phone: null,
      latitude: -19.8914642,
      longitude: -53.1506572,
    })

    const {gyms} = await sut.execute({
      userLatitude: -16.446391,
      userLongitude: -51.126203
    })
    

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'Academia Perto'}),
    ])
    
  })
  
})