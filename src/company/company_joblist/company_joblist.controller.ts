import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  UseInterceptors,
  UploadedFile,
  Res,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { CompanyJoblistService } from './company_joblist.service';
import { CreateJoblistDto } from './company_joblist.dto';
import { updateJobTitleDto } from './updateJobTitle_joblist.dto';

@Controller('job')
export class CompanyjoblistController {
  constructor(private companyJoblistService: CompanyJoblistService) {}

  @Post('addJoblist')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 60000000000 },
      storage: diskStorage({
        destination: './src/company/company_joblist/uploadedFiles',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  addCompanyProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() joblist: CreateJoblistDto,
  ) {
    try {
      
      const fileName = file.filename;
      const salary = Number(joblist.salary);
      const companyJoblist = { ...joblist, salary, file: fileName };

      return this.companyJoblistService.createJoblist(companyJoblist);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

   
   // get the cv in the postman
  @Get('/getImage/:name')
  getImages(
    @Param('name') name, @Res() res
    ) {
    return res.sendFile(name, { root: './src/company/company_joblist/uploadFiles' });
  }

  //get all company joblist
  @Get('getAllJoblist')
  getAllJoblist() {
    try {
      return this.companyJoblistService.getAllJoblist();
    } catch (error) {
      console.error('Error fetching job lists:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to retrieve job lists.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //get company joblist by id
  @Get('getJoblistByID/:jobId')
  getCompanyJoblistByID(@Param('jobId', ParseIntPipe) jobId: number) {
    try {
      return this.companyJoblistService.getJoblistById(jobId);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //update company joblist data
  @UsePipes(new ValidationPipe())
  @Put('updateAllJoblist/:jobId')
  updateAllCompanyJoblist(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() updateCompanyJoblist: CreateJoblistDto,
  ) {
    try {
     return this.companyJoblistService.updateAllJoblist(jobId,updateCompanyJoblist,);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //upadte the job title
  @UsePipes(new ValidationPipe())
  @Patch('updateJobTitle/:jobId')
  updateJobTitle(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() updateJobTitle: updateJobTitleDto,
  ) {
    try {
      return this.companyJoblistService.updateJobTitle(jobId, updateJobTitle);
    } catch (error) {
      console.error(`Error updating job title with ID ${jobId}:`, error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server  Error.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //delete company
  @Delete('deleteJoblistByID/:jobId')
  deleteCompanyjoblist(@Param('jobId') jobId: number) {
    try {
      return this.companyJoblistService.deleteJobList(jobId);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
