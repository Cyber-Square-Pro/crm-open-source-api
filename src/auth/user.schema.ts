import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Country } from 'src/country/country.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps:true})
export class User {
  @Prop({required: true, trim:true})
  name: string;

  @Prop({required: true, trim:true})
  email: string;

  @Prop({
    default: 'employee',
    enum: ['owner', 'admin', 'manager', 'employee', 'create_only', 'read_only']
  })
  role: string;

  @Prop({trim:true})
  photo: string;

  @Prop({trim:true, required:true})
  passwordHash: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Country.name, required: true })
  countryId: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);