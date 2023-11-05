import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
@Entity()
export class CompanyProfileEntity{
@PrimaryGeneratedColumn()
companyId: number;
@Column()
companyName: string;
@Column()
companyType: string;
@Column()
campanyStartDate: string;
@Column()
companySize: number;
@Column()
companyEmail: string;
@Column()
companyPhoneNumber: number;
@Column()
location: string;
}