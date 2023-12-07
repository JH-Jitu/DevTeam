import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ProfileDTO } from './profile.dto';
import { ProfileEntity } from './profile.entity';
import { UpdatePasswordDTO } from './update-password.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  //    Post profile Information
  async createUser(programmerProfile: ProfileEntity): Promise<ProfileEntity> {
    try {
      const password = programmerProfile.password;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      programmerProfile.password = hashedPassword;
      return this.profileRepository.save(programmerProfile);
    } catch (error) {
      throw error;
    }
  }

  //   Get all profile Information
  async getAllProfileInfo(): Promise<ProfileEntity[]> {
    try {
      return this.profileRepository.find();
    } catch (error) {
      throw error;
    }
  }

  // Update a profile
  async updateProfile(
    id: number,
    updatedProfile: ProfileDTO,
  ): Promise<ProfileEntity> {
    try {
      await this.profileRepository.update(id, updatedProfile);
      return this.profileRepository.findOneBy({ id: id });
    } catch (error) {
      throw error;
    }
  }

  // Update password
  async updateProfilePassword(
    id: number,
    updatePasswordDTO: UpdatePasswordDTO,
  ): Promise<ProfileEntity> {
    try {
      const { newPassword } = updatePasswordDTO;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const existingProfile = await this.profileRepository.findOneBy({
        id: id,
      });
      existingProfile.password = hashedPassword;

      return this.profileRepository.save(existingProfile);
    } catch (error) {
      throw error;
    }
  }

  // Delete a Profile
  async deleteProfile(id: number): Promise<void> {
    try {
      await this.profileRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  // Get the profile By ID
  async getProfileById(id: number): Promise<ProfileEntity> {
    try {
      return this.profileRepository.findOneBy({ id: id });
    } catch (error) {
      throw error;
    }
  }
}
