import { Type } from 'class-transformer';
import { IsString, 
    Matches, 
    IsDate,  
    IsNumber,
    IsEmail,
    MinLength,
    MaxLength,
    IsNotEmpty,
    } from 'class-validator';
export class CreateJoblistDto {
  jobId: number;
  @IsString()
  @MinLength(3)
  @MaxLength(31)
  @Matches(/^[A-Za-z]+$/, {
    message:
      'The job title must consist of letters only, and no spaces or special characters are allowed.',
  })
  jobTitle: string;
  @IsString()
  @MinLength(3)
  @MaxLength(31)
  @Matches(/^[A-Za-z]+$/, {
    message:
      'The job title must consist of letters only, and no spaces or special characters are allowed.',
  })
  companyName: string;
  @IsString()
  employeeType: string;
  @IsDate()
  @Type(() => Date)
  jobDatePosted: Date;
  @IsNumber()
  salary: number;
  @IsEmail()
  @Matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,{
     message:
         'Email must be an email formate.'
   })
  contactInfo: string;
  @IsString()
  @IsNotEmpty()
  jobExperience: string;
  @IsString()
  jobLocation: string;
}


