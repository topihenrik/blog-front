import { ImageResponse } from './imagemodel.ts';

export interface ShortUserResponse {
    id: string;
    firstName: string;
    lastName: string;
    avatar: ImageResponse | null;
}
