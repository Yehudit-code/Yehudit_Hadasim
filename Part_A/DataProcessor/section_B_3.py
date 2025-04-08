from datetime import datetime
import pandas as pd


class RealTimeHourlyAggregator:
    """
    This class handles real-time aggregation of time-series data.
    It maintains per-hour statistics to compute average values on-the-fly
    without needing to store all incoming records.
    """

    def __init__(self):
        # Dictionary to keep running totals and counts for each hour
        self._hourly_summary = {}

    def update_with_record(self, raw_timestamp: str, measurement: float):
        """
        Ingests a single timestamped measurement and updates the internal aggregation.

        Parameters:
        raw_timestamp (str): Timestamp string in a valid datetime format.
        measurement (float): Numeric value associated with the timestamp.
        """
        timestamp = pd.to_datetime(raw_timestamp, errors='coerce')
        if pd.isna(timestamp):
            return  # Skip invalid timestamps gracefully

        hour_slot = timestamp.floor('H')  # Normalize to start of the hour

        # Initialize hour slot if not present
        if hour_slot not in self._hourly_summary:
            self._hourly_summary[hour_slot] = {'sum': 0.0, 'count': 0}

        # Update aggregation for the given hour
        self._hourly_summary[hour_slot]['sum'] += measurement
        self._hourly_summary[hour_slot]['count'] += 1

    def get_hourly_averages(self) -> pd.DataFrame:
        """
        Returns a DataFrame with computed hourly averages for all processed records.

        Returns:
        pd.DataFrame: Columns - ['timestamp', 'average_value']
        """
        aggregated_data = []

        for hour, stats in self._hourly_summary.items():
            avg = stats['sum'] / stats['count']
            aggregated_data.append({'timestamp': hour, 'average_value': avg})

        return pd.DataFrame(aggregated_data).sort_values('timestamp')

"""
# Example simulation of streaming input
if __name__ == "__main__":
    # Simulated stream of timestamped measurements
    incoming_data = [
        ("2025-06-10 06:15:00", 15.3),
        ("2025-06-10 06:45:00", 5.3),
        ("2025-06-10 07:10:00", 12.6),
        ("2025-06-10 07:50:00", 3.2),
        ("2025-06-10 06:35:00", 10.3),
    ]

    aggregator = RealTimeHourlyAggregator()

    # Process each record in the simulated stream
    for ts, val in incoming_data:
        aggregator.update_with_record(ts, val)

    # Output the computed hourly averages
    hourly_df = aggregator.get_hourly_averages()
    print(hourly_df)
"""