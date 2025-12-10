import { config, DotenvParseOutput } from 'dotenv';

import { Cast } from './infrastructure/utils/cast';

export const configResult = config();

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
}

const { GLOBAL_HTTP_REQ_TIMEOUT, NODE_ENV, PORT, STAND_NAMESPACE, LOCALHOST, DATABASE_URL } = process.env as DotenvParseOutput;

export class Config {
  static databaseUrl = DATABASE_URL;
  static endpointsCacheMaxAge = 1200; // 20 min
  static globalHttpReqTimeout = Cast.tryToInt(GLOBAL_HTTP_REQ_TIMEOUT) || 10000;
  static isProductionMode = (NODE_ENV as NodeEnv) === NodeEnv.Production;
  static localhost = LOCALHOST ?? 'https://api.gamify-platform.ru';
  static nodeEnv = NODE_ENV as NodeEnv;
  static port = Cast.tryToInt(PORT) || 3003;
  static standNamespace = STAND_NAMESPACE;
}
