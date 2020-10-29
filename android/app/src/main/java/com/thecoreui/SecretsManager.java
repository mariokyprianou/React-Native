package com.thecoreui;


import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.Map;
import java.util.HashMap;

public class SecretsManager extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    SecretsManager(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "AndroidSecretsManager";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap fetch(String environment) {
        final WritableMap constants = new WritableNativeMap();

        if (environment != null && environment.toLowerCase().contains("prod")) {
            constants.putString("graphQLUrl", BuildConfig.AWS_GRAPHQL_URL_PRODUCTION);
            constants.putString("awsRegion", BuildConfig.AWS_REGION_PRODUCTION);
            constants.putString("userPoolId", BuildConfig.AWS_USER_POOL_ID_PRODUCTION);
            constants.putString("clientId", BuildConfig.AWS_USER_POOL_CLIENT_ID_PRODUCTION);
            constants.putString("checksum", BuildConfig.CHECKSUM);
            return constants;
        }

        if (environment != null && environment.toLowerCase().contains("dev")) {
            constants.putString("graphQLUrl", BuildConfig.AWS_GRAPHQL_URL_DEVELOPMENT);
            constants.putString("awsRegion", BuildConfig.AWS_REGION_DEVELOPMENT);
            constants.putString("userPoolId", BuildConfig.AWS_USER_POOL_ID_DEVELOPMENT);
            constants.putString("clientId", BuildConfig.AWS_USER_POOL_CLIENT_ID_DEVELOPMENT);
            constants.putString("checksum", BuildConfig.CHECKSUM);
            return constants;
        }

        constants.putString("graphQLUrl", BuildConfig.AWS_GRAPHQL_URL_STAGING);
        constants.putString("awsRegion", BuildConfig.AWS_REGION_STAGING);
        constants.putString("userPoolId", BuildConfig.AWS_USER_POOL_ID_STAGING);
        constants.putString("clientId", BuildConfig.AWS_USER_POOL_CLIENT_ID_STAGING);
        constants.putString("checksum", BuildConfig.CHECKSUM);
        return constants;
    }
}
