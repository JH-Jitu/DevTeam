import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
export class updateCompanyProfileDto {
    @IsString()
    @MinLength(3)
    @MaxLength(31)
    @Matches(/^[A-Za-z]+$/, {
    message:
      'The name must consist of letters only, and no spaces or special characters are allowed.',
    })
    upadatedcompanyName: string;
    @IsEmail()
    @Matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,{
    message:
        'Email must be an email formate.'
  })
  updatecompanyEmail: string;
}