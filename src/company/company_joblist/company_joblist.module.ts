import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyjoblistController } from './company_joblist.controller';
import { CompanyJoblistService } from './company_joblist.service';
import { JoblistEntity } from './company_joblist.entity.dto';

@Module({
    imports : [TypeOrmModule.forFeature([JoblistEntity]),],
    controllers : [CompanyjoblistController],
    providers:[CompanyJoblistService],

})
export class CompanyJoblistModule {}