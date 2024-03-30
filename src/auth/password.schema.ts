import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type PasswordDocument = HydratedDocument<Password>;

@Schema({timestamps:true})
export class Password {
  @Prop({trim:true, required:true})
  passwordHash: string;

  @Prop({required:true, type: Boolean, default:true})
  isActive: boolean;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  userId: mongoose.Types.ObjectId;
}

export const PasswordSchema = SchemaFactory.createForClass(Password);