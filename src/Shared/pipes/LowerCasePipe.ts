import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class LowerCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const excludedKeys = ['typeDocument', 'gender', 'birthDate'];

    if (metadata.type === 'body') {
      const newValues = {};
      Object.entries(value).map(([key, val]: [any, any]) => {
        let newValue = val;
        if (typeof val === 'string' && !excludedKeys.includes(key))
          newValue = val.toLocaleLowerCase();
        newValues[key] = newValue;
      });
      return newValues;
    }

    return value;
  }
}
