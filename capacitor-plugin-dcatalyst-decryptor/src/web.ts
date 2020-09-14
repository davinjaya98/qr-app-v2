import { WebPlugin } from '@capacitor/core';
import { DCatalystDecryptorPlugin } from './definitions';

export class DCatalystDecryptorWeb extends WebPlugin implements DCatalystDecryptorPlugin {
  constructor() {
    super({
      name: 'DCatalystDecryptor',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async decrypt(options: { data: string }): Promise<string> {
    console.log('DECRYPT', options.data)
    return "Unable to decrypt in web mode";
  }
}

const DCatalystDecryptor = new DCatalystDecryptorWeb();

export { DCatalystDecryptor };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(DCatalystDecryptor);
