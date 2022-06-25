#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include "DHT.h"

#define DHT_TYPE DHT11
#define SOIL_MOISTURE A0
#define WATER_POMP D0
#define DHT_PIN D4

// WIFI SETTINGS
const char* ssid = "Kotic";
const char* password = "06homize";

// SERVER VARIABLES
// SERVER IP - 192.168.0.107
// SERVER PORT - 5050 
String serverName = "http://192.168.0.107:5050/";
String soilMoistureEndpoint = serverName + "soil-moisture";  
String temperatureEndpoint = serverName + "temperature";
String humidityEndpoint = serverName + "air-moisture";
int httpResponseCode;

// DHT11 CONFIG
DHT dht11(DHT_PIN, DHT_TYPE);
float humidity, temperature, soilMoisture;
//int httpCode;
// CAPACITY SOIL MOISTURE 
const int dry = 700;
const int wet = 400;

String createJson(String sensorData) {
  String json = String("{") + String("\"id\": 1,") + String("\"value\": ") + sensorData + String(",\"sweetPotId\": 1") + String("}");
  return json;
}

void handleBadResponse(int code) {
  if(code >= 200 && code < 300) { 
    Serial.println("Everything is ok");
  }

  if(code >= 400 && code < 500) {
    Serial.println("Bad Request");  
  }

  if(code >= 500) {
    Serial.println("Server error");
  }
}

void setup() {
  Serial.begin(115200); // Serial connection 
  delay(100);
  
  pinMode(WATER_POMP, OUTPUT);
  digitalWrite(WATER_POMP, LOW);
  
  pinMode(DHT_PIN, INPUT);
  dht11.begin();
  
  // WiFi connection
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);                   

  // Wait for the WiFi connectiom completion
  while(WiFi.status() != WL_CONNECTED) {        
    Serial.print("...");
    delay(1000);
  }
}

void loop() { 
  if(WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    Serial.println();
    
    soilMoisture = analogRead(SOIL_MOISTURE);
    if(soilMoisture) {
      // convert sensor data to %
      int soilMoisturePercentage = map(soilMoisture, wet, dry, 100, 0); 
      Serial.print("Soil Moisture: ");
      Serial.print(soilMoisturePercentage);
      Serial.println("%");
      
      http.begin(client, soilMoistureEndpoint);                 // Specify request destination
      http.addHeader("Content-Type", "application/json");       // Specify content-type header
      
      String json = createJson(String(soilMoisturePercentage));
      httpResponseCode = http.POST(json);
      
      handleBadResponse(httpResponseCode);
      
      if(soilMoisturePercentage < 50) {
        digitalWrite(WATER_POMP, 1);
        delay(5000);
        digitalWrite(WATER_POMP, 0);
      }
    }
    
    temperature = dht11.readTemperature();
    if(!isnan(temperature)) {
      Serial.print("Temperature in C: ");
      Serial.println(temperature);
        
      http.begin(client, temperatureEndpoint);                     
      http.addHeader("Content-Type", "application/json"); 
      
      String json = createJson(String(temperature));
      httpResponseCode = http.POST(json);
      
      handleBadResponse(httpResponseCode);  
    }
    
    humidity = dht11.readHumidity();
    if(!isnan(humidity)) {
      Serial.print("Humidity: ");
      Serial.println(humidity);
        
      http.begin(client, humidityEndpoint);                     
      http.addHeader("Content-Type", "application/json"); 
      
      String json = createJson(String(humidity));
      httpResponseCode = http.POST(json);
      
      handleBadResponse(httpResponseCode);     
    }
  
    http.end();  // Close connection
                                            
  } else {
    Serial.println("Error in WiFi connection!");
  }
  
  // 1min - 60sec 
  delay(90000);
}