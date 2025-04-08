import os
from collections import Counter


# subSection 1
def split_large_log_file(input_file, lines_per_chunk, output_folder="log_chunks"):
    """
    Splits a large log file into smaller files, each containing a fixed number of lines.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    chunk_index = 0
    with open(input_file, 'r') as log_file:
        while True:
            current_chunk = []
            for _ in range(lines_per_chunk):
                line = log_file.readline()
                if not line:
                    break
                current_chunk.append(line.strip())

            if not current_chunk:
                break

            chunk_path = os.path.join(output_folder, f"log_part_{chunk_index}.txt")
            with open(chunk_path, 'w') as chunk_file:
                chunk_file.write('\n'.join(current_chunk))

            chunk_index += 1

    return chunk_index  # Number of chunk files created


# subSection 2
def count_error_codes_in_file(filepath):
    """
    Counts occurrences of error codes in a given file.
    """
    error_counts = Counter()
    with open(filepath, 'r') as file:
        for line in file:
            code = line.strip()
            if code:
                error_counts[code] += 1
    return error_counts


# subSection 3
def combine_all_counts(counters):
    """
    Merges multiple Counter objects into a single global count.
    """
    merged_counts = Counter()
    for count in counters:
        merged_counts.update(count)
    return merged_counts


# subSection 4
def get_most_frequent_errors(error_counter, top_n):
    """
    Returns the top N most common error codes.
    """
    return error_counter.most_common(top_n)


# main function
def process_log_file(file_path, top_n=10, chunk_size=100000):
    """
    Main function: splits the file, counts error occurrences, merges them,
    and returns the most frequent error codes.
    """
    print("Splitting log file into smaller chunks...")
    total_chunks = split_large_log_file(file_path, chunk_size)

    print(f"{total_chunks} chunks created. Counting errors...")
    all_counters = []
    for i in range(total_chunks):
        path = f"log_chunks/log_part_{i}.txt"
        chunk_counter = count_error_codes_in_file(path)
        all_counters.append(chunk_counter)

    print("Combining results from all chunks...")
    final_counts = combine_all_counts(all_counters)
    print("All error counts:", final_counts)

    print(f"Top {top_n} most frequent error codes:")
    return get_most_frequent_errors(final_counts, top_n)


excel_file = "logs.txt.xlsx"
txt_file = "logs.txt"
# export_error_codes_from_excel(excel_file, txt_file)

