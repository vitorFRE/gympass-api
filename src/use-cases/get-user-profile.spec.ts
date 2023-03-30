import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import {expect,describe,it, beforeEach} from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('Should allow to get user profile', async () => {

    const createdUser = await usersRepository.create({
      name: 'Lee',
      email: 'lee777@link.com',
      password_hash: await hash('123456', 6)
    })

    const {user} = await sut.execute({
      userID: createdUser.id
    })

    expect(user).toHaveProperty('id')
    expect(user.name).toEqual('Lee')
  })

  it('Should prevent to get user profile with wrong id', async () => {

    expect(() => 
      sut.execute({
        userID: 'wrong-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})