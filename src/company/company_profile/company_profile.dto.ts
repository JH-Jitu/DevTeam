import { IsString, 
    Matches, 
    IsDate, 
    Min, 
    Max } from 'class-validator';
export class CreateCompanyProfileDto {
  companyId: number;
  @IsString()
  @Min(3)
  @Max(31)
  @Matches(/^[A-Za-z]+$/, {
    message:
      'The name should consist of letters only, and no spaces or special characters are allowed.',
  })
  companyName: string;
  @IsString()
  companyType: string;
  @IsDate()
  campanyStartDate: string;
}
