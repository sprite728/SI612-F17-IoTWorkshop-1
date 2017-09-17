// BuildTime 4

int LED = D0;
int sensorPin = A0;

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
  pinMode(sensorPin, INPUT);
}

void loop() {
  int reading = analogRead(sensorPin);
  Serial.println(reading);

  // Only read out the data every 0.5 second
  // otherwise you will
  // receive hundreds of data coming
  // in to your laptop. 
  delay(500);
}
