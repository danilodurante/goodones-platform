import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayMpeClient {
  async send(payload: any): Promise<{ externalId: string; status: string }> {
    console.log('[FAKE PlayMPE] Sending payload:', payload);
    return {
      externalId: 'PMPE-' + Math.random().toString(36).substring(2, 10),
      status: 'accepted',
    };
  }
}
