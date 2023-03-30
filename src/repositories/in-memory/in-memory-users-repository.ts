import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '341',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}