import {Injectable} from "@nestjs/common";
import {PluginsRepository} from "../plugin.repository";
import {PluginsDto} from "../dto/plugins.dto";
import * as fs from "fs/promises";
import {readFile} from "fs/promises";
import * as path from 'path'

export interface VueFrontPlugin {
    name: string
    content: string
}

@Injectable()
export class PluginInstallerService {
    constructor(private readonly pluginRepository: PluginsRepository) {
    }

    async findAll(): Promise<PluginsDto[]> {
        return await this.pluginRepository.findAll()
    }

    async install(body: PluginsDto): Promise<PluginsDto> {
        return await this.pluginRepository.add(body)
    }

    async pluginsList(directory) {
        // const filesToReturn = []
        const filesToReturn: VueFrontPlugin[] = []

        // TODO secure path
        const projectDirectory = '../../../../frontend/public/'
        const directoryPath = path.join(__dirname, projectDirectory + directory)
        await fs.readdir(directoryPath).then(async (files) => {
            for (const file of files) {
                const filenameSpliting = file.split('.')
                if (filenameSpliting.length > 2) {
                    throw new Error('Le nom du fichier ne peut avoir plusieurs \'.\'')
                }
                const content = await readFile('/project/frontend/public/' + directory + '/' + file, 'utf8')

                // Add to doc forbidden filename with multipledot use only camelCase
                // filesToReturn.push({[file]: content})
                filesToReturn.push({name: file, content: content})
            }
        }).catch(err => {
            throw new Error('Impossible de lire le dossier')
        })
        return filesToReturn
    }
}