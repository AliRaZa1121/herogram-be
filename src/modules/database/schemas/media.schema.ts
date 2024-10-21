import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MediaType } from 'src/utilities/enums/media.enum';

export type MediaDocument = HydratedDocument<Media> & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true, versionKey: false })
export class Media {
  @Prop({ required: true, enum: MediaType, default: MediaType.FILE })
  type: MediaType;

  @Prop({ required: true })
  path: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
