import { Auth } from '@auth/core';
import { authConfig } from '@nexus/auth/config';

export const GET = (request: Request) => Auth(request, authConfig);
export const POST = (request: Request) => Auth(request, authConfig);
