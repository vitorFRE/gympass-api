import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import {expect,describe,it} from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate use case', () => {

  it('Should allow user authentication', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Lee',
      email: 'lee777@link.com',
      password_hash: await hash('123456', 6)
    })

    const {user} = await sut.execute({
      email: 'lee777@link.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
    
  })

  it('Should prevent user authentication with incorrect email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() => 
      sut.execute({
        email: 'lee777@link.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should prevent user authentication with incorrect password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Lee',
      email: 'lee777@link.com',
      password_hash: await hash('123456', 6)
    })

    expect(() => 
      sut.execute({
        email: 'lee777@link.com',
        password: '654321'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  
})