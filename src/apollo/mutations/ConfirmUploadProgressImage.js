import gql from 'graphql-tag';

export default gql`
  mutation($input: ConfirmUploadProgressImageInput!) {
    confirmUploadProgressImage(input: $input) {
      success
      progressImage {
        id
        takenOn
        url
        createdAt
      }
    }
  }
`;
