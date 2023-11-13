import { Type } from 'class-transformer';
import { IsString, 
    Matches, 
    IsDate,  
    IsEmail,
    MinLength,
    MaxLength,
    } from 'class-validator';
export class CreateJobApplicationDto {
  applicationId: number;
  @IsString()
  @MinLength(3)
  @MaxLength(31)
  @Matches(/^[A-Za-z]+$/, {
    message:
      'The job title must consist of letters only, and no spaces or special characters are allowed.',
  })
  applicanteName: string;
  @IsEmail()
  @Matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,{
     message:
         'Email must be an email formate.'
   })
  applicantEmail: string;
  @IsString()
  positionAppliedFor: string;
  @IsDate()
  @Type(() => Date)
  applicationDate: Date;
  @IsString()
  cvFileName: string;
}


