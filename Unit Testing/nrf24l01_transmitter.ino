/*

  Nrf24l01 Connections
  VCC -- 3.3V ( from a external voltage regulator )
  GND -- GND
  CE  -- D9
  CSN -- D10
  SCK -- D13
  MOSI-- D11
  MISO-- D12

*/
#include <SPI.h>
#include "RF24.h"

RF24 myRadio(9, 10);
byte addresses[][6] = {"0"};

struct package
{
    float roll = 1.1;
    float pitch = 2.1;
    float yaw = 3.1;
    float longi = 4.1;
    float lati = 5.1;
    float charge_rc = 6.1;
    float charge_mod = 7.1;
    int temperature = 8;
    int velocity = 9;
};

typedef struct package Package;
Package data;
void setup()
{

    myRadio.begin();
    myRadio.setChannel(115);
    myRadio.setPALevel(RF24_PA_MIN);
    myRadio.setDataRate(RF24_250KBPS);
    myRadio.openWritingPipe(addresses[0]);
}

void loop()
{
myRadio.write(&data, sizeof(data));
delay(1000);
}

