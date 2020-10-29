/*
 * Created Date: Mon, 29th Jun 2020, 10:46:53 am
 * Author: Joseph Clough
 * Email: joseph.clough@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import { Auth } from 'aws-amplify';

/*
 * Alter this function to add authorisation to apollo endpoint.
 *
 * This file is designed to add a bearer token to 'Authorization' header
 */

// Default AWS Authoriser

export default async function Authorization() {
	// Get Current User Session &  JWT Token
	const cognitoUser = await Auth.currentAuthenticatedUser().catch((err) => {
		return null;
	});
	if (!cognitoUser) {
		// No Authorization
		return null;
	}
	// Refresh Token if Expired
	const expirationDate = cognitoUser.signInUserSession.idToken.payload.exp * 1000;
	if (subMinutes(new Date(expirationDate), 15) < new Date()) {
		const currentSession = await Auth.currentSession();
		return cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
			if (err) {
				// Return no authorization for error
				return null;
			} else {
				const { idToken } = session;
				// return new token
				return idToken.jwtToken;
			}
		});
	} else {
		// return current token
		return cognitoUser.signInUserSession.idToken.jwtToken;
	}
}
