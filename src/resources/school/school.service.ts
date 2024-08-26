import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { School } from './entities/school.entity';
import { Address } from '../address/entities/address.entity';
import { Organization } from '../organization/entities/organization.entity';
import { QueryRunnerService } from 'src/shared/services/query-runner/query-runner.service';
import { COMMON_MESSAGE } from 'src/utils/constants';
import { ResponseDto } from 'src/shared/common/response.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService {

  constructor(private readonly queryRunner: QueryRunnerService) { }
  logger = new Logger(SchoolService.name);

  async create(createSchoolDto: CreateSchoolDto): Promise<ResponseDto> {
    const queryRunner = this.queryRunner.createQueryRunner();

    try {
      const { name, status, startTime, endTime, shift, address, organization, hasProjector, hasLaptop } = createSchoolDto;

      await queryRunner.connect();
      await queryRunner.startTransaction();

      const organizationRepo = queryRunner.manager.getRepository(Organization);
      const schoolRepo = queryRunner.manager.getRepository(School);
      const addressRepo = queryRunner.manager.getRepository(Address);

      let newAddress = await addressRepo.findOne({
        where: {
          town: address.town,
          tehsil: address.tehsil,
          district: address.district,
          state: address.state,
          address: address.address,
        },
      });

      if (!newAddress) {
        newAddress = await addressRepo.save(address);
      }

      let newOrganization = await organizationRepo.findOne({
        where: { name: organization.name },
      });

      if (!newOrganization) {
        newOrganization = await organizationRepo.save(organization);
      }

      let school = await schoolRepo.findOne({
        where: {
          name: name,
          address: {
            town: address.town,
            tehsil: address.tehsil,
            district: address.district,
            state: address.state,
          },
        },
        relations: ['address', 'organization'],
      });

      if (!school) {
        await schoolRepo.save({
          name,
          status,
          startTime,
          endTime,
          shift,
          addressId: newAddress.id,
          organizationId: newOrganization.id,
          hasProjector,
          hasLaptop
        });

        school = await schoolRepo.findOne({
          where: {
            name: name,
            address: {
              town: address.town,
              tehsil: address.tehsil,
              district: address.district,
              state: address.state,
            },
          },
          relations: ['address', 'organization'],
        });
      }

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_CREATED('School'),
        data: school,
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();

      if (error?.code === '23505') {
        throw new ConflictException('Name already exists.');
      }

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const schoolRepo = this.queryRunner.getRepository(School);

      const data = await schoolRepo
        .createQueryBuilder("school")
        .leftJoinAndSelect("school.organization", "organization")
        .leftJoinAndSelect("school.address", "address")
        .getMany();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(School.name),
        data,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto): Promise<ResponseDto> {
    const queryRunner = this.queryRunner.createQueryRunner();

    try {
      const { address, organization, ...rest } = updateSchoolDto;

      await queryRunner.connect();
      await queryRunner.startTransaction();

      const schoolRepo = queryRunner.manager.getRepository(School);
      const addressRepo = queryRunner.manager.getRepository(Address);
      const organizationRepo = queryRunner.manager.getRepository(Organization);

      let school = await schoolRepo.findOne({
        where: { id },
        relations: ['address', 'organization'],
      });

      if (!school) {
        throw new NotFoundException(`School with ID ${id} not found`);
      }

      if (address) {
        await addressRepo.update({
          id: school.address.id
        }, { ...address });
      }

      if (organization) {
        await organizationRepo.update({ id: school.organization.id }, { ...organization });
      }

      await schoolRepo.update(id, { ...rest });

      school = await schoolRepo.findOne({
        where: { id },
        relations: ['address', 'organization']
      });

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_UPDATED('School'),
        data: school,
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    const queryRunner = this.queryRunner.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const schoolRepo = queryRunner.manager.getRepository(School);

      const existingSchool = await schoolRepo.findOne({ where: { id } });

      if (!existingSchool) {
        throw new NotFoundException(`School with ID ${id} not found`);
      }

      await schoolRepo.delete(id);

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_DELETED('School'),
        data: null,
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
