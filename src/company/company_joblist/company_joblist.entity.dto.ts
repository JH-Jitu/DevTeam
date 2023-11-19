import { Entity, 
    Column, 
    PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('companyJoblist')
export class JoblistEntity{
@PrimaryGeneratedColumn()
jobId: number;
@Column()
jobTitle: string;
@Column()
companyName: string;
@Column()
employeeType: string;
@Column()
jobDatePosted: Date;
@Column()
salary: number;
@Column()
contactInfo: string;
@Column()
jobExperience: string;
@Column()
jobLocation: string;
@Column()
file: string;
}