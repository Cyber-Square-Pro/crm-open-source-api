import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { I18nService, I18nContext } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseModelInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const lang = I18nContext.current().lang;
    const requestResponse = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((responseData) => {
        requestResponse.status(responseData.statusCode);
        const success = responseData.statusCode >= 200 && responseData.statusCode < 300;
        const response = {
          success,
          statusCode: responseData.statusCode,
          message: responseData.message
            ? this.i18n.translate(`translation.${responseData.message}`, { lang })
            : this.i18n.translate('translation.operation.failed', { lang }),
          data: responseData.data ? responseData.data : [],
          error: responseData.error ? responseData.error : [],
        };
        return response;
      }),
    );
  }
}