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
  import { CompanyJobApplicationService } from './company_jobApplication.service';
  import { CreateJobApplicationDto } from './company_jobapplication.dto';
 import { updateApplicantEmailDto } from './updateApplicationEmail.dto';

  
  @Controller('jobApply')
  export class CompanyJobApplicationController {
    constructor(private companyJobApplicationService: CompanyJobApplicationService) {}
  
    @Post('addJobApply')
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
        destination: './src/company/company_jobApplication/uploadedCVs',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  addCompanyProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() addApply: CreateJobApplicationDto,
  ) {
    try {
      const fileName = file.filename;
      const companyJobApplication = { ...addApply, file: fileName };
      return this.companyJobApplicationService.createJobApplication(companyJobApplication);
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
  
    // get image in the postman
    @Get('/getImage/:name')
    getImages(
      @Param('name') name, @Res() res
      ) {
      return res.sendFile(name, { root: './src/company/company_jobApplication/uploadedCVs' });
    }

    // all job application 
    @Get('getAllJobApplication')
    getAllJobApplication() {
    try {
      return this.companyJobApplicationService.getAllJobApplication();
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
  
  //get job application by id
  @Get('getJobApplicationByID/:applicationId')
  getCompanyJoblistByID(@Param('applicationId', ParseIntPipe) applicationId: number) {
    try {
      const jobApp = this.companyJobApplicationService.getJobApplicationById(applicationId);
      return jobApp;
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
  //update all job application data
  @UsePipes(new ValidationPipe())
  @Put('updateAllJobApplication/:applicationId')
  updateAllCompanyJobApplication(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Body() updateCompanyJobApplication: CreateJobApplicationDto,
  ) {
    try {
      return this.companyJobApplicationService.updateAllJobApplication(applicationId,updateCompanyJobApplication);
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
    //upadte the applicant email
    @UsePipes(new ValidationPipe())
    @Patch('updateApplicantEmail/:applicationId')
    updateApplicantEmail(
      @Param('applicationId', ParseIntPipe) applicationId: number,
      @Body() updateApplicantEmail: updateApplicantEmailDto,
    ) {
      try {
        return this.companyJobApplicationService.updateApplicantEmail(applicationId,updateApplicantEmail,);
      } catch (error) {
        console.error(`Error updating applicant email for job application with ID ${applicationId}:`, error);
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    //delete job application
    @Delete('deleteJobApplicationByID/:applicationId')
    deleteCompanyJobApplication(@Param('applicationId') applicationId: number) {
    try {
      return this.companyJobApplicationService.deleteJobapplication(applicationId);

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


  