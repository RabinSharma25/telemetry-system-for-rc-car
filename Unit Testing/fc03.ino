/*
  fc-03 Connections
  VCC -- 5v
  GND -- GND
  D0  -- 2 // for first sensor
  D0  -- 3 // for second sensor
*/

const int speedSensor1Pin = 2; // Replace with the pin number you want to monitor
const int speedSensor2Pin = 3; // Replace with the pin number you want to monitor
volatile unsigned int count1 = 0;
volatile unsigned int count2 = 0;

unsigned long previousMillis = 0;
const long interval = 2000; // Interval for printing pulses in milliseconds

int count = 0;

void setup()
{
    Serial.begin(9600);
    pinMode(speedSensor1Pin, INPUT);
    pinMode(speedSensor2Pin, INPUT);

    attachInterrupt(digitalPinToInterrupt(speedSensor1Pin), countRotations1, FALLING);
    attachInterrupt(digitalPinToInterrupt(speedSensor2Pin), countRotations2, FALLING);
}

void loop()
{

    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= interval)
    {
        previousMillis = currentMillis;
        if (count1 >= count2)
        {
            count = count1;
        }
        else
        {
            count = count2;
        }
        count2 = 0;
        count1 = 0;
    }
    PrintData();
}

void PrintData()
{

    Serial.print("The number of rotations per 2 sec: ");
    Serial.println(count);
}

void countRotations1()
{
    count1++;
}

void countRotations2()
{
    count2++;
}