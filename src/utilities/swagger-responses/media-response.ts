import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from '../enums/media.enum';

export class MediaResponseDto {
  @ApiProperty({
    description: 'ID of the service request',
    example: '60d21b4667d0d8992e610c85',
  })
  id: string;

  @ApiProperty({
    description: `Type of the event, e.g., ${Object.values(MediaType).join(', ')}`,
    enum: MediaType,
    example: MediaType.FILE,
  })
  type: MediaType;

  @ApiProperty({
    description: 'Path of the media',
    example: 'uploads/media/1729382400000.png',
  })
  path: string;

  @ApiProperty({
    description: 'Timestamp when the request was created',
    example: '2024-08-29T08:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the request was last updated',
    example: '2024-08-30T08:00:00.000Z',
  })
  updatedAt: Date;
}

export class MediaShareResponseDto {
  @ApiProperty({
    description: 'ID of the media share',
    example: '60d21b4667d0d8992e610c85',
  })
  id: string;

  @ApiProperty({
    description: 'Link of the media share',
    example: 'https://example.com/share/1234567890',
  })
  link: string;
}

export class MediaShareLinkListMediaResponseDto {
  @ApiProperty({
    description: 'Media share link',
    example: 'https://example.com/share/1234567890',
  })
  link: string;
}

export class MediaShareLinkListResponseDto {
  @ApiProperty({
    description: 'List of media',
    type: [MediaShareLinkListMediaResponseDto],
  })
  media: MediaShareLinkListMediaResponseDto[];
}
