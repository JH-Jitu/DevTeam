import { Entity, 
    Column, 
    PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('companyJobApplication')
export class JobApplicationEntity{
@PrimaryGeneratedColumn()
applicationId: number;
@Column()
applicanteName: string;
@Column()
applicantEmail: string;
@Column()
positionAppliedFor: string;
@Column()
applicationDate: Date;
@Column()
file: string;
}