# run_log_analysis.py

from convert_logs_excel import export_error_codes_from_excel
from section_A import process_log_file
from section_B import perform_checks, compute_hourly_averages, process_data_in_chunks
from section_B_3 import RealTimeHourlyAggregator
"""
# Section_A
excel_file = "logs.txt.xlsx"
txt_file = "logs.txt"
export_error_codes_from_excel(excel_file, txt_file)
# Defining the parameters
filename = "logs.txt"  # The path to the log file
n = 9  # The number of most frequent error codes to retrieve
chunk_size = 100000  # The number of lines per chunk (can be adjusted based on file size)

# Calling the function to process the log file
top_errors = process_log_file(filename, n, chunk_size)

# Displaying the results
print(f"The top {n} most frequent error codes are:")
for error, count in top_errors:
    print(f"Error Code: {error}, Count: {count}")
"""
'''
# Section_B__1_a
if __name__ == "__main__":
    perform_checks('time_series.xlsx')


# Section_B__1_b
if __name__ == "__main__":
    compute_hourly_averages('time_series.xlsx')

# Section_B__2
if __name__ == "__main__":
    file_path = 'time_series.xlsx'
    result = process_data_in_chunks(file_path)
    print(result.head())
'''
# Section_B__3
# Example simulation of streaming input
if __name__ == "__main__":
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


