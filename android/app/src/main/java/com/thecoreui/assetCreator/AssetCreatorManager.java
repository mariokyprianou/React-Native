package com.thecoreui.assetCreator;

import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.net.Uri;
import android.provider.MediaStore;
import android.text.Layout;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.text.style.AbsoluteSizeSpan;
import android.text.style.RelativeSizeSpan;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.thecoreui.R;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;


public class AssetCreatorManager extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private CustomStyle style = new CustomStyle();

    int assetWidth = 1080;
    int assetHeight = 1920;



    AssetCreatorManager(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "AndroidAssetCreator";
    }



    @ReactMethod
    public void createBase64ImageForWorkoutComplete(ReadableMap map, Promise promise) {
        // construct content, get image and attach content, return Base64 encoded new image
        String title = map.getString("title");
        File imageFile = new File(reactContext.getFilesDir().getAbsolutePath() + map.getString("url"));

        Bitmap sourceBitmap = BitmapFactory.decodeFile(imageFile.getAbsolutePath());
        Bitmap.Config config = sourceBitmap.getConfig();
        if (config == null) {
            config = Bitmap.Config.ARGB_8888;
        }

        assetWidth = sourceBitmap.getWidth();
        assetHeight = sourceBitmap.getHeight();

        // Set image to canvas
        Bitmap newBitmap = Bitmap.createBitmap(assetWidth, assetHeight, config);
        Canvas newCanvas = new Canvas(newBitmap);
        newCanvas.drawBitmap(sourceBitmap, 0f, 0f, null);

        /** Title **/
        int padding = 10;
        int topPadding = 20;
        int textWidth = newCanvas.getWidth() - padding;

        // get position for title text
        float x = 0;
        float y = topPadding;

        // Title style
        TextPaint titleStyle = style.getPaint(reactContext, "small");

        // init StaticLayout for text
        SpannableStringBuilder titleSpan = new SpannableStringBuilder(title);
        titleSpan.setSpan(new AbsoluteSizeSpan(20), 0, titleSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        StaticLayout textLayout = new StaticLayout(
                titleSpan, titleStyle, textWidth, Layout.Alignment.ALIGN_OPPOSITE, 1.0f, 0.0f, false);

        // draw text to custom position
        newCanvas.save();
        newCanvas.translate(x, y);
        textLayout.draw(newCanvas);
        newCanvas.restore();



        /** Workouts Completed **/
        String workoutsCompleted = map.getString("workoutsCompleted");
        String workoutsCompletedText = map.getString("workoutsCompletedText");
        SpannableStringBuilder workoutsSpan = new SpannableStringBuilder(workoutsCompleted);
        workoutsSpan.append("\n").append(workoutsCompletedText);

        // Set font sizes
        workoutsSpan.setSpan(new AbsoluteSizeSpan(40), 0, workoutsCompleted.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        workoutsSpan.setSpan(new AbsoluteSizeSpan(20), workoutsCompleted.length(), workoutsSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);


        // init StaticLayout for workouts
        StaticLayout workoutsLayout = new StaticLayout(
                workoutsSpan, titleStyle, textWidth, Layout.Alignment.ALIGN_OPPOSITE, 1.0f, 0.0f, false);

         x = 0;
         y = (assetHeight / 2) + (topPadding * 2);

        // draw text to custom position
        newCanvas.save();
        newCanvas.translate(x, y);
        workoutsLayout.draw(newCanvas);
        newCanvas.restore();




        /** Total Time **/
        String totalTime = map.getString("totalTimeTrained");
        String totalTimeText = map.getString("totalTimeText");
        SpannableStringBuilder timeSpan = new SpannableStringBuilder(totalTime);
        timeSpan.append("\n").append(totalTimeText);

        // Set font sizes
        timeSpan.setSpan(new AbsoluteSizeSpan(40), 0, totalTime.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        timeSpan.setSpan(new AbsoluteSizeSpan(20), totalTime.length(), timeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        // init StaticLayout for workouts
        StaticLayout totalTimeLayout = new StaticLayout(
                timeSpan, titleStyle, textWidth, Layout.Alignment.ALIGN_OPPOSITE, 1.0f, 0.0f, false);

        int extraSpacing = 10;
        x = 0;
        y = (assetHeight / 2) + (topPadding * 2) + workoutsLayout.getHeight() + extraSpacing;

        // draw text to custom position
        newCanvas.save();
        newCanvas.translate(x, y);
        totalTimeLayout.draw(newCanvas);
        newCanvas.restore();




        // Save image
        try (FileOutputStream out = new FileOutputStream(imageFile)) {
            newBitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        Log.d("createWorkoutComplete", imageFile.getAbsolutePath());
        promise.resolve(imageFile.getAbsolutePath());

    }

    @ReactMethod
    public void createBase64ImageForStringAchievement(String imageUrl, String title, int completedWorkouts, int totalTime, Promise promise) {
        // construct content, get image and attach content, return Base64 encoded new image
        promise.resolve(null);
    }

    @ReactMethod
    public void createBase64ImageForIntAchievement(String imageUrl, String title, int completedWorkouts, int totalTime, Promise promise) {
        // construct content, get image and attach content, return Base64 encoded new image
        promise.resolve(null);
    }



}
