import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export enum ACCESS_KEYS {
  PRIVATE = 'PRIVATE_ACCESS',
}

export const PrivateAccess = () => SetMetadata(ACCESS_KEYS.PRIVATE, true);

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService<Environment>,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Malformed token');
    }

    return token;
  }

  private async validateAndDecodeToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async handleHttpAuth(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);
    const payload = await this.validateAndDecodeToken(token);

    request['user'] = payload;

    return true;
  }

  private async mapHandlerFromContext(context: ExecutionContext) {
    const contextType = context.getType();

    if (contextType === 'http') {
      return await this.handleHttpAuth(context);
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPrivate = this.reflector.getAllAndOverride(ACCESS_KEYS.PRIVATE, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPrivate) {
      return await this.mapHandlerFromContext(context);
    }

    return true;
  }
}
