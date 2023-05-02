import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { message } from 'antd';
import { createUploadLink } from 'apollo-upload-client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

export const SERVER = process.env.REACT_APP_BASE_URL!;
export const SOCKET = process.env.REACT_APP_SOCKET_URL!;

function apolloClient() {
  const enhancedFetch = async (url: RequestInfo, init: RequestInit) => {
    return await fetch(url, {
      ...init,
      headers: {
        ...init.headers,
      },
      credentials: 'include',
    });
  };

  const uploadLink = createUploadLink({
    uri: SERVER,
    credentials: 'include',
    fetch: enhancedFetch,
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: SOCKET,

      connectionParams: {
        credential: 'include',
      },
    }),
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);

      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    uploadLink,
  );

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        credential: 'include',
      },
    });
    return forward(operation);
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }: any) => {
      const unauthorizedError =
        graphQLErrors &&
        graphQLErrors.find((item: any) => item.message === 'Unauthorized');

      if (unauthorizedError) {
        message.error('장기간 사용하지 않아 자동 로그아웃되었습니다.');
      }

      if (networkError) {
        message.error('네트워크 상태가 올바르지 않습니다.');
      }
    },
  );

  const client = new ApolloClient({
    link: ApolloLink.from([authMiddleware, errorLink, splitLink]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
    headers: {
      //   'keep-alive': 'true',
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Headers': '*',
    },
    credentials: 'include',
  });

  return client;
}

export default apolloClient;
