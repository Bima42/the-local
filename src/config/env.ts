import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.url(),
        NEXT_PUBLIC_GOOGLE_MAPS_KEY: z.string().min(1, 'Google Maps API key is required'),
        NEXT_PUBLIC_GOOGLE_MAP_ID: z.string().min(1, 'Google Maps ID is required'),
    },
    runtimeEnv: {
        // Server
        NODE_ENV: process.env.NODE_ENV,

        // Client
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        NEXT_PUBLIC_GOOGLE_MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true
});
