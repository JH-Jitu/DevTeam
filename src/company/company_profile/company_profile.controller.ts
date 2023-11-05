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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
@Controller('company')
export class CompanyProfileController {
  @Get('getAllCompanyInfo')
  getCompanyProfile() {
    
  }

  @Get('getCompanyID/:id')
  getCompanyID(@Param() companyId: number) {
    return companyId;
  }

  @Put('updateCompany')
  updateCompany(@Body() updatecompany: string) {
    return updatecompany;
  }

  @Patch('updateCompanyID/:id')
  updateCompanyID(@Body() updateCompanyID: number) {
    return updateCompanyID;
  }

  @Delete('deleteCompanyID/:id')
  deleteCompanyID(@Param('id') company_id: number) {
    return company_id;
  }

  @Post('newCompanyProfile')
  newCompanyProfile(@Body() company_name: string) {
    return company_name;
  }

  @Patch('updateCompanyContact/:id')
  updateCompanyContact(@Body() updateCompanyContact: string) {
    return updateCompanyContact;
  }

  @Delete('deleteCompanyContact/:companyPhoneNumber')
  deleteCompanyContactID(@Param('id') companyPhoneNumber: number) {
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












}
