import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'


describe('Create gym (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    
const {token} = await createAndAuthenticateUser(app)

    const response = await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '123456789',
      latitude: -19.8914642,
      longitude: -53.1506572,
    })

    expect(response.statusCode).toEqual(201)
  })
})