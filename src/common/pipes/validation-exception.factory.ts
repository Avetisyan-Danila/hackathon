import { BadRequestException } from '@nestjs/common';
import type { ValidationError } from 'class-validator';

const flattenValidationErrors = (
  errors: ValidationError[],
  parent?: string,
): { property: string; message: string }[] =>
  errors.flatMap((error) => {
    const property = parent ? `${parent}.${error.property}` : error.property;

    const current = Object.values(error.constraints ?? {}).map((message) => ({
      property,
      message,
    }));

    const nested = error.children?.length
      ? flattenValidationErrors(error.children, property)
      : [];

    return [...current, ...nested];
  });

export const validationExceptionFactory = (errors: ValidationError[]) =>
  new BadRequestException(flattenValidationErrors(errors));
