#include <SoftwareSerial.h>
#include <OneWire.h>

//PIN NUMBERS
//CHANGE TO ACTUAL PINS IN FINAL VERSION
int BLUETOOTH_RX_PIN = 10;
int BLUETOOTH_TX_PIN = 11;


int POMP_PIN = 9;
int VERWARMINGSELEMENT1_PIN = 6;
int VERWARMINGSELEMENT2_PIN = 7;
int VERWARMINGSELEMENT3_PIN = 8;
int THERMOMETER_PIN = 5;

int ON = 1;
int OFF = 0;

float temp = 0;

const byte numChars = 32;
char receivedChars[numChars];

boolean newData = false;

OneWire ds(THERMOMETER_PIN);
SoftwareSerial bluetoothSerial(BLUETOOTH_RX_PIN, BLUETOOTH_TX_PIN);

void setup() {
  // read serial:
  Serial.begin(9600);
  bluetoothSerial.begin(9600);
  
  //setup output pins
  pinMode(VERWARMINGSELEMENT1_PIN,OUTPUT);
  pinMode(VERWARMINGSELEMENT2_PIN,OUTPUT);
  pinMode(VERWARMINGSELEMENT3_PIN,OUTPUT);
  pinMode(POMP_PIN,OUTPUT);

  //setup input pins
  pinMode(THERMOMETER_PIN,INPUT);

}

void loop() {
  temp = getTemp();
  String json = createJson();

  Serial.println(json);
  bluetoothSerial.println(json);
  
  delay(3000);
  recvWithStartEndMarkers();
  handleDataInput();
}

String createJson(){
  String json = "{\"temp\":" + temp + ",";
  json+= "\"heat1\":" + digitalRead(VERWARMINGSELEMENT1_PIN) + ",";
  json+= "\"heat2\":" + digitalRead(VERWARMINGSELEMENT2_PIN) + ",";
  json+= "\"heat3\":" + digitalRead(VERWARMINGSELEMENT3_PIN) + ",";
  json+= "\"pomp\":" + digitalRead(POMP_PIN) + "}";
  return json;
}

void handleDataInput() {
 if (newData == true) {
   String data = String(receivedChars);

   if (data.startsWith("PMPON")) {
      digitalWrite(POMP_PIN,ON);
      Serial.println(data);
   } else if (data.startsWith("PMPOFF")) {
      digitalWrite(POMP_PIN,OFF);
      Serial.println(data);
   } else if (data.startsWith("HEAT0")) {
      digitalWrite(VERWARMINGSELEMENT1_PIN,OFF);
      digitalWrite(VERWARMINGSELEMENT2_PIN,OFF);
      digitalWrite(VERWARMINGSELEMENT3_PIN,OFF);
      Serial.println(data);
   } else if (data.startsWith("HEAT1")) {
      digitalWrite(VERWARMINGSELEMENT1_PIN,ON);
      digitalWrite(VERWARMINGSELEMENT2_PIN,OFF);
      digitalWrite(VERWARMINGSELEMENT3_PIN,OFF);
      Serial.println(data);
   } else if (data.startsWith("HEAT2")) {
      digitalWrite(VERWARMINGSELEMENT1_PIN,ON);
      digitalWrite(VERWARMINGSELEMENT2_PIN,ON);
      digitalWrite(VERWARMINGSELEMENT3_PIN,OFF);
      Serial.println(data);
   } else if (data.startsWith("HEAT3")) {
      digitalWrite(VERWARMINGSELEMENT1_PIN,ON);
      digitalWrite(VERWARMINGSELEMENT2_PIN,ON);
      digitalWrite(VERWARMINGSELEMENT3_PIN,ON);
      Serial.println(data);
   }
   
   newData = false;
 }
}

float getTemp(){
  //returns the temperature from one DS18S20 in DEG Celsius

  byte data[12];
  byte addr[8];

  if ( !ds.search(addr)) {
      //no more sensors on chain, reset search
      ds.reset_search();
      return -1000;
  }

  if ( OneWire::crc8( addr, 7) != addr[7]) {
      Serial.println("CRC is not valid!");
      return -1000;
  }

  if ( addr[0] != 0x10 && addr[0] != 0x28) {
      Serial.print("Device is not recognized");
      return -1000;
  }

  ds.reset();
  ds.select(addr);
  ds.write(0x44,1); // start conversion, with parasite power on at the end

  byte present = ds.reset();
  ds.select(addr);    
  ds.write(0xBE); // Read Scratchpad

  
  for (int i = 0; i < 9; i++) { // we need 9 bytes
    data[i] = ds.read();
  }
  
  ds.reset_search();
  
  byte MSB = data[1];
  byte LSB = data[0];

  float tempRead = ((MSB << 8) | LSB); //using two's compliment
  float TemperatureSum = tempRead / 16;
  
  return TemperatureSum;
  
}

void recvWithStartEndMarkers() {
    static boolean recvInProgress = false;
    static byte ndx = 0;
    char startMarker = '<';
    char endMarker = '>';
    char rc;
 
    while (bluetoothSerial.available() > 0 && newData == false) {
        rc = bluetoothSerial.read();

        if (recvInProgress == true) {
            if (rc != endMarker) {
                receivedChars[ndx] = rc;
                ndx++;
                if (ndx >= numChars) {
                    ndx = numChars - 1;
                }
            } else {
                receivedChars[ndx] = '\0'; // terminate the string
                recvInProgress = false;
                ndx = 0;
                newData = true;
            }
        } else if (rc == startMarker) {
            recvInProgress = true;
        }
    }
}


