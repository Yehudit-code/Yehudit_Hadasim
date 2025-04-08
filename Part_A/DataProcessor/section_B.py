import pandas as pd
from datetime import datetime, timedelta


# Section_B__1_a
def perform_checks(file_path):
    # Read the CSV file into a DataFrame
    df = pd.read_excel(file_path)

    # Convert the 'timestamp' column to datetime format
    # 'errors='coerce'' will turn invalid timestamps into NaT (Not a Time)
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')

    # Check for duplicate timestamps
    # This checks if there are any duplicated rows in the 'timestamp' column
    if df['timestamp'].duplicated().any():
        print("There are duplicate timestamps in the data.")

    # Check for missing values (NaN) in the 'value' column
    # If there are any NaN values, it will notify the user
    if df['value'].isna().any():
        print("There are missing values in the 'value' column.")

    # Check for future timestamps
    # Compare each timestamp to the current time and mark if it's a future date
    current_time = datetime.now()
    df['is_future'] = df['timestamp'] > current_time

    # Filter out the future dates
    future_dates = df[df['is_future']]

    # If there are any future dates, display them
    if not future_dates.empty:
        print("There are future dates in the data:")
        print(future_dates)
    else:
        print("No future dates found.")

    # Display the first 5 rows of the DataFrame to inspect the data
    print(df.head())


# Section_B__1_b
def compute_hourly_averages(file_path):
    """
    This function reads an Excel file containing time-series data,
    processes the data to compute hourly averages, and saves the results
    into a new CSV file.

    Parameters:
    file_path (str): The path to the input Excel file containing the time-series data.
    """

    # Read the Excel file containing the time-series data into a DataFrame
    data = pd.read_excel(file_path)

    # Convert the 'timestamp' column to datetime format, handling any invalid values gracefully
    data['timestamp'] = pd.to_datetime(data['timestamp'], errors='coerce')

    # Drop rows with missing timestamps
    data = data.dropna(subset=['timestamp'])

    # Convert 'value' column to numeric (invalid values become NaN)
    data['value'] = pd.to_numeric(data['value'], errors='coerce')

    # Drop rows with invalid (non-numeric) values
    data = data.dropna(subset=['value'])

    # Create a new column 'hour' which represents the rounded hour for each timestamp
    # For example, if the timestamp is '2025-06-10 06:15:00', the 'hour' column will be '2025-06-10 06:00:00'
    data['hour'] = data['timestamp'].dt.floor('H')  # Use 'floor' to round the timestamp down to the nearest hour

    # Group the data by the 'hour' column and calculate the mean value for each hour
    hourly_averages = data.groupby('hour')['value'].mean().reset_index()

    hourly_averages.rename(columns={'hour': 'timestamp', 'value': 'average_value'}, inplace=True)

    # Display the hourly averages for inspection
    print(hourly_averages)

    # Save the resulting DataFrame of hourly averages to an Excel file
    hourly_averages.to_excel('hourly_averages.xlsx', index=False, engine='openpyxl')


# Section_B__2
# Function to read the time series data from a CSV file
def read_time_series(file_path):
    # Reading the Excel file instead of CSV
    data = pd.read_excel(file_path, parse_dates=['timestamp'])

    # Ensuring the timestamp is in datetime format
    data['timestamp'] = pd.to_datetime(data['timestamp'], errors='coerce')

    return data


# Function to calculate hourly averages for a given day
def calculate_hourly_averages(data):
    # Set the timestamp as index
    data.set_index('timestamp', inplace=True)
    # Resampling data by hour, calculating the mean for each hour
    hourly_averages = data.resample('H').mean()
    return hourly_averages


# Function to split the data by day and calculate hourly averages for each day
def process_data_in_chunks(file_path):
    # Read the complete dataset
    data = read_time_series(file_path)
    # Split the data into days
    daily_groups = data.groupby(data['timestamp'].dt.date)

    # List to store the hourly averages for all days
    hourly_results = []

    # Iterate over each group (day)
    for date, daily_data in daily_groups:
        hourly_avg = calculate_hourly_averages(daily_data)
        # Add a column with the date for easier reference
        hourly_avg['date'] = date
        # Append the result to the list
        hourly_results.append(hourly_avg)

    # Concatenate all results into a single DataFrame
    final_results = pd.concat(hourly_results)
    # Resetting the index for better formatting
    final_results.reset_index(inplace=True)

    # Reorganize columns for clarity
    final_results = final_results[['date', 'timestamp', 'value']]
    # Saving the final results to a CSV file
    final_results.to_excel('hourly_averages.xlsx', index=False)
    return final_results
