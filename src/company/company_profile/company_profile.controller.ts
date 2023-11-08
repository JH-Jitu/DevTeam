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
import { updateCompanyProfileDto } from './updateCompany_profile.dto';
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
  @Get('getAllCompanyInfo')
  getCompanyProfile() {
    return this.companyProfileService.getAllCompanyProfileInfo();
  }

  //get company profile info by id
  @Get('getCompanyByID/:companyId')
  getCompanyByID(@Param('companyId', ParseIntPipe) companyById: number) {
    return this.companyProfileService.getComapnyProfileById(companyById);
  }

  //update company profile data
  @Put('updateAllCompanyProfile/:compayId')
  updateAllCompanyProfile(
    @Param('companyId', ParseIntPipe) updateId: number,
    @Body() updateCompanyProfile: CreateCompanyProfileDto,
  ) {
    return this.companyProfileService.updateAllCompanyProfile(updateId, updateCompanyProfile);
  }

  //upadte the company size
  @Patch('updateCompanySize/:companyId')
  updateCompanySize(
    @Param('id', ParseIntPipe) updateId: number,
    @Body() updateCompanySize: updateCompanyProfileDto,
    ) {
    return this.companyProfileService.updateCompanySize(updateId, updateCompanySize);
  }

  //delete company
  @Delete('deleteCompanyName/:companyId')
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
  updateCompanyContact(
    @Param('companyId', ParseIntPipe) updateId: number,
    @Body() updateCompanyEmail: updateCompanyProfileDto,
  ) {
    return this.companyProfileService.updateCompanyContact(updateId, updateCompanyEmail);
  }

  //delete company phone number
  @Delete('deleteCompanyContact/:companyPhoneNumber')
  deleteCompanyPhoneNumber(
    @Param('companyPhoneNumber') companyPhoneNumber: number,
  ) {
    return companyPhoneNumber;
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
