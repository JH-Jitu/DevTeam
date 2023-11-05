import { IsString, 
    Matches, 
    IsDate, 
    Min, 
    Max, 
    IsEmail,
    IsPhoneNumber,
    IsNumber} from 'class-validator';
export class CreateCompanyProfileDto {
  companyId: number;
  @IsString()
  @Min(3)
  @Max(31)
  @Matches(/^[A-Za-z]+$/, {
    message:
      'The name must consist of letters only, and no spaces or special characters are allowed.',
  })
  companyName: string;
  @IsString()
  companyType: string;
  @IsDate()
  campanyStartDate: string;
  @IsNumber()
  companySize: number;
  @IsEmail()
  @Matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,{
    message:
        'Email must be anemail formate.'
  })
  @IsPhoneNumber()
  companyPhoneNumber: number;
  @IsString()
  location: string;
}
