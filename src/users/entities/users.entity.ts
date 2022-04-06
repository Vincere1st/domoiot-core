import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ type: String, default: function genUUID() {
            return uuidv4()
        }})
    _id: string

    @Prop()
    username: string

    @Prop()
    email: string

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)