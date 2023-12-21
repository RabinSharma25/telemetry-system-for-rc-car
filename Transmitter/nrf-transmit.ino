/*

  Mpu6050 Connections
  VCC -- 5v
  Gnd -- Gnd
  SCL -- A5
  SDA -- A4

  Nrf24l01 Connections
  VCC -- 3.3V ( from a external voltage regulator )
  GND -- GND
  CE  -- D9
  CSN -- D10
  SCK -- D13
  MOSI-- D11
  MISO-- D12

  Neo-6M-GPS Connections
  VCC -- 3.3V
  GND -- GND
  TX  -- D7
  RX  -- D6

*/

#include <Wire.h>
#include <MadgwickAHRS.h>
#include <SPI.h>
#include "RF24.h"
#include <TinyGPS++.h>
#include <SoftwareSerial.h>

Madgwick filter;

const int speedSensor1Pin = 2;  // Replace with the pin number you want to monitor
const int speedSensor2Pin = 3;  // Replace with the pin number you want to monitor
unsigned long lastResetTime = 0;
const unsigned long resetInterval = 3000;
int state1 = LOW;  // Start with the pin in a known state
int count1 = 0;
int prevState1 = LOW;
int state2 = LOW;  // Start with the pin in a known state
int count2 = 0;


int16_t GyroX, GyroY, GyroZ, AccX, AccY, AccZ, Temp;
float GForceX, GForceY, GForceZ, RotX, RotY, RotZ;
float roll, pitch, yaw;
int count = 0;

RF24 myRadio(9, 10);
byte addresses[][6] = {"0"};

struct package
{
    float roll = 0;
    float pitch = 0;
    float yaw = 0;
    float longi = 0;
    float lati = 0;
    int charge_bat = 45;
    int charge_mod = 3389;
    float temperature = 7899;
    float velocity = 0;
};

typedef struct package Package;
Package data;

int RXPin = 7;
int TXPin = 6;

TinyGPSPlus gps;
SoftwareSerial SerialGPS(RXPin, TXPin);

void setup()
{
    Serial.begin(9600);
    SerialGPS.begin(9600);
   pinMode(speedSensor1Pin, INPUT);
   pinMode(speedSensor2Pin, INPUT);
    Wire.begin();
    delay(1000);
    myRadio.begin();
    myRadio.setChannel(115);
    myRadio.setPALevel(RF24_PA_MIN);
    myRadio.setDataRate(RF24_250KBPS);
    myRadio.openWritingPipe(addresses[0]);

    SetUpMpu6050(); // This function is meant for setting up the mpu6050 according to our requirements
    filter.begin(25);
}

void loop()
{
  int currentState1 = digitalRead(speedSensor1Pin);
  if(currentState1 != prevState1){
    count1++;
  }
  
    //  Serial.println("I am at the begining");
    RecordMpuData(); // This function is meant to get the latest measurements from the mpu6050
    // update the filter, which computes orientation
    filter.updateIMU(RotX, RotY, RotZ, GForceX, GForceY, GForceZ);
    // print the heading, pitch and roll
    data.roll = filter.getRoll();
    data.pitch = filter.getPitch();
    data.yaw = filter.getYaw();

    // Serial.println("I am here ");
    while (SerialGPS.available() > 0)
    {
        if (gps.encode(SerialGPS.read()))
        {

            if (gps.location.isValid())
            {
                data.lati = gps.location.lat();
                data.longi = gps.location.lng();
            }
            else
            {
                //        Serial.println("Location is not available");
            }
        }
    }

    myRadio.write(&data, sizeof(data));
    //   PrintData();

  if(millis() - lastResetTime >= resetInterval){
    data.velocity = count1/2.0;
    count1 = 0;
    lastResetTime = millis();
  }
   prevState1 = currentState1;
   
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
    Serial.print(data.roll);
    Serial.print(",");
    Serial.print(data.pitch);
    Serial.print(",");
    Serial.print(data.yaw);
    Serial.print(",");
    Serial.print(data.longi);
    Serial.print(",");
    Serial.print(data.lati);
    Serial.print(",");
    Serial.print(data.charge_bat);
    Serial.print(",");
    Serial.print(data.charge_mod);
    Serial.print(",");
    Serial.print(data.temperature);
    Serial.print(",");
    Serial.println(data.velocity);
}
