/*
 * Created Date: Sat, 28th Dec 2019, 14:56:46 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import gql from 'graphql-tag';

const Address = gql`
	type Address {
		formatted: String
		streetAddress: String
		city: String
		postalCode: String
		country: String
	}
`;

const TypeDefs = [Address];

export default TypeDefs;
