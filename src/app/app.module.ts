// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { CoreModule } from '@api/core/core.module';
// import { LoggerMiddleware } from '@uklon/bff';
// import { AuthModule } from '@api/modules/auth/auth.module';
// import { HealthModule } from '@api/modules/health/health.module';
// import { AccountModule } from '@api/modules/account/account.module';
// import { RegionsModule } from '@api/modules/dictionaries/dictionaries.module';
// import { VehiclesModule } from '@api/modules/vehicles/vehicles.module';
// import { OrdersModule } from '@api/modules/orders/orders.module';
// import { TicketsModule } from '@api/modules/tickets/tickets.module';
// import { DriversModule } from '@api/modules/drivers/drivers.module';
// import { FinanceModule } from '@api/modules/finance/finance.module';

// @Module({
//   imports: [
//     CoreModule,
//     HealthModule,
//     AuthModule,
//     AccountModule,
//     RegionsModule,
//     VehiclesModule,
//     OrdersModule,
//     DriversModule,
//     TicketsModule,
//     FinanceModule
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule implements NestModule {

//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware)
//       .forRoutes('*');
//   }

// }
