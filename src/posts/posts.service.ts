import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const getUser = await this.prismaService.user.findUniqueOrThrow({
      where: {
        id: createPostDto.userId,
      },
    });

    if (getUser) {
      return this.prismaService.post.create({
        data: {
          content: createPostDto.content,
          userId: createPostDto.userId,
        },
      });
    } else {
      return getUser;
    }
  }

  findAll() {
    return this.prismaService.post.findMany();
  }

  findOne(id: string) {
    return this.prismaService.post.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        content: updatePostDto.content,
      },
    });
  }

  async remove(id: string) {
    await this.prismaService.post.findUniqueOrThrow({
      where: { id },
    });

    return this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }
}
