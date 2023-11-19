import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './company_jobapplication.dto';
import { JobApplicationEntity } from './company_jobApplication.entity';
import { updateApplicantEmailDto } from './updateApplicationEmail.dto';

@Injectable()
export class CompanyJobApplicationService {

  constructor(
    @InjectRepository(JobApplicationEntity)
    private userRepository: Repository<JobApplicationEntity>,
  ) {}

  //add job application
  async createJobApplication(
    jobApplys: JobApplicationEntity,
  ): Promise<JobApplicationEntity> {
    return this.userRepository.save(jobApplys);
  }

  // get all job application
  async getAllJobApplication(
  ): Promise<JobApplicationEntity[]> {
    return this.userRepository.find();
  }

  // get job application by id
  async getJobApplicationById(
    applicationId: number
    ): Promise<JobApplicationEntity> {
    return this.userRepository.findOneBy({ applicationId: applicationId });
  }

  //update job application
  async updateAllJobApplication(
    applicationId: number,
    updateApplication: CreateJobApplicationDto,
  ): Promise<JobApplicationEntity> {
    await this.userRepository.update(applicationId, updateApplication);
    return this.userRepository.findOneBy({ applicationId: applicationId });
  }

  //update applicant email
  async updateApplicantEmail(
    applicationId: number,
    updateApplicantEmail: updateApplicantEmailDto,
  ): Promise<JobApplicationEntity> {
    await this.userRepository.update(applicationId, {
      applicantEmail: updateApplicantEmail.updatedapplicantEmail,
    });
    return this.userRepository.findOneBy({ applicationId: applicationId });
  }

  //delete job application 
  async deleteJobapplication(
    applicationId: number
    ): Promise<void> {
    await this.userRepository.delete(applicationId);
  }
}
