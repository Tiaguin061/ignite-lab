import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { DatabaseModule } from '../database/database.module';
import { CoursesService } from '../services/courses.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';
import { CourseResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentResolver } from './graphql/resolvers/students.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
    }),
  ],
  providers: [
    // Services
    CoursesService,
    EnrollmentsService,
    StudentsService,

    // Resolvers
    CourseResolver,
    EnrollmentResolver,
    StudentResolver,
  ],
})
export class HttpModule {}
