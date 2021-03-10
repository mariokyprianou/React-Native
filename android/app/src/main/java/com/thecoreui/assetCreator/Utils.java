package com.thecoreui.assetCreator;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.text.Layout;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.text.style.AbsoluteSizeSpan;
import android.text.style.RelativeSizeSpan;

import androidx.core.content.ContextCompat;

import com.thecoreui.R;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class Utils {

    int padding = 10;
    int topPadding = 40;
    Context context;

    Typeface bold;
    Typeface medium;


    public Utils(Context reactContext) {
        this.context = reactContext;

        bold = Typeface.createFromAsset(reactContext.getAssets(), "fonts/proximanova-bold.otf");
        medium = Typeface.createFromAsset(reactContext.getAssets(), "fonts/proximanova-medium.otf");
    }

    public TextPaint getPaint() {
        TextPaint paintText = new TextPaint(Paint.ANTI_ALIAS_FLAG);
        paintText.setStyle(Paint.Style.FILL);
        paintText.setColor(ContextCompat.getColor(context, R.color.white));

        return paintText;
    }


    public Spannable completeWorkoutTitle(String title) {
        SpannableStringBuilder titleSpan = new SpannableStringBuilder(title);
        titleSpan.setSpan(new AbsoluteSizeSpan(20), 0, titleSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        return titleSpan;
    }

    public Spannable completedWorkoutsText(String workoutsCompleted, String workoutsCompletedText) {
        SpannableStringBuilder workoutsSpan = new SpannableStringBuilder(workoutsCompleted);
        workoutsSpan.append("\n").append(workoutsCompletedText);

        // Set font sizes
        workoutsSpan.setSpan(new AbsoluteSizeSpan(40), 0, workoutsCompleted.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        workoutsSpan.setSpan(new android.text.style.StyleSpan(android.graphics.Typeface.BOLD),0, workoutsCompleted.length(), Spannable.SPAN_INCLUSIVE_INCLUSIVE);
        workoutsSpan.setSpan(new CustomTypefaceSpan("", bold),0, workoutsCompleted.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        workoutsSpan.setSpan(new AbsoluteSizeSpan(18), workoutsCompleted.length(), workoutsSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        workoutsSpan.setSpan(new CustomTypefaceSpan("", medium),  workoutsCompleted.length(), workoutsSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        return workoutsSpan;
    }


    public Spannable completedWorkoutDurationText(String totalTime, String totalTimeText) {
        SpannableStringBuilder timeSpan = new SpannableStringBuilder(totalTime);
        timeSpan.append("\n").append(totalTimeText);

        // Set font sizes
        timeSpan.setSpan(new AbsoluteSizeSpan(40), 0, totalTime.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        timeSpan.setSpan(new android.text.style.StyleSpan(android.graphics.Typeface.BOLD),0, totalTime.length(), Spannable.SPAN_INCLUSIVE_INCLUSIVE);
        timeSpan.setSpan(new CustomTypefaceSpan("", bold),0, totalTime.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        timeSpan.setSpan(new AbsoluteSizeSpan(18), totalTime.length(), timeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        timeSpan.setSpan(new CustomTypefaceSpan("", medium),  totalTime.length(), timeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        return timeSpan;
    }

    public Spannable achievedStringChallenge(String achievedValue, String subtitle) {
        SpannableStringBuilder challengeSpan = new SpannableStringBuilder(achievedValue);
        challengeSpan.append("\n").append(subtitle);

        // Set font sizes
        challengeSpan.setSpan(new RelativeSizeSpan(3f), 0, achievedValue.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        challengeSpan.setSpan(new android.text.style.StyleSpan(android.graphics.Typeface.BOLD),0, achievedValue.length(), Spannable.SPAN_INCLUSIVE_INCLUSIVE);
        challengeSpan.setSpan(new CustomTypefaceSpan("", bold),0, achievedValue.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        challengeSpan.setSpan(new AbsoluteSizeSpan(15), achievedValue.length(), challengeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        challengeSpan.setSpan(new CustomTypefaceSpan("", medium), achievedValue.length(), challengeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        return challengeSpan;
    }

    public Spannable achievedNumberChallenge(String achievedValue, String subtitle) {
        SpannableStringBuilder challengeSpan = new SpannableStringBuilder(achievedValue);
        challengeSpan.append("\n").append(subtitle);

        // Set font sizes
        challengeSpan.setSpan(new RelativeSizeSpan(6f), 0, achievedValue.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        challengeSpan.setSpan(new android.text.style.StyleSpan(android.graphics.Typeface.BOLD),0, achievedValue.length(), Spannable.SPAN_INCLUSIVE_INCLUSIVE);
        challengeSpan.setSpan(new CustomTypefaceSpan("", bold),0, achievedValue.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        challengeSpan.setSpan(new AbsoluteSizeSpan(15), achievedValue.length(), challengeSpan.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
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


}
