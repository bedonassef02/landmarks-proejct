import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../../../utils/constants/constants';

export const Public = () => SetMetadata(PUBLIC_KEY, true);
