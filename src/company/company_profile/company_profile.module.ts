import { Module } from '@nestjs/common';
import { CompanyProfileController } from './company_profile.controller';
import { CompanyProfileService } from './company_profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProfileEntity } from './company_profile.entity';

@Module({
    imports : [TypeOrmModule.forFeature([CompanyProfileEntity]),],
    controllers : [CompanyProfileController],
    providers:[CompanyProfileService],

})
export class CompanyProfileModule {}