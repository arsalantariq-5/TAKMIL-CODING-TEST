import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../common/jwt.payload.dto';
import { jwtConfig } from '../../config/jwt.config';
import { QueryRunnerService } from '../services/query-runner/query-runner.service';
import { User } from '../../resources/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryRunner: QueryRunnerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      if (Date.now() >= payload.exp * 1000) {
        throw new UnauthorizedException('JWT Token Expired!!');
      }

      let data: User;

      const userRepo = this.queryRunner.getRepository(User);
      data = await userRepo
        .createQueryBuilder('user')
        .where('user.id = :id', { id: payload.id })
        .andWhere('user.deletedAt IS NULL')
        .getOne();

      return {
        ...data,
        tokenType: payload.tokenType,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
