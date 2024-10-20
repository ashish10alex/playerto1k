declare global {
  namespace NodeJS {
    interface ProcessEnv {
      X_RAPIDAPI_KEY: string;
    }
  }
}

export {};
