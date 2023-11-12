import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyjoblistController } from './company_jiblist.controller';
import { CompanyJoblistService } from './company_joblist.service';
import { CompanyJoblistEntity } from './company_joblist.entity.dto';

@Module({
    imports : [TypeOrmModule.forFeature([CompanyJoblistEntity]),],
    controllers : [CompanyjoblistController],
    providers:[CompanyJoblistService],

})
export class CompanyJoblistModule {}