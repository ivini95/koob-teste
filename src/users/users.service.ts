import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        biography: createUserDto.biography,
        birthdayDate: createUserDto.birthdayDate,
        password: bcrypt.hashSync(createUserDto.password, 8),
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        birthdayDate: updateUserDto.birthdayDate,
        biography: updateUserDto.biography,
      },
    });
  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { posts: true },
    });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    for (const post of user.posts) {
      await this.prismaService.post.delete({ where: { id: post.id } });
    }

    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
