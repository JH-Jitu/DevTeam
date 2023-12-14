import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Admin/admin.module';
import { CompanyModule } from './company/company.module';
import { ProgrammerModule } from './programmer/programmer.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'DevTeam',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AdminModule,
    ProgrammerModule,
    CompanyModule,
   MailerModule.forRoot(
    {
      transport: {
        host : 'smtp.gmail.com',
        port : 465,
        ignoreTLS : true,
        secure : true,
        auth : {
          user : 'ahmedsad0819@gmail.com',
          pass : 'xwianrfxkmlevxhb'
    }
}})],
  controllers: [],
  providers: [],
})
export class AppModule {}
