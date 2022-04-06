import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {PluginsDto} from "./dto/plugins.dto";
import {Plugins} from "./entities/plugins.entity";
import {UseInterceptors} from "@nestjs/common";
import MongooseClassSerializerInterceptor from "@/interceptors/mongooseClassSerializerInterceptor";

export class PluginsRepository {
    constructor(@InjectModel(Plugins.name) private pluginModel: Model<PluginsDto>) {
    }
    @UseInterceptors(MongooseClassSerializerInterceptor(PluginsDto))
    async add(addPluginDto: PluginsDto): Promise<PluginsDto> {
        const addPlugin = new this.pluginModel(addPluginDto)
        return addPlugin.save()
    }

    async findAll(): Promise<PluginsDto[]> {
        return this.pluginModel.find().exec()
    }
}