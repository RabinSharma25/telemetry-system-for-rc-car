/*

  Mpu6050 Connections
  VCC -- 5v
  Gnd -- Gnd
  SCL -- A5
  SDA -- A4

*/

#include <Wire.h>
#include <MadgwickAHRS.h>


Madgwick filter;
int16_t GyroX, GyroY, GyroZ, AccX, AccY, AccZ, Temp;
float GForceX, GForceY, GForceZ, RotX, RotY, RotZ;
float roll, pitch, yaw;


void setup()
{
    Serial.begin(9600);
    Wire.begin();
    delay(1000);

    SetUpMpu6050(); // This function is meant for setting up the mpu6050 according to our requirements
}

void loop()
{

    RecordMpuData(); // This function is meant to get the latest measurements from the mpu6050
    PrintData();
}

void SetUpMpu6050()
{
    // Power Management of MPU6050 configuration
    Wire.beginTransmission(0x68);
    Wire.write(0x6B);       // This register helps in configuring the power management of MPU6050
    Wire.write(0b00000000); // setting the power management register to 0 to make sure it is not in sleep mode.
    Wire.endTransmission();

    // gyro configuration
    Wire.beginTransmission(0x68);
    Wire.write(0x1B);       // This register helps in configuring the gyro full scale range.
    Wire.write(0b00000000); // setting the gyro full scale to +/-250 deg/sec
    Wire.endTransmission();

    // accelerometer configurations
    Wire.beginTransmission(0x68);
    Wire.write(0x1C);       // This register helps in configuring the accelerometer full scale range
    Wire.write(0b00000000); // setting the accel to +/-2g;
    Wire.endTransmission();
}

void RecordMpuData()
{
    // Fetching the latest gyro,temp and accel measurement
    Wire.beginTransmission(0x68);
    Wire.write(0x3B); // starting register
    Wire.endTransmission();
    Wire.requestFrom(0x68, 14); // requesting all 28 bytes from the MPU6050
    while (Wire.available() < 14)
        ;
    AccX = Wire.read() << 8 | Wire.read();
    AccY = Wire.read() << 8 | Wire.read();
    AccZ = Wire.read() << 8 | Wire.read();
    Temp = Wire.read() << 8 | Wire.read();
    GyroX = Wire.read() << 8 | Wire.read();
    GyroY = Wire.read() << 8 | Wire.read();
    GyroZ = Wire.read() << 8 | Wire.read();
    ProcessAccData();
    ProcessGryroData();
    ProcessTempData();
}

void ProcessAccData()
{
    /*
      Full Scale Range      LSB Sensitivity
      ±2g                   16384 LSB/g
      ±4g                   8192 LSB/g
      ±8g                   4096 LSB/g
      ±16g                  2048 LSB/g
    */

    // Dividing by 16384 since our full scale range is set to +/- 2g
    GForceX = (float)AccX / 16384.0;
    GForceY = (float)AccY / 16384.0;
    GForceZ = (float)AccZ / 16384.0;
}

void ProcessGryroData()
{
    /*
      Full Scale Range     LSB Sensitivity
      ± 250 °/s             131 LSB/°/s
      ± 500 °/s             65.5 LSB/°/s
      ± 1000 °/s            32.8 LSB/°/s
      ± 2000 °/s            16.4 LSB/°/s
    */

    // Dividing by 131 since our full scale range is set to +/-250 deg/sec
    RotX = (float)GyroX / 131.0;
    RotY = (float)GyroY / 131.0;
    RotZ = (float)GyroZ / 131.0;
}

void ProcessTempData()
{
    // Temperature in degrees C = (TEMP_OUT Register Value as a signed quantity)/340 + 36.53
    Temp = ((float)Temp) / 340 + 36.53;
}


void PrintData()
{
    // This function is meant for debugging purpose
    Serial.print("roll = ");
    Serial.print(roll);
    Serial.print(",");
    Serial.print("pitch = ");
    Serial.print(pitch);
    Serial.print(",");
    Serial.print("yaw = ");
    Serial.println(yaw);
}