import { Module } from '@nestjs/common';
import { CompanyProfileModule } from './company_profile/company_profile.module';
import { CompanyJoblistModule } from './company_joblist/company_joblist.module';
import { CompanyJobApplicationModule } from './company_jobApplication/company_jobApplication.module';


@Module({
    imports : [CompanyProfileModule, CompanyJoblistModule,CompanyJobApplicationModule],
    controllers : [],

})
export class CompanyModule {}