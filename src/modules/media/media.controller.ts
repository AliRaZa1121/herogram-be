import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getFileData, storage } from 'src/helpers/media.helper';
import { MediaService } from './media.service';
import { BaseResponseDto } from 'src/utilities/swagger-responses/base-response';
import {
  MediaResponseDto,
  MediaShareLinkListResponseDto,
  MediaShareResponseDto,
} from 'src/utilities/swagger-responses/media-response';
import { CreateMediaLinkDto } from './dto/create-media-link.dto';

@Controller('media')
@ApiTags('Media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ): Promise<BaseResponseDto<MediaResponseDto>> {
    const payload = await getFileData(file);
    return await this.mediaService.uploadFile(payload);
  }

  @Delete('file/:id')
  async deleteFile(@Param('id') id: string): Promise<BaseResponseDto<any>> {
    return await this.mediaService.deleteFile(id);
  }

  @Post('/generate-share-link')
  @ApiResponse({ status: HttpStatus.CREATED, type: MediaShareResponseDto })
  async generateShareLink(
    @Body() body: CreateMediaLinkDto,
  ): Promise<BaseResponseDto<MediaShareResponseDto>> {
    return await this.mediaService.generateShareLink(body);
  }

  @Get('share-link/:id')
  @ApiResponse({ status: HttpStatus.OK, type: MediaShareLinkListResponseDto })
  async getShareLinkMedia(
    @Param('id') id: string,
  ): Promise<BaseResponseDto<any>> {
    return await this.mediaService.getShareLinkMedia(id);
  }
}
