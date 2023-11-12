import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    user: CompanyProfileEntity,
  ): Promise<CompanyProfileEntity> {
    return this.userRepository.save(user);
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
