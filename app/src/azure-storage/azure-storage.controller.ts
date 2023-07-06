import { Controller, Get, Header, Post, UploadedFile, UseInterceptors, Res, Query, Delete, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureStorageService } from './azure-storage.service';

@Controller('azure-storage')
export class AzureStorageController {
    constructor(private readonly storageService: AzureStorageService){}

    @Post()
    @UseInterceptors(FileInterceptor('myfile'))
    async upload(@UploadedFile() file: Express.Multer.File): Promise<string>{
        await this.storageService.UploadFile(file);
        return "uploaded";
    }

    @Get()
    @Header('Content-Type','image/webp')
    async ReadFile(@Res() res,@Query('filename') filename){
        const file = await this.storageService.ReadFile(filename);
        return file.pipe(res);
    }

    @Get('/download')
    @Header('Content-Type','image/webp')
    @Header('Content-Disposition', 'attachment; filename=test.png')
    async DownloadFile(@Res() res,@Query('filename') filename){
        const file = await this.storageService.ReadFile(filename);
        return file.pipe(res);
    }

    @Delete()
    async DeleteFile(@Req() req){
        await this.storageService.DeleteFile(req.body.filename);
        return "deleted";
    }
}
