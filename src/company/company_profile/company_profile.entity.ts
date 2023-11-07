import { Entity, 
    Column, 
    PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('companyProfile')
export class CompanyProfileEntity{
@PrimaryGeneratedColumn()
companyId: number;
@Column()
companyName: string;
@Column()
companyType: string;
@Column()
createdDate: Date;
@Column()
companySize: number;
@Column()
companyEmail: string;
@Column()
companyPhoneNumber: number;
@Column()
location: string;
}