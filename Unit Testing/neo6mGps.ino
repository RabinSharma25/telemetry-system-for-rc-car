/*

  Neo-6M-GPS Connections
  VCC -- 5V
  GND -- GND
  TX  -- D7
  RX  -- D6

*/

#include <TinyGPS++.h>
#include <SoftwareSerial.h>

int RXPin = 7;
int TXPin = 6;
float lati = 0.0;
float longi = 0.0;

TinyGPSPlus gps;
SoftwareSerial SerialGPS(RXPin, TXPin);

void setup()
{
    Serial.begin(9600);
    SerialGPS.begin(9600);
}

void loop()
{

    while (SerialGPS.available() > 0)
    {
        if (gps.encode(SerialGPS.read()))
        {

            if (gps.location.isValid())
            {
                lati = gps.location.lat();
                longi = gps.location.lng();
            }
            else
            {
                //        Serial.println("Location is not available");
            }
        }
    }

    PrintData();
}


void PrintData()
{
    Serial.print("longitude = ");
    Serial.print(longi);
    Serial.print(", ");
    Serial.print("latitude = ");
    Serial.println(lati);

}
