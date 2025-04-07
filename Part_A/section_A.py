import pandas as pd
import os
from collections import Counter
import heapq

def convert_excel_to_txt(excel_path, txt_path):
    df = pd.read_excel(excel_path)

    # גישה לעמודת השגיאות
    if df.shape[1] == 1:
        error_column = df.columns[0]
    else:
        for col in df.columns:
            if 'error' in col.lower():
                error_column = col
                break
        else:
            raise ValueError("לא נמצאה עמודת קוד שגיאה מתאימה.")

    df[error_column].dropna().astype(str).to_csv(txt_path, index=False, header=False)
    print(f"הקובץ נשמר כטקסט פשוט ב: {txt_path}")

def split_log_file(filename, linesPerFile, output_dir="errorsFiles"):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    files_num = 0
    with open(filename, 'r') as file:
        while True:
            lines = []
            for _ in range(linesPerFile):
                line = file.readline()
                if not line:
                    break
                lines.append(line.strip())

            if not lines:
                break


            chunk_filename = os.path.join(output_dir, f"chunk_{chunk_num}.txt")
            with open(chunk_filename, 'w') as chunk_file:
                chunk_file.write('\n'.join(lines))

            files_num += 1

        return files_num


def count_errors_in_chunk(chunk_path):
   # סופר את שכיחות קודי השגיאה בקובץ חלקי.
    counter = Counter()
    with open(chunk_path, 'r') as file:
        for line in file:
            error_code = line.strip()
            if error_code:
                counter[error_code] += 1
    return counter


excel_file = "logs.txt.xlsx"
txt_file = "logs.txt"
convert_excel_to_txt(excel_file, txt_file)
