import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'


describe('Nearby gyms (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyyms', async () => {
    
const {token} = await createAndAuthenticateUser(app)

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Blue Gym',
      description: 'Gym 1 description',
      phone: '123456789',
      latitude: -16.446391,
      longitude: -51.126203,
    })

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Red Gym',
      description: 'Gym 2 description',
      phone: '123216789',
      latitude: -19.8914642,
      longitude: -53.1506572,
    })

    const response = await request(app.server)
    .get('/gyms/nearby')
    .query({
      latitude: -16.446391,
      longitude: -51.126203,
    })
    .set('Authorization', `Bearer ${token}`)
    .send()


    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Blue Gym',
      })
    ])
  })
})