module.exports.ecode = {
  DEV_ENVIRONMENT: ['development', 'staging'],
  CACHE_TIME: {
    'MIN': 2 * 60,
    'M5': 5 * 60,
    'M10': 10 * 60,
    'M15': 15 * 60,
    'M30': 30 * 60,
    'H1': 60 * 60,
    'H2': 2 * 60 * 60,
    'H4': 4 * 60 * 60,
    'H6': 6 * 60 * 60,
    'H12': 12 * 60 * 60,
    'MAX': 24 * 60 * 60,
  },
  PROMOTION_EVENT_KEY: 'XJHBF4LBJAPZKsBpjTKfAEyS5HGYEAtdaZrsE2DZshQNmh2fMnmXSvGy3Ynjbrnb',
  SERVICE_AUTH: [
    {
      SERVICE_NAME: 'billing-fimplus',
      SERVICE_KEY: 'vbVmQRGXuspfKkyuceRZ43bB5B9LRhyc65pLyFzRXzJjJ7qxb6n6JphEBg2haak6'
    },
    {
      SERVICE_NAME: 'cm-fimplus',
      SERVICE_KEY: 'pc7ALuEqv2Tr8erDVPbpEpzj3wvy4pqgrnu2FX2ZBw3zB4N8HAmXNw8GDtQxs6EG'
    }
  ],
  JWT_CONFIG: {
    EXPIRED_TIME: '1d', // msjs formatted
    SECRET_KEY: 'FgJkkRMa4A7eASyNZJNpAnkDXBZMFgBbpa8yRKzxWgBnZKLBjqPvBYYarAyGGYJV'
  },
  HTTP_STATUS_CODE: {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PRECONDITION_FAILED: 412,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
  },
};
