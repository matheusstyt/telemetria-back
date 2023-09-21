import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
    secret: 'f64d6a1b-1a2b-416c-8227-649b7598cb16',
  };


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);