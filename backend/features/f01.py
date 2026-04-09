import pandas as pd
import json
import os

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
            return None
    return x


def remove_outliers(df):
    numeric_cols = df.select_dtypes(include=['number']).columns

    for col in numeric_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1

        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR

        df = df[(df[col] >= lower_bound) & (df[col] <= upper_bound)]

    return df


def clean_data():
    try:
        df = pd.read_csv("data/raw/gig_dirty_data.csv")

        original_rows = len(df)

        # REMOVE DUPLICATES
        df = df.drop_duplicates()

        # CONVERT WORDS → NUMBERS
        df = df.applymap(word_to_number)

        # CONVERT TO NUMERIC
        for col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

        # HANDLE MISSING VALUES
        df = df.fillna(df.median(numeric_only=True))

        # REMOVE NEGATIVE VALUES (ONLY NUMERIC)
        numeric_cols = df.select_dtypes(include=['number']).columns
        for col in numeric_cols:
            df = df[df[col] >= 0]

        # REMOVE OUTLIERS (IQR METHOD)
        df = remove_outliers(df)

        df = df.reset_index(drop=True)

        cleaned_rows = len(df)

        # SAVE OUTPUT
        os.makedirs("backend/outputs", exist_ok=True)
        df.to_csv("backend/outputs/cleaned_data.csv", index=False)

        result = {
            "status": "success",
            "data": {
                "original_rows": int(original_rows),
                "cleaned_rows": int(cleaned_rows),
                "columns": df.columns.tolist(),
                "message": "Data cleaned + outliers removed successfully"
            }
        }

    except Exception as e:
        result = {
            "status": "error",
            "message": str(e)
        }

    print(json.dumps(result))


if __name__ == "__main__":
    clean_data()