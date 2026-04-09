import pandas as pd
<<<<<<< HEAD
import json
import os
import matplotlib.pyplot as plt

def run_feature():
    try:
        # LOAD DATA
        file_path = "backend/outputs/cleaned_data.csv"
        df = pd.read_csv(file_path)

        # SAFETY CLEANING AGAIN
        df = df.drop_duplicates()
        df = df.dropna()

        # ENSURE NUMERIC
        numeric_cols = ["earnings_per_day", "hours_worked", "jobs_completed", "rating"]
        for col in numeric_cols:
            df[col] = pd.to_numeric(df[col], errors="coerce")

        df = df.dropna()

        os.makedirs("backend/outputs", exist_ok=True)

        image_paths = []

        # ---------------- GRAPH 1: Income Distribution ----------------
        plt.figure()
        df["earnings_per_day"].plot(kind="hist", bins=20)
        plt.title("Income Distribution")
        plt.xlabel("Earnings")
        plt.ylabel("Frequency")
        path1 = "backend/outputs/income_distribution.png"
        plt.savefig(path1)
        plt.close()
        image_paths.append("outputs/income_distribution.png")

        # ---------------- GRAPH 2: Hours vs Earnings ----------------
        plt.figure()
        plt.scatter(df["hours_worked"], df["earnings_per_day"])
        plt.title("Hours vs Earnings")
        plt.xlabel("Hours Worked")
        plt.ylabel("Earnings")
        path2 = "backend/outputs/hours_vs_earnings.png"
        plt.savefig(path2)
        plt.close()
        image_paths.append("outputs/hours_vs_earnings.png")

        # ---------------- GRAPH 3: Platform-wise Income ----------------
        plt.figure()
        df.groupby("platform")["earnings_per_day"].mean().plot(kind="bar")
        plt.title("Avg Income by Platform")
        plt.xlabel("Platform")
        plt.ylabel("Avg Earnings")
        path3 = "backend/outputs/platform_income.png"
        plt.savefig(path3)
        plt.close()
        image_paths.append("outputs/platform_income.png")

        # ---------------- GRAPH 4: Jobs Completed Distribution ----------------
        plt.figure()
        df["jobs_completed"].plot(kind="hist", bins=20)
        plt.title("Jobs Completed Distribution")
        plt.xlabel("Jobs")
        plt.ylabel("Frequency")
        path4 = "backend/outputs/jobs_distribution.png"
        plt.savefig(path4)
        plt.close()
        image_paths.append("outputs/jobs_distribution.png")

        # ---------------- RESULT ----------------
        result = {
            "status": "success",
            "data": {
                "total_records": int(len(df)),
                "columns": df.columns.tolist(),
                "insight": "EDA completed: income distribution, workload patterns, and platform comparison generated."
            },
            "images": image_paths
        }

    except Exception as e:
        result = {
            "status": "error",
            "message": str(e)
        }

    print(json.dumps(result))


if __name__ == "__main__":
    run_feature()
=======
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
>>>>>>> 20006feba768ad53153b455e738fbf6a90b9d941
