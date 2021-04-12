package com.thecoreui.assetCreator;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.text.Layout;
import android.text.Spannable;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;

import java.io.File;
import java.io.IOException;


public class AssetCreatorManager extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private Utils utils;
    private TextPaint titleStyle = new TextPaint();

    int assetWidth = 1080;
    int assetHeight = 1920;



    AssetCreatorManager(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        utils = new Utils(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "AndroidAssetCreator";
    }



    @ReactMethod
    public void createBase64ImageForWorkoutComplete(ReadableMap map, Promise promise) {

        //  get image construct and attach content, return path
        File imageFile = new File(reactContext.getFilesDir().getAbsolutePath() + map.getString("url"));

        Bitmap sourceBitmap = BitmapFactory.decodeFile(imageFile.getAbsolutePath());
        Bitmap.Config config = sourceBitmap.getConfig();
        if (config == null) {
            config = Bitmap.Config.ARGB_8888;
        }

        assetWidth = sourceBitmap.getWidth();
        assetHeight = sourceBitmap.getHeight();
        utils.topPadding = assetHeight / 5;

        // Set image to canvas
        Bitmap newBitmap = Bitmap.createBitmap(assetWidth, assetHeight, config);
        Canvas newCanvas = new Canvas(newBitmap);
        newCanvas.drawBitmap(sourceBitmap, 0f, 0f, null);

        int textWidth = newCanvas.getWidth() - utils.padding;

        String colorString = map.getString("colour");
        titleStyle = utils.getPaint(colorString != null ? colorString : "WHITE");

        /** Title **/
        String title = map.getString("title");
        Spannable titleSpan = utils.completeWorkoutTitle(title);
        StaticLayout textLayout = new StaticLayout(
                titleSpan, titleStyle, textWidth, Layout.Alignment.ALIGN_OPPOSITE, 0.8f, 0.0f, false);

        float x = 0;
        float y = utils.topPadding;
        utils.positionOnCanvas(newCanvas, textLayout, x, y);


        /** Workouts Completed **/
        String workoutsCompleted = map.getString("workoutsCompleted");
        String workoutsCompletedText = map.getString("workoutsCompletedText");
        Spannable workoutsSpan = utils.completedWorkoutsText(workoutsCompleted, workoutsCompletedText);

        StaticLayout workoutsLayout = new StaticLayout(
                workoutsSpan, titleStyle, textWidth, Layout.Alignment.ALIGN_OPPOSITE, 0.8f, 0.0f, false);

         x = 0;
         y = (assetHeight / 2) + (utils.topPadding / 2);
        utils.positionOnCanvas(newCanvas, workoutsLayout, x, y);


        /** Total Time **/
        String totalTime = map.getString("totalTimeTrained");
        String totalTimeText = map.getString("totalTimeText");
        Spannable timeSpan = utils.completedWorkoutDurationText(totalTime, totalTimeText);

        StaticLayout totalTimeLayout = new StaticLayout(
                timeSpan, titleStyle, textWidth, Layout.Alignment.ALIGN_OPPOSITE, 0.8f, 0.0f, false);

        int extraSpacing = 15;
        x = 0;
        y = (assetHeight / 2) + (utils.topPadding / 2) + workoutsLayout.getHeight() + extraSpacing;
        utils.positionOnCanvas(newCanvas, totalTimeLayout, x, y);


        /**  Save image **/
        try  {
            utils.saveImage(newBitmap, imageFile);
            promise.resolve(imageFile.getAbsolutePath());
            Log.d("createWorkoutComplete", imageFile.getAbsolutePath());
        } catch (IOException e) {
            promise.reject(e);
            e.printStackTrace();
        }

    }

    @ReactMethod
    public void createBase64ImageForStringAchievement(ReadableMap map, Promise promise) {

        //  get image construct and attach content, return path
        File imageFile = new File(reactContext.getFilesDir().getAbsolutePath() + map.getString("url"));

        Bitmap sourceBitmap = BitmapFactory.decodeFile(imageFile.getAbsolutePath());
        Bitmap.Config config = sourceBitmap.getConfig();
        if (config == null) {
            config = Bitmap.Config.ARGB_8888;
        }

        assetWidth = sourceBitmap.getWidth();
        assetHeight = sourceBitmap.getHeight();
        utils.topPadding = assetHeight / 5;

        // Set image to canvas
        Bitmap newBitmap = Bitmap.createBitmap(assetWidth, assetHeight, config);
        Canvas newCanvas = new Canvas(newBitmap);
        newCanvas.drawBitmap(sourceBitmap, 0f, 0f, null);

        int textWidth = newCanvas.getWidth() - utils.padding;

        String colorString = map.getString("colour");
        titleStyle = utils.getPaint(colorString != null ? colorString : "WHITE");


        String achievedValue = map.getString("achievedValue");
        String subtitle = map.getString("subtitle");
        Spannable workoutsSpan = utils.achievedStringChallenge(achievedValue, subtitle);

        StaticLayout workoutsLayout = new StaticLayout(
                workoutsSpan, titleStyle, textWidth, Layout.Alignment.ALIGN_NORMAL, 0.8f, 0.0f, false);

        float x = utils.padding;
        float y = utils.topPadding;
        utils.positionOnCanvas(newCanvas, workoutsLayout, x, y);

        /**  Save image **/
        try  {
            utils.saveImage(newBitmap, imageFile);
            promise.resolve(imageFile.getAbsolutePath());
            Log.d("createStringAchievement", imageFile.getAbsolutePath());
        } catch (IOException e) {
            promise.reject(e);
            e.printStackTrace();
        }

    }

    @ReactMethod
    public void createBase64ImageForIntAchievement(ReadableMap map, Promise promise) {

        //  get image construct and attach content, return path
        File imageFile = new File(reactContext.getFilesDir().getAbsolutePath() + map.getString("url"));

        Bitmap sourceBitmap = BitmapFactory.decodeFile(imageFile.getAbsolutePath());
        Bitmap.Config config = sourceBitmap.getConfig();
        if (config == null) {
            config = Bitmap.Config.ARGB_8888;
        }

        assetWidth = sourceBitmap.getWidth();
        assetHeight = sourceBitmap.getHeight();
        utils.topPadding = assetHeight / 5;

        // Set image to canvas
        Bitmap newBitmap = Bitmap.createBitmap(assetWidth, assetHeight, config);
        Canvas newCanvas = new Canvas(newBitmap);
        newCanvas.drawBitmap(sourceBitmap, 0f, 0f, null);

        int textWidth = newCanvas.getWidth() - utils.padding;

        String colorString = map.getString("colour");
        titleStyle = utils.getPaint(colorString != null ? colorString : "WHITE");


        String achievedValue = map.getString("achievedValue");
        String subtitle = map.getString("subtitle");
        Spannable workoutsSpan = utils.achievedNumberChallenge(achievedValue, subtitle);

        StaticLayout workoutsLayout = new StaticLayout(
                workoutsSpan, titleStyle, textWidth, Layout.Alignment.ALIGN_NORMAL, 0.8f, 0.0f, false);

        float x = utils.padding;
        float y = utils.topPadding;
        utils.positionOnCanvas(newCanvas, workoutsLayout, x, y);

        /**  Save image **/
        try  {
            utils.saveImage(newBitmap, imageFile);
            promise.resolve(imageFile.getAbsolutePath());
            Log.d("createIntAchievement", imageFile.getAbsolutePath());
        } catch (IOException e) {
            promise.reject(e);
            e.printStackTrace();
        }
    }



}
