/*
 * Created Date: Thu, 5th Nov 2020, 16:44:14 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const capitalsRegex = /([A-Z]+)/;
export const numbersRegex = /([0-9]+)/;
export const specialRegex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
export const onlyNumbersRegex = /^\d+$/;
export const E164_VALIDATOR = /^\+?[1-9]\d{1,14}$/;
export const weblinkRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

// The string must contain at least 1 lowercase alphabetical character
// The string must contain at least 1 uppercase alphabetical character
// The string must contain at least 1 numeric character
// The string must be eight characters or longer
// The string must contain a special character
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
