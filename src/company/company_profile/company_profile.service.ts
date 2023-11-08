import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyProfileEntity } from './company_profile.entity'; 
import { CreateCompanyProfileDto } from './company_profile.dto';
import { updateCompanyProfileDto } from './updateCompany_profile.dto';


@Injectable()
export class CompanyProfileService {
  constructor(
    @InjectRepository(CompanyProfileEntity)
    private userRepository: Repository<CompanyProfileEntity>,
  ) {}

//add company profile 
  async createCompanyProfile(
    user: CompanyProfileEntity
  ): Promise<CompanyProfileEntity> {
    return this.userRepository.save(user);
  }

// get all company profile info
  async getAllCompanyProfileInfo(): Promise<CompanyProfileEntity[]> {
    return this.userRepository.find();
  }

// get company profile info by id
  async getComapnyProfileById(
    id: number
  ): Promise<CompanyProfileEntity> {
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

  //update company name
  async updateCompanyName(
    companyId: number, 
    updatecompanyName: updateCompanyProfileDto
    ): Promise<CompanyProfileEntity> {
      await this.userRepository.update(companyId, {companyName:updatecompanyName.upadatedcompanyName} );
      return this.userRepository.findOneBy({companyId}); 
    }

 //delete company profile
  async deleteCompanyProfile(
    companyId: number
  ): Promise<void> {
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

  //update company contact email
  async updateCompanyContact(
    companyId: number, 
    updatecompanyEmail: updateCompanyProfileDto
    ): Promise<CompanyProfileEntity> {
      await this.userRepository.update(companyId, {companyEmail:updatecompanyEmail.updatecompanyEmail} );
      return this.userRepository.findOneBy({companyId: companyId}); 
    }

  //delete company profile
  async deleteCompanyContact(
    companyPhoneNumber: number
  ): Promise<void> {
    await this.userRepository.delete(companyPhoneNumber);
  }
}