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
companyCreatedDate: Date;
@Column()
companySize: number;
@Column()
companyEmail: string;
@Column()
companyPhoneNumber: string;
@Column()
companyLocation: string;
@Column()
password: string;
@Column()
logoFileName: string;
}