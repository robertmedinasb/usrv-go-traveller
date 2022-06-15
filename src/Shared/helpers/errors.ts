import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export enum CodeErrorEnum {
  NOT_FOUND_ERROR = '404',
  UNAUTHORIZED = '403',
  BAD_REQUEST = '400',
  INTERNAL_SERVER_ERROR = '500',
}

export class ErrorResponse {
  constructor(
    code: CodeErrorEnum,
    message?: string,
    error?: { [key: string]: string },
  ) {
    const objectError: { [key: string]: any } = {
      message,
    };
    console.error({ error });

    if (!!error)
      objectError.metadata = error.sqlMessage
        ? { sqlMessage: error.sqlMessage }
        : `${JSON.stringify({ ...error })}`;

    switch (code) {
      case CodeErrorEnum.NOT_FOUND_ERROR:
        return new NotFoundException(objectError);
        break;
      case CodeErrorEnum.INTERNAL_SERVER_ERROR:
        return new InternalServerErrorException(objectError);
        break;
      case CodeErrorEnum.UNAUTHORIZED:
        return new UnauthorizedException(objectError);
        break;
      case CodeErrorEnum.BAD_REQUEST:
        return new BadRequestException(objectError);
        break;
    }
  }
}
