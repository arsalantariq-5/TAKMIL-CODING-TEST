import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { ResponseDto } from 'src/shared/common/response.dto';
import { Organization } from './entities/organization.entity';
import { QueryRunnerService } from 'src/shared/services/query-runner/query-runner.service';
import { COMMON_MESSAGE, ERROR_MESSAGE } from 'src/utils/constants';

@Injectable()
export class OrganizationService {

  constructor(private readonly queryRunner: QueryRunnerService) {}

  logger = new Logger(OrganizationService.name);

  async create(createOrganizationDto: CreateOrganizationDto): Promise<ResponseDto> {
    const queryRunner = this.queryRunner.createQueryRunner();
    try {
      const { name } = createOrganizationDto;

      await queryRunner.connect();
      await queryRunner.startTransaction();
      const organizationRepo = queryRunner.manager.getRepository(Organization);

      const organization = await organizationRepo.save({ name });

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_CREATED('Organization'),
        data: {
          organization,
        },
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      if (
        error?.code == '23505' &&
        error?.detail ===
          `Key ("name")=(${createOrganizationDto.name}) already exists.`
      ) {
        throw new ConflictException('name already exists');
      }
      throw new InternalServerErrorException(error);
    } finally {
      queryRunner.release();
    }
  }

  async findAll() {
    try {
      const organizationRepo = this.queryRunner.getRepository(Organization);
      const data = await organizationRepo
        .createQueryBuilder("organization")
        .leftJoinAndSelect("organization.schools", "schools")
        .getMany();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(Organization.name),
        data,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const organizationRepo = this.queryRunner.getRepository(Organization);

      const data = await organizationRepo
        .createQueryBuilder("organization")
        .leftJoinAndSelect("organization.schools", "schools")
        .where("organization.id = :id", { id })
        .getOne();

      if (!data) {
        throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND(Organization.name));
      }

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(Organization.name),
        data,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
