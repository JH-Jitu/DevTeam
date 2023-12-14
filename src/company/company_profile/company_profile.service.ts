import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CompanyProfileEntity } from './company_profile.entity';
import { CreateCompanyProfileDto } from './company_profile.dto';
import { updateCompanyEmailDto } from './updateCompanyEmail_profile.dto';
import { updateCompanyNameDto } from './updateCompanyName_profile.dto';
import { MailerService } from '@nestjs-modules/mailer';
// import { JoblistEntity } from '../company_joblist/company_joblist.entity.dto';

@Injectable()
export class CompanyProfileService {
  // companyJoblistService: any;
  constructor(
    @InjectRepository(CompanyProfileEntity)
    private companyRepository: Repository<CompanyProfileEntity>,
    private readonly mailerService: MailerService,
  ) {}

  //add company profile
  async createCompanyProfile(
    companyProfiles: CompanyProfileEntity,
  ): Promise<CompanyProfileEntity> {
    const password = companyProfiles.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    companyProfiles.password = hashedPassword;
    return this.companyRepository.save(companyProfiles);
  }

  // get all company profile info
  async getAllCompanyProfileInfo(
  ): Promise<CompanyProfileEntity[]> {
    return this.companyRepository.find();
  }

  // get company profile info by id
  async getComapnyProfileById(
    id: number
    ): Promise<CompanyProfileEntity> {
    return this.companyRepository.findOneBy({ companyId: id });
  }

  //update company profile data
  async updateAllCompanyProfile(
    companyId: number,
    updateData: CreateCompanyProfileDto,
  ): Promise<CompanyProfileEntity> {
    await this.companyRepository.update(companyId, updateData);
    return this.companyRepository.findOneBy({ companyId: companyId });
  }

  //update company name
  async updateCompanyName(
    companyId: number,
    updatecompanyName: updateCompanyNameDto,
  ): Promise<CompanyProfileEntity> {
    await this.companyRepository.update(companyId, {
      companyName: updatecompanyName.updatedcompanyName,
    });
    return this.companyRepository.findOneBy({ companyId: companyId });
  }

  //delete company profile
  async deleteCompanyProfile(
    companyId: number
    ): Promise<string> {
    await this.companyRepository.delete(companyId);
    return "Company profile with ID deleted successfully.";
  }

  //update all company contact
  async updateAllCompanyContact(
    companyId: number,
    contactData: CreateCompanyProfileDto,
  ): Promise<CompanyProfileEntity> {
    await this.companyRepository.update(companyId, contactData);
    return this.companyRepository.findOneBy({ companyId: companyId });
  }


  //update company contact email
  async updateCompanyEmail(
    companyId: number,
    updatecompanyEmail: updateCompanyEmailDto,
  ): Promise<CompanyProfileEntity> {
    await this.companyRepository.update(companyId, {
      companyEmail: updatecompanyEmail.updatedcompanyEmail,
    });
    return this.companyRepository.findOneBy({ companyId: companyId });
  }

  //delete company profile
  async deleteCompanyLocation(
    companyId: number
    ): Promise<string> {
    await this.companyRepository.delete(companyId);
    return "Company profile is deleted successfully with Company Contact By CompanyLocation.";
  }
  
  async getCode(companyEmail: string): Promise<string> {
    try {
      await this.mailerService.sendMail({
        to: companyEmail, 
        subject: 'for verification',
        text: 'check the email',
      });
      return 'SomeCode';
    } catch (error) {
      console.error('Error sending mail:', error);
      throw new Error('Failed to send email');
    }
  }
}


