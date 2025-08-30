import { Configuration, Value } from '@itgorillaz/configify';
import { IsIn, IsNumber, Max, Min } from 'class-validator';

const Environment = ['development', 'production', 'test'] as const;

@Configuration()
export class AppConfig {
  @IsIn(Environment)
  @Value('NODE_ENV')
  environment: (typeof Environment)[number];

  @IsNumber()
  @Min(0)
  @Max(65535)
  @Value('PORT')
  port: number;
}
