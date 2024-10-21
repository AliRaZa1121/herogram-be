// mediaShare.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Media } from './media.schema'; // Import the Media schema
import { Schema as MongooseSchema } from 'mongoose';

export type MediaShareDocument = HydratedDocument<MediaShare> & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true, versionKey: false })
export class MediaShare {
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Media' }],
    required: true,
  })
  media: Media[]; // Array of media item references to be shared

  @Prop({ required: true, default: 0 })
  views: number;

  @Prop({ required: true })
  expiresAt: Date; // The expiration date of the link
}

export const MediaShareSchema = SchemaFactory.createForClass(MediaShare);
