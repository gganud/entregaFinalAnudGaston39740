import pino from 'pino';

import config from './index.js';

const levels = {
  fatal: 60,
  error: 50,
  warning: 40,
  info: 30,
  http: 20,
  debug: 10
};

const logDirectory = 'logs';
const isProduction = config.env === 'production';


const pinoOptionsProduction = {
    timestamp: pino.stdTimeFunctions.isoTime,
    customLevels: levels,
    useOnlyCustomLevels: true,
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          level: 'info',
          options: {
              colorize: true,
              customLevels: levels,
              useOnlyCustomLevels: true,
              customColors: 'debug:blue,http:green,info:green,warning:yellow,error:red,fatal:red',
              levelFirst: true,
              translateTime: 'yyyy-dd-mm, h:MM:ss TT'
          }
        },
        {
          target: 'pino/file',
          level: 'error',
          options: {
              colorize: true,
              levelFirst: true,
              destination: `./${logDirectory}/errors.log`
          }
        }
      ]
    }
  };

const pinoOptionsDevelopment = {
    timestamp: pino.stdTimeFunctions.isoTime,
    level: 'debug',
    customLevels: levels,
    useOnlyCustomLevels: true,
    transport: {
     target: 'pino-pretty',
     options: {
       colorize: true,
       customLevels: levels,
       useOnlyCustomLevels: true,
       customColors: 'debug:blue,http:green,info:green,warning:yellow,error:red,fatal:red',
       levelFirst: true,
       translateTime: 'yyyy-dd-mm, h:MM:ss TT'
     }
   }
  };


const pinoLogger = pino(isProduction ? pinoOptionsProduction : pinoOptionsDevelopment);

export default pinoLogger;
