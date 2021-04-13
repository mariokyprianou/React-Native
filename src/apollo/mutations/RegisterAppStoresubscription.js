
import gql from 'graphql-tag';

export default gql`
mutation RegisterAppStoreSubscription($input: RegisterAppStoreSubscriptionInput!) {
    registerAppStoreSubscription(input: $input) {
    success
    subscription {
      isActive
    }
  }
}
`;