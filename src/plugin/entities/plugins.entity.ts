import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {v4 as uuidv4} from "uuid";

export type PluginsDocument = Plugins & Document
@Schema()
export class Plugins {
    @Prop({
        type: String, default: function genUUID() {
            return uuidv4()
        }
    })
    _id: string

    @Prop()
    name: string

    @Prop()
    activate: boolean
}

export const PluginsSchema = SchemaFactory.createForClass(Plugins)