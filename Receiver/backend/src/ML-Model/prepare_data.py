import pandas as pd

rollMax = 180.0
rollMin = -180.0
pitchMax = 90.0
pitchMin = -90.0
yawMax = 360.0
yawMin = 0
longiMax = 180
longiMin = -180
latiMax = 90
latiMin = -90
ChargeMax = 8.4
ChargeMin = 0
tempMax = 100
tempMin = 0
velocityMax = 4  # in m/s
velocityMin = 0

# Read the CSV file into a DataFrame
df = pd.read_csv('./Receiver/backend/src/ML-Model/dataSet.csv', header=None)

# Set column names
column_names = ['roll', 'pitch', 'yaw', 'longi', 'lati', 'chargeRC', 'chargeTele', 'temp', 'velocity']
df.columns = column_names

# Define a function to check the condition and return 0 or 1 based on specific columns
def apply_condition(row):
    # Replace this condition with your own logic based on specific columns
    if ((row['roll'] >= rollMin and row['roll'] <= rollMax) and 
        (row['pitch'] >= pitchMin and row['pitch'] <= pitchMax) and 
        (row['yaw'] >= yawMin and row['yaw'] <= yawMax) and 
        (row['longi'] >= longiMin and row['longi'] <= longiMax) and 
        (row['lati'] >= latiMin and row['lati'] <= latiMax) and 
        (row['chargeRC'] >= ChargeMin and row['chargeRC'] <= ChargeMax) and 
        (row['chargeTele'] >= ChargeMin and row['chargeTele'] <= ChargeMax) and 
        (row['temp'] >= tempMin and row['temp'] <= tempMax) and 
        (row['velocity'] >= velocityMin and row['velocity'] <= velocityMax)):
        return 1
    else:
        return 0

# Apply the function to create a new column 'result'
df['result'] = df.apply(apply_condition, axis=1)

# Shuffle the DataFrame using sample
df = df.sample(frac=1, random_state=42)  # # Set a specific random seed for reproducibility
# Save the DataFrame to 'result.csv'

df.to_csv('./Receiver/backend/src/ML-Model/result.csv', index=False)

# Print the DataFrame with the new column and updated column names
print(df)

# Find the maximum and minimum values for each column
max_values = df.max()
min_values = df.min()

print("\nMaximum values for each column:")
print(max_values)

print("\nMinimum values for each column:")
print(min_values)
