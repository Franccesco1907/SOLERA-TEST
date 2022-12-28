import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const host = this.configService.database.host;
    const name = this.configService.database.name;
    const password = this.configService.database.password;
    const port = this.configService.database.port;
    const user = this.configService.database.user;
    return `Hello World! ${host} ${name} ${password} ${port} ${user}`;
  }
}
