import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyJobApplicationController } from './company_jobApp.controller';
import { CompanyJobApplicationService } from './company_jobApplication.service';
import { JobApplicationEntity } from './company_jobApplication.entity';

@Module({
    imports : [TypeOrmModule.forFeature([JobApplicationEntity]),],
    controllers : [CompanyJobApplicationController],
    providers:[CompanyJobApplicationService],

})
export class CompanyJobApplicationModule {}