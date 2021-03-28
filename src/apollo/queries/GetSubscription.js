


import gql from 'graphql-tag';

export default gql`
query getSubscription {
    subscription {
      isActive
    }
  }
  `;