export const envStub = {
  NODE_ENV: 'development',
};

export const configServiceMock = {
  get: (envVar: string) => envStub[envVar],
};
