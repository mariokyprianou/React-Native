# Apollo Examples

Create a file for each single Query, Mutation and Implementation within their own directories.

<p>
Examples of Queries, Mutations and Implementations below:

## Queries

Filepath:

`src/apollo/queries`

```
import gql from "graphql-tag";

export default gql`
  query ExampleQuery($input: String) {
    exampleQuery(input: $input) {
      id
      name
    }
  }
`;
```

## Mutations

Filepath:

`src/apollo/mutations`

```
import gql from "graphql-tag";

export default gql`
  mutation ExampleMutation($name: String!) {
    exampleMutation(name: $name) {
      name
    }
  }
`;
```

## Implementations

Use Apollo Hooks... @apollo/react-hooks
https://www.apollographql.com/docs/react/api/react-hooks/

```import { useQuery } from '@apollo/react-hooks';```
```import { useMutation } from '@apollo/react-hooks';```
