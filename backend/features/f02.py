import pandas as pd
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