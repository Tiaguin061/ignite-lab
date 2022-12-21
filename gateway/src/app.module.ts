import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver } from '@nestjs/apollo';
import { ApolloGatewayDriverConfig } from '@nestjs/apollo/dist/interfaces';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
        context: ({ req }) => {
          return {
            headers: req.headers,
          };
        },
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'purchases',
              url: 'http://localhost:3333/graphql',
            },
            {
              name: 'classroom',
              url: 'http://localhost:3334/graphql',
            },
          ],
        }),
        // Passando headers compartilhado para cada sub graph
        buildService: ({ url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set(
                'authorization',
                context?.['headers']?.['authorization'],
              );
            },
          });
        },
      },
    }),
  ],
})
export class AppModule {}
