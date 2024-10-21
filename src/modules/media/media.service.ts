import { HttpStatus, Injectable } from '@nestjs/common';
import { successApiWrapper } from 'src/utilities/constant/response-constant';
import { BaseResponseDto } from 'src/utilities/swagger-responses/base-response';
import {
  MediaResponseDto,
  MediaShareLinkListMediaResponseDto,
  MediaShareLinkListResponseDto,
  MediaShareResponseDto,
} from 'src/utilities/swagger-responses/media-response';
import { DatabaseService } from '../database/database.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { CreateMediaLinkDto } from './dto/create-media-link.dto';

@Injectable()
export class MediaService {
  constructor(private _databaseService: DatabaseService) {}

  async uploadFile(
    createMediaDto: CreateMediaDto,
  ): Promise<BaseResponseDto<MediaResponseDto>> {
    const { type, path } = createMediaDto;
    const media = await this._databaseService.mediaModel.create({
      type,
      path,
    });

    const mediaResponse: MediaResponseDto = {
      id: media._id.toString(),
      type: media.type,
      path: media.path,
      createdAt: media.createdAt,
      updatedAt: media.updatedAt,
    };

    return successApiWrapper(
      mediaResponse,
      `Media uploaded successfully`,
      HttpStatus.CREATED,
    );
  }

  async deleteFile(id: string): Promise<BaseResponseDto<any>> {
    await this._databaseService.mediaModel.findByIdAndDelete(id);
    return successApiWrapper(null, `Media deleted successfully`, HttpStatus.OK);
  }

  async generateShareLink(
    body: CreateMediaLinkDto,
  ): Promise<BaseResponseDto<MediaShareResponseDto>> {
    const { files } = body;

    const mediaShare = await this._databaseService.mediaShareModel.create({
      media: files,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 day
      views: 0,
    });

    return successApiWrapper(
      {
        id: mediaShare._id.toString(),
        link:
          process.env.FRONTEND_URL +
          '/media/share-link?id=' +
          mediaShare._id.toString(),
      },
      `Share link generated successfully`,
      HttpStatus.CREATED,
    );
  }

  async getShareLinkMedia(
    id: string,
  ): Promise<BaseResponseDto<MediaShareLinkListResponseDto>> {
    const mediaShare = await this._databaseService.mediaShareModel.findById(id);

    await this._databaseService.mediaShareModel.findByIdAndUpdate(id, {
      $inc: { views: 1 },
    });

    const mediaList = await this._databaseService.mediaModel.find({
      _id: { $in: mediaShare.media },
    });

    const mediaResponse: MediaShareLinkListMediaResponseDto[] = mediaList.map(
      (media) => ({
        link: `${process.env.APP_URL}/${media.path}`,
        name: media.type,
      }),
    );

    return successApiWrapper(
      {
        media: mediaResponse,
      },
      `Media fetched successfully`,
      HttpStatus.OK,
    );
  }
}
