import { Controller, Get } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  getTestPage(): string {
    const htmlPath = join(__dirname, '..', 'public', 'index.html');
    return readFileSync(htmlPath, 'utf8');
  }
}
