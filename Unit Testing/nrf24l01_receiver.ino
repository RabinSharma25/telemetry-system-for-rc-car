/*
Connections:
VCC - 3.3V
GND - GND
CE  - 9
CSN - 10
SCK - 13
MOSI- 11
MISO- 12
*/          

#include <SPI.h>
#include "RF24.h"

RF24 myRadio(9, 10);
byte addresses[][6] = {"0"};

struct package
{
    float roll = 0;
    float pitch = 0;
    float yaw = 0;
    float longi = 0;
    float lati = 0;
    float charge_rc = 0;
    float charge_mod = 0;
    int temperature = 0;
    int velocity = 0;
};

typedef struct package Package;
Package data;

void setup()
{
    Serial.begin(9600);
    delay(1000);
    myRadio.begin();
    myRadio.setChannel(115);
    myRadio.setPALevel(RF24_PA_MAX);
    myRadio.setDataRate(RF24_250KBPS);

    myRadio.openReadingPipe(1, addresses[0]);
    myRadio.startListening();
}

void loop()
{
//   Serial.println(sizeof(data));
    if (myRadio.available())
    {
        while (myRadio.available())
        {
            myRadio.read(&data, sizeof(data));
        }
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
        Serial.print(data.charge_rc);
        Serial.print(",");
        Serial.print(data.charge_mod);
        Serial.print(",");
        Serial.print(data.temperature);
        Serial.print(",");
        Serial.println(data.velocity);
    }
}