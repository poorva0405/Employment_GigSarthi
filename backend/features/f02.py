import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# -----------------------------
# STEP 1: WORD → NUMBER CONVERSION
# -----------------------------
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


# -----------------------------
# STEP 2: CLEANING FUNCTION
# -----------------------------
def clean_data(file_path):
    df = pd.read_csv(file_path)

    print("Original Rows:", len(df))

    # Remove duplicates
    df = df.drop_duplicates()

    # Convert words → numbers
    df = df.applymap(word_to_number)

    # Convert to numeric safely
    for col in ["earnings_per_day", "hours_worked", "jobs_completed", "rating"]:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    # Handle missing values (median)
    df.fillna(df.median(numeric_only=True), inplace=True)

    # Remove negative values
    for col in ["earnings_per_day", "hours_worked", "jobs_completed", "rating"]:
        df = df[df[col] >= 0]

    # Fix rating > 5 (invalid)
    df["rating"] = df["rating"].clip(upper=5)

    df.reset_index(drop=True, inplace=True)

    print("Cleaned Rows:", len(df))

    return df


# -----------------------------
# STEP 3: EDA (GRAPHS)
# -----------------------------
def generate_graphs(df):
    os.makedirs("outputs/graphs", exist_ok=True)

    # 1. Earnings Distribution
    plt.figure()
    sns.histplot(df["earnings_per_day"], bins=20)
    plt.title("Earnings Distribution")
    plt.savefig("outputs/graphs/earnings_distribution.png")

    # 2. Platform vs Earnings
    plt.figure()
    sns.boxplot(x="platform", y="earnings_per_day", data=df)
    plt.title("Platform vs Earnings")
    plt.savefig("outputs/graphs/platform_earnings.png")

    # 3. Hours vs Earnings
    plt.figure()
    sns.scatterplot(x="hours_worked", y="earnings_per_day", data=df)
    plt.title("Hours Worked vs Earnings")
    plt.savefig("outputs/graphs/hours_vs_earnings.png")

    # 4. Jobs Completed vs Earnings
    plt.figure()
    sns.scatterplot(x="jobs_completed", y="earnings_per_day", data=df)
    plt.title("Jobs Completed vs Earnings")
    plt.savefig("outputs/graphs/jobs_vs_earnings.png")

    # 5. Average Earnings per Platform
    plt.figure()
    df.groupby("platform")["earnings_per_day"].mean().plot(kind="bar")
    plt.title("Avg Earnings per Platform")
    plt.savefig("outputs/graphs/avg_earnings_platform.png")

    print("Graphs saved in outputs/graphs/")


# -----------------------------
# MAIN FUNCTION
# -----------------------------
def main():
    file_path = "data.csv"   # <-- put your dataset here

    df = clean_data(file_path)

    # Save cleaned data
    os.makedirs("outputs", exist_ok=True)
    df.to_csv("outputs/cleaned_data.csv", index=False)

    # Generate graphs
    generate_graphs(df)

    print("✅ Cleaning & EDA Completed!")


if __name__ == "__main__":
    main()