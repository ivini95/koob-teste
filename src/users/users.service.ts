import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

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

  remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
