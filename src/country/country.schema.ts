import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps:true})
export class Country extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  iso3: string;

  @Prop()
  iso2: string;

  @Prop()
  numericCode: string;

  @Prop()
  phoneCode: string;

  @Prop()
  capital: string;

  @Prop()
  currency: string;

  @Prop({ name: 'currencyName' }) // Map 'currencyName' field to 'currencyName' in the document
  currencyName: string;

  @Prop({ name: 'currencySymbol' }) // Map 'currencySymbol' field to 'currencySymbol' in the document
  currencySymbol: string;

  @Prop()
  tld: string;

  @Prop()
  native: string;

  @Prop()
  region: string;

  @Prop({ name: 'regionId' })
  regionId: string;

  @Prop()
  subregion: string;

  @Prop({ name: 'subregionId' })
  subregionId: string;

  @Prop()
  nationality: string;

  @Prop({ type: [{ zoneName: String, gmtOffset: Number, gmtOffsetName: String, abbreviation: String, tzName: String }] })
  timezones: {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
  }[];

  @Prop({ type: Map, of: String })
  translations: Map<string, string>;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop()
  emoji: string;

  @Prop()
  emojiU: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
