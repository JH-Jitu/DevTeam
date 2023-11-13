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
import { CompanyJoblistService } from './company_joblist.service';
import { CreateJoblistDto } from './company_joblist.dto';
import { updateJobTitleDto } from './updateJobTitle_joblist.dto';

@Controller('job')
export class CompanyjoblistController {
  constructor(private companyJoblistService: CompanyJoblistService) {}

  //add company joblist
  @Post('addJoblist')
  @UsePipes(new ValidationPipe())
  addJoblist(
    @Body() addData: CreateJoblistDto) {
    return this.companyJoblistService.createJoblist(addData);
  }

  //get all company joblist
  @Get('getAllJoblist')
  getAllJoblist() {
    return this.companyJoblistService.getAllJoblist();
  }

  //get company joblist by id
  @Get('getJoblistByID/:jobId')
  getCompanyJoblistByID(
    @Param('joblistId', ParseIntPipe) jobId: number) {
    return this.companyJoblistService.getJoblistById(jobId);
  }

  //update company joblist data
  @Put('updateAllJoblist/:jobId')
  updateAllCompanyJoblist(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() updateCompanyJoblist: CreateJoblistDto,
  ) {
    return this.companyJoblistService.updateAllJoblist(
      jobId,
      updateCompanyJoblist,
    );
  }

  //upadte the job title
  @Patch('updateJobTitle/:joblistId')
  updateJobTitle(
    @Param('joblistId', ParseIntPipe) jobId: number,
    @Body() updateJobTitle: updateJobTitleDto,
  ) {
    return this.companyJoblistService.updateJobTitle(jobId, updateJobTitle);
  }

  //delete company
  @Delete('deleteJoblistByID/:jobId')
  deleteCompanyProfile(
    @Param('jobId') jobId: number) {
    return this.companyJoblistService.deleteJobList(jobId);
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
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  // get the cv in the postman
  @Get('/getImage/:name')
  getImages(@Param('name') name, @Res() res) {
    return res.sendFile(name, { root: './uploads' });
  }
}
