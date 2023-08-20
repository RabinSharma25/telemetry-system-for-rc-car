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
    float roll = -24.29;      // roll
    float pitch = -12.63;     // pitch
    float yaw = 180.87;       // yaw
    float longi = 88.2990721; // longitude
    float lati = 27.1483325;  // latitude
    int charge_bat = 45;      // Battery charge of the system where the telemetry is attached
    int charge_mod = 33;      // Battery charge of the telemetry module
    float temperature = 70;   // temperature
    int velocity = 80;        // velocity of the remote object where the telemetry is attached
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
    myRadio.openWritingPipe(addresses[0]);
}

void loop()
{
    myRadio.write(&data, sizeof(data));
}