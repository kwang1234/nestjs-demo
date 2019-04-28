import { Injectable } from '@nestjs/common';
import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  TerminusModuleOptions,
} from '@nestjs/terminus';

@Injectable()
export class AppService implements TerminusOptionsFactory {
  constructor(private readonly dns: DNSHealthIndicator) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => this.dns.pingCheck('google', 'https://google.com'),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
