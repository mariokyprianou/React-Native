package com.thecoreui;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.RectF;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;

import com.bumptech.glide.Glide;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.lang.reflect.GenericDeclaration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class GIFManager extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    GIFManager(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "GIFManager";
    }

    @ReactMethod
    public void fetch(ReadableMap beforeImageObject, ReadableMap afterImageObject, Promise promise) throws ExecutionException, InterruptedException {
        String beforeImageUri = beforeImageObject.getString("uri");
        int beforeImageWidth = beforeImageObject.getInt("width");
        int beforeImageHeight = beforeImageObject.getInt("height");

        String afterImageUri = afterImageObject.getString("uri");
        int afterImageWidth = afterImageObject.getInt("width");
        int afterImageHeight = afterImageObject.getInt("height");

        Bitmap image1Bitmap = Glide.with(reactContext).asBitmap().load(beforeImageUri).into(beforeImageWidth, beforeImageHeight).get();
        Bitmap image2Bitmap = Glide.with(reactContext).asBitmap().load(afterImageUri).into(afterImageWidth, afterImageHeight).get();

        int targetWidth = image1Bitmap.getWidth();
        int targetHeight = image1Bitmap.getHeight();

        double numberOfImages = 10;
        double chunkWidth = targetWidth / numberOfImages;

        ArrayList<Bitmap> bitmapList = new ArrayList<Bitmap>();
        ArrayList<Bitmap> secondBitmapList = new ArrayList<Bitmap>();
        for (int i = 1; i <= numberOfImages; i++) {
            final Bitmap mergedBitmap = Bitmap.createBitmap(targetWidth, targetHeight, Bitmap.Config.ARGB_8888);
            final Canvas canvas = new Canvas(mergedBitmap);

            double beforeWidth = i * chunkWidth;
            if (beforeWidth == 0.0) {
                beforeWidth = 1.0;
            }
            Bitmap croppedImage1 = Bitmap.createBitmap(image1Bitmap, 0, 0, (int)beforeWidth, targetHeight);

            double afterWidth = (numberOfImages - i) * chunkWidth;
            if (afterWidth == 0.0) {
                afterWidth = 1.0;
            }
            Bitmap croppedImage2 = Bitmap.createBitmap(image2Bitmap, (int)beforeWidth, 0, (int)afterWidth, targetHeight);

            canvas.drawBitmap(croppedImage1, 0f, 0f, null);
            canvas.drawBitmap(croppedImage2, (float) beforeWidth, 0f, null);

            bitmapList.add(mergedBitmap);

            Bitmap mergedBitmap2 = mergedBitmap.copy(mergedBitmap.getConfig(), true);
            secondBitmapList.add(0, mergedBitmap2);

            Log.d("", "Created image: " + Integer.toString(i));
        }

        ArrayList<Bitmap> finalBitmapList = new ArrayList<Bitmap>();
        finalBitmapList.addAll(secondBitmapList);
        finalBitmapList.addAll(bitmapList);

        try {
            byte[] gifData = generateGIF(finalBitmapList);
            File dir = new File(reactContext.getFilesDir(), "GIFs");
            if(!dir.exists()){
                dir.mkdir();
            }

            File file = new File(dir, "powerTransformation.gif");
            FileOutputStream outStream = new FileOutputStream(file.getAbsolutePath());
            outStream.write(gifData);
            outStream.close();
            Log.d("", file.getAbsolutePath());
            Log.d("", reactContext.getFilesDir().getAbsolutePath());
            promise.resolve(file.getAbsolutePath());
        }
        catch(Exception e) {
            promise.reject(e);
            e.printStackTrace();
        }
    }


    public byte[] generateGIF(ArrayList bitmaps) {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        AnimatedGIFEncoder encoder = new AnimatedGIFEncoder();
        encoder.setRepeat(0);
        encoder.start(bos);
        for (Object bitmap : bitmaps) {
            encoder.addFrame((Bitmap) bitmap);
        }
        encoder.finish();
        return bos.toByteArray();
    }
}

