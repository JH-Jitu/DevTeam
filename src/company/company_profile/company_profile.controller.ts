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
  UseGuards,
  Session,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { CompanyProfileService } from './company_profile.service';
import { CreateCompanyProfileDto } from './company_profile.dto';
import { updateCompanyEmailDto } from './updateCompanyEmail_profile.dto';
import { updateCompanyNameDto } from './updateCompanyName_profile.dto';
import { CompanyProfileEntity } from './company_profile.entity';
import { SessionGuard } from './session.guard';
@Controller('company')
export class CompanyProfileController {
  constructor(private companyProfileService: CompanyProfileService) {}

  //add company logo 
  @Post('addCompanyProfile')
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
        destination: './src/company/company_profile/uploadedCompanyLogo',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  addCompanyProfile(@Session() session, @UploadedFile() file: Express.Multer.File,
  @Body() data: CreateCompanyProfileDto,
  ) {
    session.companyEmail = data.companyEmail;
    const fileName = file ? file.filename : null;
    const companySize = Number(data.companySize);
    const companyProfile = {...data,companySize,file: fileName,};
    return this.companyProfileService.createCompanyProfile(companyProfile); 
  }

  // get the company logo in the postman
  @Get('/getImage/:name')
  getImages(
    @Param('name') name, @Res() res
    ) {
    return res.sendFile(name, { root: './src/company/company_profile/uploadedCompanyLogo'});
  }


  //get all company profile info
  @Get('getAllCompanyProfile')
  @UseGuards (SessionGuard)
  getCompanyProfile() {
    try {
      return this.companyProfileService.getAllCompanyProfileInfo();
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

  //get company profile info by id
  @Get('getCompanyProfileByID/:companyId')
  getCompanyByID(@Param('companyId', ParseIntPipe) companyId: number) {
    try {
      return this.companyProfileService.getComapnyProfileById(companyId);
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


  //update company profile data
  @UsePipes(new ValidationPipe())
  @Put('updateAllCompanyProfile/:companyId')
  updateAllCompanyProfile(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body() updateCompanyProfile: CreateCompanyProfileDto,
  ) {
    try {
      return this.companyProfileService.updateAllCompanyProfile(companyId, updateCompanyProfile);
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

 //upadte the company name
 @UsePipes(new ValidationPipe())
  @Patch('updateCompanyName/:companyId')
  updateCompanyName(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body() updateCompanyName: updateCompanyNameDto,
  ) {
    try {
      return this.companyProfileService.updateCompanyName(companyId, updateCompanyName);
      
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

  //delete company
  @Delete('deleteCompanyByID/:companyId')
  deleteCompanyProfile(@Param('companyId') companyId: number) {
    try {
      return this.companyProfileService.deleteCompanyProfile(companyId);
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

  //update all company contact
  @Put('updateAllCompanyContact/:companyId')
  updateAllCompanyContact(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body() updateCompanyContact: CreateCompanyProfileDto,
  ) {
    try {
      return this.companyProfileService.updateAllCompanyContact(companyId, updateCompanyContact);
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

 //update company email
 @Patch('updateCompanyEmail/:companyId')
  updateCompanyEmail(
    @Param('companyId', ParseIntPipe) companyId: number,  
    @Body() updateCompanyEmail: updateCompanyEmailDto,
  ) {
    try {
     return this.companyProfileService.updateCompanyEmail(companyId, updateCompanyEmail);
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


  //delete company phone number
  @Delete('deleteCompanyContactByCompanyLocation/:companyId')
  deleteCompanyLocation(@Param('companyId') companyId: number) {
    try {
      return this.companyProfileService.deleteCompanyLocation(companyId);
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
