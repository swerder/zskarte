const uploadProviders = (env) => {
  const providers = {
    local: {
      config: {
        sizeLimit: 32 * 1024 * 1024,
        localServer: {
          maxage: 300000,
        },
      },
    },
    azure: {
      config: {
        provider: 'strapi-provider-upload-azure-storage',
        providerOptions: {
          authType: env('STORAGE_AUTH_TYPE', 'default'),
          account: env('STORAGE_ACCOUNT'),
          accountKey: env('STORAGE_ACCOUNT_KEY'),
          serviceBaseURL: env('STORAGE_URL'),
          containerName: env('STORAGE_CONTAINER_NAME'),
          defaultPath: '',
          maxConcurrent: 10,
        },
      },
    },
    gcloud: {
      config: {
        provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
        providerOptions: {
          serviceAccount: env.json('GCS_SERVICE_ACCOUNT'),
          bucketName: env('GCS_BUCKET_NAME'),
          basePath: env('GCS_BASE_PATH', ''),
          baseUrl: env('GCS_BASE_URL'),
          publicFiles: env('GCS_PUBLIC_FILES', true),
          uniform: env('GCS_UNIFORM', false),
        },
      },
    }
  };
  return providers[env('STORAGE_PROVIDER', 'local')];
};

export default ({ env }) => ({
  upload: uploadProviders(env),
});
