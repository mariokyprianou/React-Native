


import gql from 'graphql-tag';

export default gql`
mutation RegisterGooglePlaySubscription($input: RegisterGooglePlaySubscriptionInput!) {
    registerGooglePlaySubscription(input: $input) {
    success
    subscription {
      isActive
    }
  }
}
`;
