import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {PluginsDto} from "./dto/plugins.dto";
import {PluginInstallerService} from "./installer/plugin.installer.service";
import {PluginService} from "./plugin.service";

@Controller('plugins')
export class PluginController {
    constructor(private readonly pluginInstallerService: PluginInstallerService, private readonly pluginService: PluginService) {
    }

    @Get('installed')
    getinstall() {
        return this.pluginInstallerService.findAll()
    }

    @Post('installation')
    async install(@Body() body: PluginsDto) {
        return await this.pluginInstallerService.install(body)
    }


    @Get('list')
    async getPlugins(@Query() param) {
        return await this.pluginInstallerService.pluginsList(param.directory)
    }
}