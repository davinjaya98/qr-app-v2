declare module '@capacitor/core' {
  interface PluginRegistry {
    DCatalystDecryptor: DCatalystDecryptorPlugin;
  }
}

export interface DCatalystDecryptorPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  decrypt(options: { data: string }): Promise<string>;
}
