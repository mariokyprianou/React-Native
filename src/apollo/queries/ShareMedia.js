



import gql from 'graphql-tag';

export default gql`
query ShareMedia($type: ShareMediaType) {
    shareMedia(type: $type) {
      url
      colour
    }
  }
  `;