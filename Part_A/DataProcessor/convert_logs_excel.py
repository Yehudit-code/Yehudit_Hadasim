import pandas as pd


def export_error_codes_from_excel(excel_file, output_txt_file):
    """
    Converts an Excel file to a plain text file where each line contains a single error code.
    """
    df = pd.read_excel(excel_file)

    # Assume there's only one column containing error codes (or try to detect it automatically)
    if df.shape[1] == 1:
        error_col = df.columns[0]
    else:
        # Attempt to guess the column name based on a typical keyword
        error_col = None
        for column in df.columns:
            if 'error' in column.lower():
                error_col = column
                break

        if error_col is None:
            raise ValueError("Could not detect a valid error code column.")

    # Clean and export to plain text
    df[error_col].dropna().astype(str).to_csv(output_txt_file, index=False, header=False)
    print(f"Text file with error codes saved to: {output_txt_file}")
