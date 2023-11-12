import {
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
export class updateJobTitleDto {
    @IsString()
    @MinLength(3)
    @MaxLength(31)
    @Matches(/^[A-Za-z]+$/, {
    message:
      'The name must consist of letters only, and no spaces or special characters are allowed.',
    })
    updatedjobTitle: string;
}