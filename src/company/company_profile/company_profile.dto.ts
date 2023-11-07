import { Type } from 'class-transformer';
import { IsString, 
    Matches, 
    IsDate,  
    IsNumber,
    IsEmail,
    MinLength,
    MaxLength,
    } from 'class-validator';
export class CreateCompanyProfileDto {
  companyId: number;
  @IsString()
  @MinLength(3)
  @MaxLength(31)
  @Matches(/^[A-Za-z]+$/, {
    message:
      'The name must consist of letters only, and no spaces or special characters are allowed.',
  })
  companyName: string;
  @IsString()
  companyType: string;
  @IsDate()
  @Type(() => Date)
  createdDate: Date;
  @IsNumber()
  companySize: number;
  @IsEmail()
  @Matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,{
     message:
         'Email must be an email formate.'
   })
  companyEmail: string;
  @IsNumber()
  companyPhoneNumber: number;
  @IsString()
  location: string;
}


