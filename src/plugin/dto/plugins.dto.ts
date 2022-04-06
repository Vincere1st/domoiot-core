import {Exclude, Expose} from "class-transformer";
import {IsDefined} from "@nestjs/class-validator";

@Exclude()
export class PluginsDto {
    @Expose()
    _id: string

    @Expose()
    @IsDefined()
    name: string

    @Expose()
    activate: string
}