import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJoblistDto } from './company_joblist.dto';
import { updateJobTitleDto } from './updateJobTitle_joblist.dto';
import { JoblistEntity } from './company_joblist.entity.dto';

@Injectable()
export class CompanyJoblistService {
  constructor(
    @InjectRepository(JoblistEntity)
    private userRepository: Repository<JoblistEntity>,
  ) {}

  //add joblist
  async createJoblist(
    user: JoblistEntity,
  ): Promise<JoblistEntity> {
    return this.userRepository.save(user);
  }

  // get all joblist
  async getAllJoblist(
  ): Promise<JoblistEntity[]> {
    return this.userRepository.find();
  }

  // get joblist info by id
  async getJoblistById(
    jobId: number
    ): Promise<JoblistEntity> {
    return this.userRepository.findOneBy({ jobId: jobId });
  }

  //update joblist
  async updateAllJoblist(
    jobId: number,
    updateData: CreateJoblistDto,
  ): Promise<JoblistEntity> {
    await this.userRepository.update(jobId, updateData);
    return this.userRepository.findOneBy({ jobId: jobId });
  }

  //update job title
  async updateJobTitle(
    jobId: number,
    updatejobTitle: updateJobTitleDto,
  ): Promise<JoblistEntity> {
    await this.userRepository.update(jobId, {
      jobTitle: updatejobTitle.updatedjobTitle,
    });
    return this.userRepository.findOneBy({ jobId: jobId });
  }

  //delete joblist
  async deleteJobList(
    jobId: number
    ): Promise<void> {
    await this.userRepository.delete(jobId);
  }
}
