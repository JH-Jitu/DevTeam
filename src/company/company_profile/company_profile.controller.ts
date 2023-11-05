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
  @Get('getCompanyByID/:id')
  getCompanyByID(@Param('id', ParseIntPipe) companyById: number) {
    return this.companyProfileService.getComapnyProfileById(companyById);
  }

  @Put('updateCompany')
  updateCompany(@Body() updatecompany: string) {
    return updatecompany;
  }

  @Patch('updateCompanySize/:id')
  updateCompanySize(@Body() updateCompanySize: number) {
    return updateCompanySize;
  }












  @Delete('deleteCompanyName/:companyName')
  deleteCompanyID(@Param('companyName') companyName: string) {
    return companyName;
  }

  @Patch('updateCompanyContact/:id')
  updateCompanyContact(@Body() updateCompanyContact: string) {
    return updateCompanyContact;
  }

  @Delete('deleteCompanyContact/:companyPhoneNumber')
  deleteCompanyPhoneNumber(@Param('companyPhoneNumber') companyPhoneNumber: number) {
    return companyPhoneNumber;
  }

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

  @Get('/getImage/:name')
  getImages(@Param('name') name, @Res() res) {
    return res.sendFile(name, { root: './uploads' });
  }
}
