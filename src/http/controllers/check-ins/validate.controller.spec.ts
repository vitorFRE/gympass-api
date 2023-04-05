import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'


describe('Validate checkIn (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a checkIn', async () => {
    
const {token} = await createAndAuthenticateUser(app)

const user = await prisma.user.findFirstOrThrow()

const gym = await prisma.gym.create({
  data: {
    title: 'Hum Gym',
      latitude: -19.8914642,
      longitude: -53.1506572,
  }
})

let checkIn = await prisma.checkIn.create({
  data: {
    user_id: user.id,
    gym_id: gym.id
  },
})


    const response = await request(app.server)
    .patch(`/check-ins/${checkIn.id}/validate`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    
    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))

  })
})