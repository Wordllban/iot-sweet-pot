import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { HumidityModule } from "./sensors/humidity/humidity.module";
import { MoistureModule } from "./sensors/moisture/moisture.module";
import { TemperatureModule } from "./sensors/temperature/temperature.module";
import { PotModule } from "./pot/pot.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { APP_GUARD } from "@nestjs/core";
import { AccessTokenGuard } from "./common/guards";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HumidityModule,
    MoistureModule,
    TemperatureModule,
    PotModule,
    AuthModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
