// interview_list.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { AppliedJobsEntity } from './applied_jobs.entity';
import { ProfileEntity } from 'src/programmer/profile/profile.entity';
import { RecruiterEntity } from './recruiter.entity';
import { CompanyEntity } from 'src/company/company.entity';
@Entity('interview_list')
export class InterviewListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppliedJobsEntity, (appliedJob) => appliedJob.companyEmail, {
    eager: true,
  })
  appliedJob: AppliedJobsEntity;

  //   @ManyToOne(() => ProfileEntity, (programmerData) => programmerData.email)
  //   @JoinColumn({ name: 'programmerData' })
  //   programmerData: ProfileEntity;

  @ManyToOne(() => RecruiterEntity, (recruiter) => recruiter.email, {
    eager: true,
  })
  recruiter: RecruiterEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.email, { eager: true })
  company: CompanyEntity;

  @Column({ nullable: true })
  googleMeetLink: string;

  @Column({ nullable: true })
  dateTime: Date;

  // Add other columns or relationships as needed
}