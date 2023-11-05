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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
@Controller('company')
export class CompanyProfileController {
  @Get('getAllCompanyInfo')
  getCompanyProfile() {
    
  }

  @Get('getCompanyByID/:id')
  getCompanyByID(@Param() companyId: number) {
    return companyId;
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

  @Post('newCompanyProfile')
  newCompanyProfile(@Body() company_name: string) {
    return company_name;
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
