/**********************************************************************
  Filename    : Alarme_PC
  Description : An alarm sound to securise your own think
  Auther      : Marc-Alexandre Di Marco François
  Modification: 2025/12/21
**********************************************************************/
#define PIN_LED_NO_DETECT 19 // define the green LED
#define PIN_LED_DETECT 8 // define the red LED
#define ALARM 14 // define the active Buzzer
#define trigPin 4 // derfine trigPin
#define echoPin 5 // define EchoPin.
#define PIN_BUTTON 10 // define the switch
#define MAX_DISTANCE 700 // Maximum sensor distance is rated at 400-500cm.

bool alarmTrigger; // define an true false trigger to detect an collision between the sensor and someone
float timeOut = MAX_DISTANCE * 60; 
int soundVelocity = 340; // define sound speed=340m/s
// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin.
  pinMode(PIN_LED_NO_DETECT, OUTPUT);
  pinMode(PIN_LED_DETECT, OUTPUT);
  pinMode(ALARM, OUTPUT);
  pinMode(trigPin,OUTPUT);// set trigPin to output mode
  pinMode(echoPin,INPUT); // set echoPin to input mode
  pinMode(PIN_BUTTON, INPUT);
}

// the loop function runs over and over again forever
void loop() {
  Run(); // execute the main code
  if (digitalRead(PIN_BUTTON) == LOW) {
    Stop(); // stop at anytime the alarm and the red LED
  }
}

void Stop() {
  digitalWrite(PIN_LED_NO_DETECT, HIGH);
  digitalWrite(PIN_LED_DETECT, LOW);
  digitalWrite(ALARM, LOW);
}

void Run() {
  delay(20);
  getSonar(); // get distance in cm  
  if (alarmTrigger) {
    digitalWrite(ALARM, HIGH);
    digitalWrite(PIN_LED_DETECT, HIGH);
    digitalWrite(PIN_LED_NO_DETECT, LOW);
  } else {
    digitalWrite(ALARM, LOW);
    digitalWrite(PIN_LED_DETECT, LOW);
    digitalWrite(PIN_LED_NO_DETECT, HIGH);
  }
}

float getSonar() {
  unsigned long pingTime;
  float distance;
  // make trigPin output high level lasting for 10μs to triger HC_SR04
  digitalWrite(trigPin, HIGH); 
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Wait HC-SR04 returning to the high level and measure out this waitting time
  pingTime = pulseIn(echoPin, HIGH, timeOut); 
  // calculate the distance according to the time
  distance = (float)pingTime * soundVelocity / 2 / 10000; 

  // if the sensor distance between itself and the think he collide his at 80cm or less, someone or something it's there, activate the trigger.
  if (distance <= 80.00) {
    alarmTrigger = true;
  } else if (distance >= 80.00) {
    alarmTrigger = false;
  }

  return distance; // return the distance value
}