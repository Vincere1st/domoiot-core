import { Inject, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class PluginService {
    constructor(@Inject('FOLDER') private folder) {
    }

    get(): string {
        let pathToFolder
        const isFile = fileName => {
            return fs.lstatSync(fileName).isFile()
        }
        try {
            if (!fs.existsSync(this.folder)) {
                fs.mkdirSync(this.folder)
            } else {
                pathToFolder = fs.readdirSync(this.folder).map(fileName => {
                    return path.join(this.folder, fileName)
                }).filter(isFile)
            }
        } catch (err) {
            console.error(err)
        }
        return pathToFolder
    }
}