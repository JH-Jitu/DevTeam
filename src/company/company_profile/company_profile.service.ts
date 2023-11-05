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
    id: number,
    updateData: CreateCompanyProfileDto,
  ): Promise<CompanyProfileEntity> {
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOneBy({ companyId: id });
  }

  //update company size
  async updateCompanySize(
    id: number, 
    updateCompanySize: updateCompanyProfileDto
    ): Promise<CompanyProfileEntity> {
      await this.userRepository.update(id, {companySize:updateCompanySize.updateCompanySize} );
      return this.userRepository.findOneBy({companyId: id}); 
    }

  async deleteUser(
    id: number
  ): Promise<void> {
    await this.userRepository.delete(id);
  }









}