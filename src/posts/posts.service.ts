import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Public } from 'src/auth/public-decorator';

@Injectable()
export class PostsService {
  constructor(private prismaservice: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const getUser = await this.prismaservice.user.findUniqueOrThrow({
      where: {
        id: createPostDto.userId,
      },
    });

    if (getUser) {
      return this.prismaservice.post.create({
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
    return this.prismaservice.post.findMany();
  }

  findOne(id: string) {
    return this.prismaservice.post.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.prismaservice.post.update({
      where: {
        id,
      },
      data: {
        content: updatePostDto.content,
      },
    });
  }

  remove(id: string) {
    return this.prismaservice.post.delete({
      where: {
        id,
      },
    });
  }
}
