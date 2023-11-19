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
   @Post('addJobApply')
   @UseInterceptors(
     FileInterceptor('file', {
       fileFilter: (req, file, cb) => {
         if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf)$/))
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
   @UsePipes(new ValidationPipe())
   addCompanyProfile(@UploadedFile() file: Express.Multer.File,
   @Body() addApply: CreateJobApplicationDto,
   ) {
     const fileName = file ? file.filename : null;
     const companyJobApplication = {...addApply,file: fileName,};
     return this.companyJobApplicationService.createJobApplication(companyJobApplication); 
   }
    
    // get the cv in the postman
    @Get('/getImage/:name')
    getImages(
      @Param('name') name, @Res() res
      ) {
      return res.sendFile(name, { root: './src/company/company_jobApplication/uploadedCVs' });
    }
    
    
    
    
    
    
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
    @Delete('deleteJobApplicationByID/:applicationId')
    deleteCompanyJobApplication(
      @Param('applicationId') applicationId: number) {
      return this.companyJobApplicationService.deleteJobapplication(applicationId);
    }
  }
  