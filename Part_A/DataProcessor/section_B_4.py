import pandas as pd
import os


def read_time_series(file_path):
    """
    Reads time-series data from a file. Supports Excel (.xlsx) and Parquet (.parquet) formats.

    Parameters:
    file_path (str): Path to the input file.

    Returns:
    pd.DataFrame: A DataFrame with at least two columns: 'timestamp' and 'value'.
    """
    ext = os.path.splitext(file_path)[-1].lower()

    if ext == '.xlsx':
        df = pd.read_excel(file_path)
    elif ext == '.parquet':
        df = pd.read_parquet(file_path)
    else:
        raise ValueError("Unsupported file format. Supported formats: .xlsx, .parquet")

    return df


def compute_hourly_averages(df):
    """
    Computes hourly averages from a DataFrame with 'timestamp' and 'value' columns.

    Parameters:
    df (pd.DataFrame): DataFrame containing time-series data.

    Returns:
    pd.DataFrame: Aggregated DataFrame with hourly averages.
    """
    # Ensure the 'timestamp' column is datetime
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')

    # Drop rows with invalid timestamps or missing values
    df = df.dropna(subset=['timestamp', 'value'])

    # Create 'hour' column rounded down to the hour
    df['hour'] = df['timestamp'].dt.floor('H')

    # Group by 'hour' and compute the mean of 'value'
    hourly_avg = df.groupby('hour')['value'].mean().reset_index()
    hourly_avg.columns = ['timestamp', 'average_value']

    return hourly_avg


def export_to_csv(df, output_path):
    """
    Saves a DataFrame to a CSV file.

    Parameters:
    df (pd.DataFrame): The DataFrame to save.
    output_path (str): Destination path for the CSV file.
    """
    df.to_csv(output_path, index=False)
    print(f"Output saved to: {output_path}")


# --------- Example Usage ----------

if __name__ == "__main__":
    input_file = 'time_series.parquet'  # Change to 'time_series.xlsx' if needed
    output_file = 'hourly_averages.csv'

    try:
        raw_df = read_time_series(input_file)
        hourly_df = compute_hourly_averages(raw_df)
        export_to_csv(hourly_df, output_file)
    except Exception as e:
        print("Error during processing:", e)
