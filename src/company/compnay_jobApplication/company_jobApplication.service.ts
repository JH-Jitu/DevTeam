import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './company_jobapplication.dto';
import { JobApplicationEntity } from './company_jobApplication.entity';
import { updateApplicantEmailDto } from './updateApplicationEmail.dto';

@Injectable()
export class CompanyJobApplicationService {
  updateApplicantEmail(applicationId: number, updateApplicationEmail: updateApplicantEmailDto) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(JobApplicationEntity)
    private userRepository: Repository<JobApplicationEntity>,
  ) {}

  //add joblist
  async createJobApplication(
    user: JobApplicationEntity,
  ): Promise<JobApplicationEntity> {
    return this.userRepository.save(user);
  }

  // get all joblist
  async getAllJobApplication(
  ): Promise<JobApplicationEntity[]> {
    return this.userRepository.find();
  }

  // get joblist info by id
  async getJobApplicationById(
    applicationId: number
    ): Promise<JobApplicationEntity> {
    return this.userRepository.findOneBy({ applicationId: applicationId });
  }

  //update joblist
  async updateAllJobApplication(
    applicationId: number,
    updateApplication: CreateJobApplicationDto,
  ): Promise<JobApplicationEntity> {
    await this.userRepository.update(applicationId, updateApplication);
    return this.userRepository.findOneBy({ applicationId: applicationId });
  }

  //update job title
  async update(
    applicationId: number,
    updateApplicantEmail: updateApplicantEmailDto,
  ): Promise<JobApplicationEntity> {
    await this.userRepository.update(applicationId, {
      applicantEmail: updateApplicantEmail.updatedapplicantEmail,
    });
    return this.userRepository.findOneBy({ applicationId: applicationId });
  }

  //delete joblist
  async deleteJobapplication(
    applicationId: number
    ): Promise<void> {
    await this.userRepository.delete(applicationId);
  }
}
