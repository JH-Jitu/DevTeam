import { Type } from 'class-transformer';
import { IsString, 
    Matches, 
    IsDate,  
    IsNumber,
    IsEmail,
    MinLength,
    MaxLength,
    IsMobilePhone,
    IsNotEmpty,
    IsNumberString,
    } from 'class-validator';
export class CreateCompanyProfileDto {
  jobTitle: string;
  employeeType: string;
  jobDatePosted: Date;
  contactInfo: string;
  salary(salary: any) {
    throw new Error('Method not implemented.');
  }
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
  companyCreatedDate: Date;
  //@IsNumber()
  companySize: number;
  @IsEmail()
  @Matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,{
     message:
         'Email must be an email formate.'
   })
  companyEmail: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^[1-9]+\d{1,14}$/,{
    message: "phone number must be in valid phone number."
  })
  companyPhoneNumber: string;
  @IsString()
  companyLocation: string;
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least 8 characters, including letters, numbers, and at least one special character.',
  })
  password: string;

  file: string;

}


