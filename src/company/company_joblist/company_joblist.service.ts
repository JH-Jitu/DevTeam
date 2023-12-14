import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJoblistDto } from './company_joblist.dto';
import { updateJobTitleDto } from './updateJobTitle_joblist.dto';
import { JoblistEntity } from './company_joblist.entity.dto';
import { CompanyProfileEntity } from '../company_profile/company_profile.entity';

@Injectable()
export class CompanyJoblistService {
  companyProfileService: any;
  constructor(
    @InjectRepository(JoblistEntity)
    private joblistRepository: Repository<JoblistEntity>,
  ) {}

  //add joblist
  async createJoblist(
    joblists: JoblistEntity,
  ): Promise<JoblistEntity> {
    return this.joblistRepository.save(joblists);
  }
  
  // get all joblist
  async getAllJoblist(
  ): Promise<JoblistEntity[]> {
    return this.joblistRepository.find();
  }

  // get joblist info by id
  async getJoblistById(
    jobId: number
    ): Promise<JoblistEntity> {
    return this.joblistRepository.findOneBy({ jobId: jobId });
  }

  //update joblist
  async updateAllJoblist(
    jobId: number,
    updateData: CreateJoblistDto,
  ): Promise<JoblistEntity> {
    await this.joblistRepository.update(jobId, updateData);
    return this.joblistRepository.findOneBy({ jobId: jobId });
  }

  //update job title
  async updateJobTitle(
    jobId: number,
    updatejobTitle: updateJobTitleDto,
  ): Promise<JoblistEntity> {
    await this.joblistRepository.update(jobId, {
      jobTitle: updatejobTitle.updatedjobTitle,
    });
    return this.joblistRepository.findOneBy({ jobId: jobId });
  }

  //delete joblist
  async deleteJobList(
    jobId: number
    ): Promise<string> {
    await this.joblistRepository.delete(jobId);
    return "Company job list with ID deleted successfully."
  }
}
