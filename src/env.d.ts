/* 
  Strongly types environment variables for accessing by the ConfigService
  Should be synced with the .env and .env.example files in order to keep consistency over the application environment variables
*/

interface Environment {
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  NODE_ENV: 'development' | 'production';
}
