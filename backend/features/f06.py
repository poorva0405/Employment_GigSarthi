import pandas as pd
import json
import os
import matplotlib.pyplot as plt
import seaborn as sns

def run_feature():
    try:
        # ---------------- FIXED PATH (ABSOLUTE) ----------------
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        file_path = os.path.join(BASE_DIR, "outputs", "cleaned_data.csv")

        if not os.path.exists(file_path):
            raise FileNotFoundError("cleaned_data.csv not found. Run f01 first.")

        df = pd.read_csv(file_path)

        if df.empty:
            raise ValueError("Dataset is empty.")

        # ---------------- FEATURE ENGINEERING ----------------

        # Avoid division by zero
        df["hours_worked"] = df["hours_worked"].replace(0, 1)

        # Efficiency Score
        df["efficiency_score"] = df["earnings_per_day"] / df["hours_worked"]

        # Workload Ratio
        df["workload_ratio"] = df["jobs_completed"] / df["hours_worked"]

        # Income Variance per worker
        if "worker_id" in df.columns:
            df["income_variance"] = df.groupby("worker_id")["earnings_per_day"].transform("var")
        else:
            df["income_variance"] = 0

        # Clean infinities and NaN
        df.replace([float("inf"), -float("inf")], 0, inplace=True)
        df.fillna(0, inplace=True)

        # ---------------- SAVE ENGINEERED DATA ----------------
        output_dir = os.path.join(BASE_DIR, "outputs")
        os.makedirs(output_dir, exist_ok=True)

        df.to_csv(os.path.join(output_dir, "engineered_data.csv"), index=False)

        image_paths = []

        # ---------------- VISUALIZATIONS ----------------

        # 1. Income Distribution
        plt.figure()
        sns.histplot(df["earnings_per_day"], bins=20, kde=True)
        plt.title("Income Distribution")
        path1 = os.path.join(output_dir, "income_distribution_f06.png")
        plt.savefig(path1)
        plt.close()
        image_paths.append("outputs/income_distribution_f06.png")

        # 2. Workload vs Income
        plt.figure()
        plt.scatter(df["hours_worked"], df["earnings_per_day"])
        plt.xlabel("Hours Worked")
        plt.ylabel("Earnings")
        plt.title("Workload vs Income")
        path2 = os.path.join(output_dir, "workload_vs_income.png")
        plt.savefig(path2)
        plt.close()
        image_paths.append("outputs/workload_vs_income.png")

        # 3. Platform Efficiency
        if "platform" in df.columns:
            plt.figure()
            df.groupby("platform")["efficiency_score"].mean().plot(kind="bar")
            plt.title("Platform Efficiency Comparison")
            path3 = os.path.join(output_dir, "platform_efficiency.png")
            plt.savefig(path3)
            plt.close()
            image_paths.append("outputs/platform_efficiency.png")

        # 4. Correlation Heatmap
        plt.figure()
        numeric_df = df.select_dtypes(include=["number"])
        sns.heatmap(numeric_df.corr(), annot=True, cmap="coolwarm")
        plt.title("Correlation Heatmap")
        path4 = os.path.join(output_dir, "correlation_heatmap.png")
        plt.savefig(path4)
        plt.close()
        image_paths.append("outputs/correlation_heatmap.png")

        # ---------------- RESULT ----------------

        result = {
            "status": "success",
            "data": {
                "total_records": int(len(df)),
                "new_features": [
                    "efficiency_score",
                    "workload_ratio",
                    "income_variance"
                ],
                "insight": "Efficiency varies across platforms. More hours do not always lead to higher earnings."
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