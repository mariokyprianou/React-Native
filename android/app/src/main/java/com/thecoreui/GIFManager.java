package com.thecoreui;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.text.Layout;
import android.text.Spannable;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.util.Log;

import androidx.annotation.NonNull;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.thecoreui.assetCreator.Utils;

import org.jcodec.api.android.AndroidSequenceEncoder;
import org.jcodec.common.model.ColorSpace;
import org.jcodec.common.model.Picture;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

public class GIFManager extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private Utils utils;
    private TextPaint titleStyle = new TextPaint();

    GIFManager(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        utils = new Utils(reactContext);
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
        finalBitmapList.add(image1Bitmap);
        finalBitmapList.addAll(bitmapList);
        finalBitmapList.add(image2Bitmap);

        finalBitmapList.addAll(secondBitmapList);
        finalBitmapList.add(image1Bitmap);
        finalBitmapList.addAll(bitmapList);
        finalBitmapList.add(image2Bitmap);

        finalBitmapList.addAll(secondBitmapList);
        finalBitmapList.add(image1Bitmap);
        finalBitmapList.addAll(bitmapList);
        finalBitmapList.add(image2Bitmap);

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



    @ReactMethod
    public void createVideoFile(ReadableMap map, Promise promise) throws ExecutionException, InterruptedException, IOException {

        String colorString = map.getString("colour");
        titleStyle = utils.getPaint(colorString != null ? colorString : "WHITE");


        // Background image
        String backgroundImageUri = reactContext.getFilesDir().getAbsolutePath() + map.getString("url");
        Bitmap sourceBitmap = utils.getBitmap(backgroundImageUri);

        Bitmap.Config config = sourceBitmap.getConfig();
        if (config == null) {
            config = Bitmap.Config.ARGB_8888;
        }
        int assetWidth = utils.assetWidth;
        int assetHeight = utils.assetHeight;
        Log.e("Dimensions: ", "width: "+ assetWidth + " height: "+ assetHeight);

        // Before image canvas
        Bitmap backgroundBeforeBitmap = Bitmap.createBitmap(assetWidth, assetHeight, config);
        Canvas imageBeforeCanvas = new Canvas(backgroundBeforeBitmap);
        imageBeforeCanvas.drawBitmap(sourceBitmap, 0f, 0f, null);

        String beforePicUri = reactContext.getFilesDir().getAbsolutePath() + map.getString("beforeUrl");
        double margin = assetWidth * 0.05;

        double resolution = (double) assetHeight / (double) assetWidth;
        double width = assetWidth * 0.9;
        double height = width * resolution * 0.85;
        Bitmap image1Bitmap = Glide.with(reactContext).asBitmap().load(beforePicUri)
                .diskCacheStrategy(DiskCacheStrategy.NONE)
                .skipMemoryCache(true)
                .centerCrop()
                .submit((int) width, (int) height).get();
        imageBeforeCanvas.drawBitmap(image1Bitmap,(int) margin, (int) 120.0, null);

        // After image canvas
        Bitmap backgroundAfterBitmap = Bitmap.createBitmap(assetWidth, assetHeight, config);
        Canvas imageAfterCanvas = new Canvas(backgroundAfterBitmap);
        imageAfterCanvas.drawBitmap(sourceBitmap, 0f, 0f, null);
        String afterPicUri = reactContext.getFilesDir().getAbsolutePath() + map.getString("afterUrl");
        Bitmap image2Bitmap = Glide.with(reactContext).asBitmap().load(afterPicUri)
                .diskCacheStrategy(DiskCacheStrategy.NONE)
                .skipMemoryCache(true)
                .centerCrop()
                .submit((int) width, (int) height).get();
        imageAfterCanvas.drawBitmap(image2Bitmap,(int) margin, (int) 120.0, null);


        // Date Text UI
        String beforeDate = map.getString("beforeDate");
        Spannable beforeSpan = utils.transformationDate(beforeDate);
        StaticLayout textBeforeLayout = new StaticLayout(
                beforeSpan, titleStyle, imageBeforeCanvas.getWidth(), Layout.Alignment.ALIGN_NORMAL, 0.8f, 0.0f, false);

        String afterDate = map.getString("afterDate");
        Spannable afterSpan = utils.transformationDate(afterDate);
        StaticLayout textAfterLayout = new StaticLayout(
                afterSpan, titleStyle, imageBeforeCanvas.getWidth(), Layout.Alignment.ALIGN_OPPOSITE, 0.8f, 0.0f, false);

        // Add text on images
        float textPositionY = (float) (120.0 + height + 12.0);
        float textLeftPositionX = (float) margin;
        float textRightPositionX = -(float) margin;

        utils.positionOnCanvas(imageBeforeCanvas, textBeforeLayout, textLeftPositionX, textPositionY);
        utils.positionOnCanvas(imageBeforeCanvas, textAfterLayout, textRightPositionX, textPositionY);

        utils.positionOnCanvas(imageAfterCanvas, textBeforeLayout, textLeftPositionX, textPositionY);
        utils.positionOnCanvas(imageAfterCanvas, textAfterLayout, textRightPositionX, textPositionY);

        /**  Save images **/
        File beforeImageFile = new File(beforePicUri);
        utils.saveImage(backgroundBeforeBitmap, beforeImageFile);
        Log.d("beforeImageFile", beforeImageFile.getAbsolutePath());

        File afterImageFile = new File(afterPicUri);
        utils.saveImage(backgroundAfterBitmap, afterImageFile);
        Log.d("afterImageFile", afterImageFile.getAbsolutePath());


        // Start frame creation


        int targetWidth = utils.assetWidth % 2 == 0 ? utils.assetWidth : utils.assetWidth - 1;
        int targetHeight = utils.assetHeight % 2 == 0 ? utils.assetHeight : utils.assetHeight - 1;

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
            else if (beforeWidth == targetWidth) {
                beforeWidth = beforeWidth - 1f;
            }
            Bitmap croppedImage1 = Bitmap.createBitmap(backgroundBeforeBitmap, 0, 0, (int)beforeWidth, targetHeight);

            double afterWidth = (numberOfImages - i) * chunkWidth;
            if (afterWidth == 0.0) {
                afterWidth = 0.1;
            }
            else if (afterWidth == targetWidth) {
                afterWidth = afterWidth - 0.1;
            }

            Bitmap croppedImage2 = Bitmap.createBitmap(backgroundAfterBitmap, (int)beforeWidth - 1, 0, (int)afterWidth + 1, targetHeight);

            canvas.drawBitmap(croppedImage1, 0f, 0f, null);
            canvas.drawBitmap(croppedImage2, (float) beforeWidth - 1, 0f, null);

            bitmapList.add(mergedBitmap);

            Bitmap mergedBitmap2 = mergedBitmap.copy(mergedBitmap.getConfig(), true);
            secondBitmapList.add(0, mergedBitmap2);

            Log.d("", "Created image: " + Integer.toString(i));
        }

        ArrayList<Bitmap> finalBitmapList = new ArrayList<Bitmap>();
        finalBitmapList.addAll(secondBitmapList);
        finalBitmapList.addAll(bitmapList);
        finalBitmapList.addAll(secondBitmapList);
        finalBitmapList.addAll(bitmapList);
        finalBitmapList.addAll(secondBitmapList);
        finalBitmapList.addAll(bitmapList);


        // File to store video in
        File dir = new File(reactContext.getFilesDir().getAbsolutePath(), "imageCache");
        if(!dir.exists()){
            dir.mkdir();
        }

        try {
            File file = new File(dir, "video.mp4");
            AndroidSequenceEncoder encoder = AndroidSequenceEncoder.createSequenceEncoder(file, 16);

            for (int i = 0; i < finalBitmapList.size(); i++) {
                Bitmap bitmap = finalBitmapList.get(i);
                if (bitmap.getHeight() > 0 && bitmap.getWidth() > 0) {
                    encoder.encodeImage(bitmap);
                }
            }
            encoder.finish();

            promise.resolve(file.getAbsolutePath());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

