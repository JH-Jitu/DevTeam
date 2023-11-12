import { Module } from '@nestjs/common';
import { CompanyProfileModule } from './company_profile/company_profile.module';
import { CompanyJoblistModule } from './company_joblist/company_joblist.module';


@Module({
    imports : [CompanyProfileModule, CompanyJoblistModule],
    controllers : [],

})
export class CompanyModule {}