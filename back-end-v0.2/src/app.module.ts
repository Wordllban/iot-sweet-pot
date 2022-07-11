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
  providers: [AppService],
})
export class AppModule {}
