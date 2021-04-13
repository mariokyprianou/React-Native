package com.thecoreui.assetCreator;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.text.style.AbsoluteSizeSpan;
import android.text.style.RelativeSizeSpan;
import android.util.DisplayMetrics;
import android.util.Log;

import androidx.core.content.ContextCompat;

import com.bumptech.glide.Glide;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class Utils {

    int padding = 10;
    int topPadding = 40;

    int assetWidth = 1080;
    int assetHeight = 1920;

    Context context;

    Typeface bold;
    Typeface medium;


    public Utils(Context reactContext) {
        this.context = reactContext;

        bold = Typeface.createFromAsset(reactContext.getAssets(), "fonts/proximanova-bold.otf");
        medium = Typeface.createFromAsset(reactContext.getAssets(), "fonts/proximanova-medium.otf");
    }

    public TextPaint getPaint(String colorString) {
        TextPaint paintText = new TextPaint(Paint.ANTI_ALIAS_FLAG);
        paintText.setStyle(Paint.Style.FILL);
        paintText.setAntiAlias(true);

        int colour;
        switch (colorString) {
            case "BLACK": {
                colour = android.R.color.black;
                break;
            }
            case "BLUE": {
                colour = android.R.color.holo_blue_dark;
                break;
            }
            case "RED": {
                colour = android.R.color.holo_red_dark;
                break;
            }
            case "GREEN": {
                colour = android.R.color.holo_green_dark;
                break;
            }
            default:
                colour = android.R.color.white;
                break;
        }

        paintText.setColor(ContextCompat.getColor(context, colour));

        return paintText;
    }



    public Spannable completeWorkoutTitle(String title, int assetWidth) {
        SpannableStringBuilder titleSpan = new SpannableStringBuilder(title);
        titleSpan.setSpan(new AbsoluteSizeSpan(assetWidth / 20), 0, titleSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        titleSpan.setSpan(new CustomTypefaceSpan("", bold),0, titleSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);


        return titleSpan;
    }

    public Spannable completedWorkoutsText(String workoutsCompleted, String workoutsCompletedText, int assetWidth) {
        SpannableStringBuilder workoutsSpan = new SpannableStringBuilder(workoutsCompleted);
        workoutsSpan.append("\n").append(workoutsCompletedText);

        // Set font sizes
        workoutsSpan.setSpan(new AbsoluteSizeSpan(assetWidth / 10), 0, workoutsCompleted.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        workoutsSpan.setSpan(new android.text.style.StyleSpan(android.graphics.Typeface.BOLD),0, workoutsCompleted.length(), Spannable.SPAN_INCLUSIVE_INCLUSIVE);
        workoutsSpan.setSpan(new CustomTypefaceSpan("", bold),0, workoutsCompleted.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        workoutsSpan.setSpan(new AbsoluteSizeSpan(assetWidth / 20), workoutsCompleted.length(), workoutsSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        workoutsSpan.setSpan(new CustomTypefaceSpan("", medium),  workoutsCompleted.length(), workoutsSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        return workoutsSpan;
    }


    public Spannable completedWorkoutDurationText(String totalTime, String totalTimeText, int assetWidth) {
        SpannableStringBuilder timeSpan = new SpannableStringBuilder(totalTime);
        timeSpan.append("\n").append(totalTimeText);

        // Set font sizes
        timeSpan.setSpan(new AbsoluteSizeSpan(assetWidth / 10), 0, totalTime.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        timeSpan.setSpan(new android.text.style.StyleSpan(android.graphics.Typeface.BOLD),0, totalTime.length(), Spannable.SPAN_INCLUSIVE_INCLUSIVE);
        timeSpan.setSpan(new CustomTypefaceSpan("", bold),0, totalTime.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        timeSpan.setSpan(new AbsoluteSizeSpan(assetWidth / 20), totalTime.length(), timeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        timeSpan.setSpan(new CustomTypefaceSpan("", medium),  totalTime.length(), timeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        return timeSpan;
    }

    public Spannable achievedStringChallenge(String achievedValue, String subtitle, int assetWidth) {
        SpannableStringBuilder challengeSpan = new SpannableStringBuilder(achievedValue);
        challengeSpan.append("\n").append(subtitle);

        // Set font sizes
        challengeSpan.setSpan(new AbsoluteSizeSpan(assetWidth / 10), 0, achievedValue.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        challengeSpan.setSpan(new android.text.style.StyleSpan(android.graphics.Typeface.BOLD),0, achievedValue.length(), Spannable.SPAN_INCLUSIVE_INCLUSIVE);
        challengeSpan.setSpan(new CustomTypefaceSpan("", bold),0, achievedValue.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        challengeSpan.setSpan(new AbsoluteSizeSpan(assetWidth / 20), achievedValue.length(), challengeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        challengeSpan.setSpan(new CustomTypefaceSpan("", medium), achievedValue.length(), challengeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        return challengeSpan;
    }

    public Spannable achievedNumberChallenge(String achievedValue, String subtitle, int assetWidth) {
        SpannableStringBuilder challengeSpan = new SpannableStringBuilder(achievedValue);
        challengeSpan.append("\n").append(subtitle);

        // Set font sizes
        challengeSpan.setSpan(new AbsoluteSizeSpan(assetWidth / 6), 0, achievedValue.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        challengeSpan.setSpan(new android.text.style.StyleSpan(android.graphics.Typeface.BOLD),0, achievedValue.length(), Spannable.SPAN_INCLUSIVE_INCLUSIVE);
        challengeSpan.setSpan(new CustomTypefaceSpan("", bold),0, achievedValue.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        challengeSpan.setSpan(new AbsoluteSizeSpan(assetWidth / 20), achievedValue.length(), challengeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        challengeSpan.setSpan(new CustomTypefaceSpan("", medium), achievedValue.length(), challengeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        return challengeSpan;
    }


    public void positionOnCanvas(Canvas canvas, StaticLayout layout, float x, float y) {
        // draw text to custom position
        canvas.save();
        canvas.translate(x, y);
        layout.draw(canvas);
        canvas.restore();
    }


    public void saveImage(Bitmap newBitmap, File imageFile) throws IOException {
        FileOutputStream out = new FileOutputStream(imageFile);
        newBitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
        out.flush();
        out.close();
    }

    public Bitmap getBitmap(String imagePath) throws ExecutionException, InterruptedException {
        DisplayMetrics displayMetrics = context.getResources().getDisplayMetrics();
        int width = displayMetrics.widthPixels;
        int height = displayMetrics.heightPixels;
        Log.e("Screen Dimensions", " width = "+displayMetrics.widthPixels+ " height = "+ displayMetrics.heightPixels );


        Bitmap sourceBitmap = Glide.with(context).asBitmap().load(imagePath).submit().get();

        assetWidth = sourceBitmap.getWidth();
        assetHeight = sourceBitmap.getHeight();
        Log.e("Bitmap Dimensions", " width = "+assetWidth+ " height = "+ assetHeight );

        topPadding = assetHeight / 6;
        padding = assetWidth / 20;

        return sourceBitmap;
    }

    public Spannable transformationDate(String title) {
        SpannableStringBuilder titleSpan = new SpannableStringBuilder(title);
        titleSpan.setSpan(new AbsoluteSizeSpan(40), 0, titleSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        titleSpan.setSpan(new CustomTypefaceSpan("", bold),0, titleSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        return titleSpan;
    }



}
