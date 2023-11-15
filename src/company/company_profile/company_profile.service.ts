import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CompanyProfileEntity } from './company_profile.entity';
import { CreateCompanyProfileDto } from './company_profile.dto';
import { updateCompanyEmailDto } from './updateCompanyEmail_profile.dto';
import { updateCompanyNameDto } from './updateCompanyName_profile.dto';

@Injectable()
export class CompanyProfileService {
  constructor(
    @InjectRepository(CompanyProfileEntity)
    private userRepository: Repository<CompanyProfileEntity>,
  ) {}

  //add company profile
  async createCompanyProfile(
    companyProfiles: CompanyProfileEntity,
  ): Promise<CompanyProfileEntity> {
    // const password = companyProfile.password;
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);

    // companyProfile.password = hashedPassword;
    return this.userRepository.save(companyProfiles);
  }

  // get all company profile info
  async getAllCompanyProfileInfo(): Promise<CompanyProfileEntity[]> {
    return this.userRepository.find();
  }

  // get company profile info by id
  async getComapnyProfileById(id: number): Promise<CompanyProfileEntity> {
    return this.userRepository.findOneBy({ companyId: id });
  }

  //update company profile data
  async updateAllCompanyProfile(
    companyId: number,
    updateData: CreateCompanyProfileDto,
  ): Promise<CompanyProfileEntity> {
    await this.userRepository.update(companyId, updateData);
    return this.userRepository.findOneBy({ companyId: companyId });
  }

  //update company name // not working

  //update company contact email
  async updateCompanyEmail(
    companyId: number,
    updatecompanyEmail: updateCompanyEmailDto,
  ): Promise<CompanyProfileEntity> {
    await this.userRepository.update(companyId, {
      companyEmail: updatecompanyEmail.updatedcompanyEmail,
    });
    return this.userRepository.findOneBy({ companyId: companyId });
  }

  async updateCompanyName(
    companyId: number,
    updatecompanyName: updateCompanyNameDto,
  ): Promise<CompanyProfileEntity> {
    await this.userRepository.update(companyId, {
      companyName: updatecompanyName.updatedcompanyName,
    });
    return this.userRepository.findOneBy({ companyId: companyId });
  }

  //delete company profile
  async deleteCompanyProfile(companyId: number): Promise<void> {
    await this.userRepository.delete(companyId);
  }

  //update all company contact
  async updateAllCompanyContact(
    companyId: number,
    contactData: CreateCompanyProfileDto,
  ): Promise<CompanyProfileEntity> {
    await this.userRepository.update(companyId, contactData);
    return this.userRepository.findOneBy({ companyId: companyId });
  }

  //delete company profile
  async deleteCompanyLocation(
    companyId: number
    ): Promise<void> {
    await this.userRepository.delete(companyId);
  }
}
