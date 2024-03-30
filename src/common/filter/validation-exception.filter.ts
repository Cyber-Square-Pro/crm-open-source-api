import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
    Logger,
  } from '@nestjs/common';
import { Response } from 'express';
import { I18nService, I18nContext } from 'nestjs-i18n';
import {isArray} from 'lodash';
  
  @Catch(BadRequestException)
  export class ValidationExceptionFilter implements ExceptionFilter {
    constructor(private readonly i18n: I18nService) {}
  
    logger = new Logger(ValidationExceptionFilter.name);
  
    catch(exception: BadRequestException, host: ArgumentsHost) {
      try {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const currentContext = I18nContext.current() || { lang: 'en' };
        const lang = currentContext.lang;
        this.logger.error(exception.getResponse()['message']);
        return response.status(400).json({
          success: false,
          statusCode: response.statusCode,
          message: this.i18n.translate('translation.operation.failed', { lang }),
          data: [],
          error: isArray(exception.getResponse()['message']) ? exception.getResponse()['message']:['invalid payload'],
        });
      } catch (e) {
        //this.logger.error(e);
      }
    }
  }