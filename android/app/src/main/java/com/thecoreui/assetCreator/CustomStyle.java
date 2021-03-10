package com.thecoreui.assetCreator;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.TextPaint;

import androidx.core.content.ContextCompat;

import com.thecoreui.R;

public class CustomStyle {

    public TextPaint getPaint(Context reactContext, String type) {
        TextPaint paintText = new TextPaint(Paint.ANTI_ALIAS_FLAG);
        Typeface font = Typeface.createFromAsset(reactContext.getAssets(), "fonts/proximanova-medium.otf");

        paintText.setStyle(Paint.Style.FILL);
        paintText.setTypeface(font);
        paintText.setColor(ContextCompat.getColor(reactContext, R.color.white));

        return paintText;
    }

    public SpannableStringBuilder setCustomFont(Context reactContext, SpannableStringBuilder workoutsSpan, int start, int end, String fontPath) {
        Typeface font = Typeface.createFromAsset(reactContext.getAssets(), fontPath);
        workoutsSpan.setSpan(new CustomTypefaceSpan("", font), start, end, Spanned.SPAN_INCLUSIVE_INCLUSIVE);
        return workoutsSpan;
    }
}
