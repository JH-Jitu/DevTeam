// company.controller.ts
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompanyService } from './company.service';
import { CreateCompanyDTO } from './company.dto';
import { MulterError, diskStorage } from 'multer';
import { CreateAvailableJobsDTO } from './jobs.dto';
import { AvailableJobsService } from './jobs.service';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly availableJobsService: AvailableJobsService,
  ) {}

  @Post('create-company')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('imageName', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/)) cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },

      limits: { fileSize: 6000000 },

      storage: diskStorage({
        destination: './uploads',

        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  createCompany(
    @Body() companyDTO: CreateCompanyDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const fileName = file ? file.filename : null;
      const result = { ...companyDTO, imageName: fileName };

      return this.companyService.createCompanyEntity(result);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Jobs
  @Post('create-job')
  @UsePipes(new ValidationPipe())
  createAvailableJobs(@Body() availableJobsDTO: CreateAvailableJobsDTO) {
    try {
      console.log(availableJobsDTO);
      return this.availableJobsService.createAvailableJobsEntity(
        availableJobsDTO,
      );
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}