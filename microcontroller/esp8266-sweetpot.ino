#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include "DHT.h"

#define DHTTYPE DHT11



// WIFI SETTINGS
const char* ssid = "Kotic";
const char* password = "06homize";
// SERVER VARIABLES
// SERVER IP - 192.168.0.107
// SERVER PORT - 5050 
String serverName = "http://192.168.0.107:5050/";

// DHT11 CONFIG
DHT dht11(D4, DHTTYPE);
float humidity, temperature, soilMoisture;
int httpCode;
// CAPACITY SOIL MOISTURE 
const int dry = 700;
const int wet = 400;

void setup() {
  Serial.begin(115200); // Serial connection 
  delay(100);
  // DHT11
  pinMode(D4, INPUT);
  // WATER POMP
  pinMode(D0, OUTPUT);
  dht11.begin();
  digitalWrite(D0, LOW);
  WiFi.begin(ssid, password);                          // WiFi connection
  Serial.println("Start connecting to WiFi...");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED) {               // Wait for the WiFi connectiom completion
    delay(1000);
    Serial.println("...");
  }
}

void loop() { 
  if(WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    soilMoisture = analogRead(A0);
    if(soilMoisture) {
      Serial.print("Soil Moisture: ");
      Serial.println(soilMoisture);
      int soilMoisturePercentage = map(soilMoisture, wet, dry, 100, 0);
      Serial.print(soilMoisturePercentage);
      Serial.println("%");
      String soilMoistureEndpoint = serverName + "soil-moisture";  
      http.begin(client, soilMoistureEndpoint);                     // Specify request destination
      http.addHeader("Content-Type", "application/json"); // Specify content-type header
      String json = String("{") + String("\"id\": 1,") + String("\"value\": ") + String(soilMoisturePercentage) + String(",\"sweetPotId\": 1") + String("}");
      delay(500);
      httpCode = http.POST(json);
      if(soilMoisturePercentage < 50) {
        digitalWrite(D0, 1);
        delay(2000);
        digitalWrite(D0, 0);
      }
    }
    
    temperature = dht11.readTemperature();
    if(!isnan(temperature)) {
      Serial.print("Temperature in C: ");
      Serial.println(temperature);
      String temperatureEndpoint = serverName + "temperature";  
      http.begin(client, temperatureEndpoint);                     // Specify request destination
      http.addHeader("Content-Type", "application/json"); // Specify content-type header
      String json = String("{") + String("\"id\": 1,") + String("\"value\": ") + temperature + String(",\"sweetPotId\": 1") + String("}");
      delay(500);
      httpCode = http.POST(json);   
    }
    
    humidity = dht11.readHumidity();
    if(!isnan(humidity)) {
      Serial.print("Humidity: ");
      Serial.println(humidity);
      String humidityEndpoint = serverName + "air-moisture";  
      http.begin(client, humidityEndpoint);                     // Specify request destination
      http.addHeader("Content-Type", "application/json"); // Specify content-type header
      String json = String("{") + String("\"id\": 1,") + String("\"value\": ") + humidity + String(",\"sweetPotId\": 1") + String("}");
      delay(500);
      httpCode = http.POST(json);     
    }
  
    http.end();  // Close connection
                                            
  } else {
    Serial.println("Error in WiFi connection!");
  }

  delay(15000);
}
