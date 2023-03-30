import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import {expect,describe,it, beforeEach} from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {

beforeEach(() => {
   usersRepository = new InMemoryUsersRepository()
   sut = new RegisterUseCase(usersRepository)
})

  it('Should allow user creation', async () => {
    const {user} = await sut.execute({
      name: 'Lee Lins',
      email: 'lee777@link.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
    
  })

  it('User password must be hashed', async () => {
    const {user} = await sut.execute({
      name: 'Lee Lins',
      email: 'lee777@link.com',
      password: '123456'
    })

    const isPasswordHashed = await compare(
      '123456',
      user.password_hash
    )
      
    expect(isPasswordHashed).toBe(true)
  })

  it('Should prevent user from creating account with duplicate email address', async () => {
    const email = 'lee779@link.com'

    await sut.execute({
      name: 'Lee Lins',
      email: email,
      password: '123456'
    })

      
    await expect(() => sut.execute({
      name: 'Lee Lins',
      email: email,
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})