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
import { CompanyProfileService } from './company_profile.service';
import { CreateCompanyProfileDto } from './company_profile.dto';
import { updateCompanyEmailDto } from './updateCompanyEmail_profile.dto';
import { updateCompanyNameDto } from './updateCompanyName_profile.dto';
@Controller('company')
export class CompanyProfileController {
  constructor(private companyProfileService: CompanyProfileService) {}

  //add company profile
  @Post('addCompanyProfile')
  @UsePipes(new ValidationPipe())
  addCompanyProfile(@Body() data: CreateCompanyProfileDto) {
    return this.companyProfileService.createCompanyProfile(data);
  }

  //get all company profile info
  @Get('getAllCompanyProfile')
  getCompanyProfile() {
    return this.companyProfileService.getAllCompanyProfileInfo();
  }

  //get company profile info by id
  @Get('getCompanyProfileByID/:companyId')
  getCompanyByID(@Param('companyId', ParseIntPipe) companyById: number) {
    return this.companyProfileService.getComapnyProfileById(companyById);
  }

  //update company profile data
  @Put('updateAllCompanyProfile/:companyId')
  updateAllCompanyProfile(
    @Param('companyId', ParseIntPipe) updateId: number,
    @Body() updateCompanyProfile: CreateCompanyProfileDto,
  ) {
    return this.companyProfileService.updateAllCompanyProfile(updateId, updateCompanyProfile);
  }

 //upadte the company name // not working
 @Patch('updateCompanyName/:companyId')
 updateCompanyName(
   @Param('companyId', ParseIntPipe) updateId: number,
   @Body() updateCompanyName: updateCompanyNameDto,
 ) {
   return this.companyProfileService.updateCompanyName(updateId, updateCompanyName);
 }


  //delete company
  @Delete('deleteCompanyByID/:companyId')
  deleteCompanyProfile(@Param('companyId') companyId: number) {
    return this.companyProfileService.deleteCompanyProfile(companyId);
  }

  //update all company contact
  @Put('updateAllCompanyContact/:companyId')
  updateAllCompanyContact(
  @Param('companyId', ParseIntPipe) updateId: number,
  @Body() updateCompanyContact: CreateCompanyProfileDto,
  ) {
  return this.companyProfileService.updateAllCompanyContact(updateId, updateCompanyContact);
  }

 //update company email
 @Patch('updateCompanyEmail/:companyId')
 updateCompanyEmail(
   @Param('companyId', ParseIntPipe) updateId: number,
   @Body() updateCompanyEmail: updateCompanyEmailDto,
 ) {
   return this.companyProfileService.updateCompanyEmail(updateId, updateCompanyEmail);
 }


  //delete company phone number
  @Delete('deleteCompanyContactByCompanyLocation/:companyId')
  deleteCompanyLocation(
    @Param('companyId') companyId: number,
  ) {
    return this.companyProfileService.deleteCompanyLocation( companyId);
  }

  //add company logo 
  @Post('uploadCompanyLogo')
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

  // get the company logo in the postman
  @Get('/getImage/:name')
  getImages(@Param('name') name, @Res() res) {
    return res.sendFile(name, { root: './uploads' });
  }
}
