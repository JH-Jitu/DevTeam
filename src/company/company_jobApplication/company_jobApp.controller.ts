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
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { MulterError, diskStorage } from 'multer';
  import { CompanyJobApplicationService } from './company_jobApplication.service';
import { CreateJobApplicationDto } from './company_jobapplication.dto';
import { updateApplicantEmailDto } from './updateApplicationEmail.dto';

  
  @Controller('jobApply')
  export class CompanyJobApplicationController {
    constructor(private companyJobApplicationService: CompanyJobApplicationService) {}
  
    //add job application
    @Post('addJobApplication')
    @UsePipes(new ValidationPipe())
    addJobApplication(
      @Body() addApply: CreateJobApplicationDto) {
      return this.companyJobApplicationService.createJobApplication(addApply);
    }
  
    //get all job application
    @Get('getAllJobApplication')
    getAllJobApplication() {
      return this.companyJobApplicationService.getAllJobApplication();
    }
  
    //get company joblist by id
    @Get('getJobApplicationByID/:applicationId')
    getCompanyJobapplicationByID(
      @Param('applicationId', ParseIntPipe) applicationId: number) {
      return this.companyJobApplicationService.getJobApplicationById(applicationId);
    }
  
    //update company joblist data
    @Put('updateAllJobApplication/:applicationId')
    updateAllCompanyJobApplication(
      @Param('applicationId', ParseIntPipe) applicationId: number,
      @Body() updateCompanyJobApplication: CreateJobApplicationDto,
    ) {
      return this.companyJobApplicationService.updateAllJobApplication(
        applicationId,
        updateCompanyJobApplication,
      );
    }
  
    //upadte the application email
    @Patch('updateApplicantEmail/:applicationId')
    updateApplicantEmail(
      @Param('applicationId', ParseIntPipe) applicationId: number,
      @Body() updateApplicatEmail: updateApplicantEmailDto,
    ) {
      return this.companyJobApplicationService.updateApplicantEmail(applicationId, updateApplicatEmail);
    }
  
    //delete company
    @Delete('deleteJoblistByID/:applicationId')
    deleteCompanyJobApplication(
      @Param('applicationId') applicationId: number) {
      return this.companyJobApplicationService.deleteJobapplication(applicationId);
    }
  
    //add CV or Resume
    @Post('uploadCV')
    @UseInterceptors(
      FileInterceptor('file', {
        fileFilter: (req, file, cb) => {
          if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
            cb(null, true);
          else {
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
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        // const fileName = file.filename;
        // return this.companyJobApplicationService.cvFileName(fileName);
        return file;
    }
  
    // get the cv in the postman
    @Get('/getImage/:name')
    getImages(@Param('name') name, @Res() res) {
      return res.sendFile(name, { root: './src/company/company_jobApplication/uploadedCVs' });
    }
  }
  