def generate_vh_sequence(initial, final, rows, unit):
    result = []
    total_difference = final - initial
    # Dynamically calculate the spacing
    spacing = total_difference / (rows - 1)

    for i in range(1, rows + 1):
        # Apply an offset or small adjustment in spacing for every third row as in your pattern
        if i % 3 == 0:
            value = (
                initial + (i - 1) * spacing * 1.01
            )  # Slight increase in spacing for every third row
        else:
            value = initial + (i - 1) * spacing
        result.append(f"{i}: {round(value, 2)}{unit},")
        # result.append(f"{i}: calc({round(value, 2)} * var(--spacing-mega)),")

    return result


# Test the function with example inputs
initial_number = 54
final_number = 190
number_of_rows = 100
unit = "vh"

vh_sequence = generate_vh_sequence(initial_number, final_number, number_of_rows, unit)
for item in vh_sequence:
    print(item)
