import {
    IsEmail,
    IsNumber,
    Matches,
} from 'class-validator';
export class updateCompanyProfileDto {
    @IsNumber()
    updateCompanySize: number;
    @IsEmail()
    @Matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,{
    message:
        'Email must be an email formate.'
  })
  updatecompanyEmail: string;
}