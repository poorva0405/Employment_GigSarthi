import pandas as pd
import numpy as np
import json
import os

# 🔹 Convert words → numbers
def word_to_number(x):
    mapping = {
        "zero": 0, "one": 1, "two": 2, "three": 3,
        "four": 4, "five": 5, "six": 6, "seven": 7,
        "eight": 8, "nine": 9, "ten": 10
    }

    if isinstance(x, str):
        x = x.strip().lower()
        if x in mapping:
            return mapping[x]
        if x in ["none", "null", "na", "??", ""]:
            return np.nan
    return x


def process_data():
    try:
        # ✅ READ DATA
        df = pd.read_csv("data/raw/gig_dirty_data.csv")

        original_rows = len(df)

        # ✅ DROP DUPLICATES
        df = df.drop_duplicates()

        # ✅ CLEAN WORD VALUES
        df = df.applymap(word_to_number)

        # ✅ CONVERT NUMERIC COLUMNS
        numeric_cols = ["earnings_per_day", "hours_worked", "jobs_completed", "rating"]

        for col in numeric_cols:
            df[col] = pd.to_numeric(df[col], errors="coerce")

        # ✅ HANDLE MISSING VALUES
        df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())

        # ✅ REMOVE NEGATIVE VALUES
        for col in numeric_cols:
            df = df[df[col] >= 0]

        df = df.reset_index(drop=True)

        cleaned_rows = len(df)

        # ==============================
        # 🔥 STANDARDIZATION
        # ==============================

        # Z-SCORE
        z_score_df = df.copy()
        for col in numeric_cols:
            mean = df[col].mean()
            std = df[col].std()
            z_score_df[col] = (df[col] - mean) / std

        # MIN-MAX SCALING
        minmax_df = df.copy()
        for col in numeric_cols:
            min_val = df[col].min()
            max_val = df[col].max()
            minmax_df[col] = (df[col] - min_val) / (max_val - min_val)

        # ==============================
        # 🔥 OUTLIER DETECTION (IQR)
        # ==============================

        outliers = {}
        for col in numeric_cols:
            Q1 = df[col].quantile(0.25)
            Q3 = df[col].quantile(0.75)
            IQR = Q3 - Q1

            lower = Q1 - 1.5 * IQR
            upper = Q3 + 1.5 * IQR

            outliers[col] = int(((df[col] < lower) | (df[col] > upper)).sum())

        # ==============================
        # 💾 SAVE FILES
        # ==============================

        os.makedirs("backend/outputs", exist_ok=True)

        df.to_csv("backend/outputs/cleaned_data.csv", index=False)
        z_score_df.to_csv("backend/outputs/zscore_scaled.csv", index=False)
        minmax_df.to_csv("backend/outputs/minmax_scaled.csv", index=False)

        # ==============================
        # 📊 FINAL OUTPUT
        # ==============================

        result = {
            "status": "success",
            "data": {
                "original_rows": int(original_rows),
                "cleaned_rows": int(cleaned_rows),
                "columns": df.columns.tolist(),
                "outliers_detected": outliers
            }
        }

    except Exception as e:
        result = {
            "status": "error",
            "message": str(e)
        }

    print(json.dumps(result, indent=4))


if __name__ == "__main__":
    process_data()