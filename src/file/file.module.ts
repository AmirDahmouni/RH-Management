import { Module } from "@nestjs/common";
import {FileResolver} from "./file.resolver"


@Module({
    imports: [],
    providers: [ FileResolver ],
    exports:[]
})
export class FileModule {}