/**********************************************************************
  Filename    : Défi_ch_6
  Description : Choose a color to the led pixel with buttons
  Auther      : Marc-Alexandre Di Marco François
  Modification: 2025/01/08
**********************************************************************/
#include "Freenove_WS2812_Lib_for_ESP32.h"

#define LEDS_COUNT  8   // The number of led
#define LEDS_PIN	  3  // define the pin connected to the Freenove 8 led strip
#define CHANNEL		  0   // RMT module channel

#define WHITE_DIGITAL 10 //define the start and stop trigger (Yellow switch)
#define RED_BUTTON 11  //define the red trigger (red switch)
#define GREEN_BUTTON 12  //define the green trigger (green switch)
#define BLUE_BUTTON 13  //define the blue trigger (blue switch)


Freenove_ESP32_WS2812 strip = Freenove_ESP32_WS2812(LEDS_COUNT, LEDS_PIN, CHANNEL, TYPE_GRB);

int m_color[5][3] = { {255, 0, 0}, {0, 255, 0}, {0, 0, 255}, {255, 255, 255}, {0, 0, 0} };
int delayval = 100;

// Define the variable to chosse colors
bool white = false;
bool red = false;
bool green = false;
bool blue = false;


/*
This function Debug the state of each button and print the color taken by the led pixel:

Debug(0) = red
Debug(1) = green
Debug(2) = blue
Debug(3) = white
Debug(4) = black

*/
void Debug(int debug_count)
{
  const char *color []={"Red", "Green", "Blue", "White", "Black"};
  bool white_debug;
  bool red_debug;
  bool green_debug;
  bool blue_debug;

  if (digitalRead(WHITE_DIGITAL) == LOW)
  {
    white_debug = true;
  }
  else
  {
    white_debug = false;
  }

  if (digitalRead(RED_BUTTON) == LOW)
  {
    red_debug = true;
  }
  else
  {
    red_debug = false;
  }

  if (digitalRead(GREEN_BUTTON) == LOW)
  {
    green_debug = true;
  }
  else
  {
    green_debug = false;
  }

  if (digitalRead(BLUE_BUTTON) == LOW)
  {
    blue_debug = true;
  }
  else
  {
    blue_debug = false;
  }

  // code printed on the console

  Serial.println(String(" color chosen : ")+ color [debug_count]);
  white_debug ? Serial.print(" WHITE ") : Serial.print(" white ");
  red_debug ? Serial.print(" RED ") : Serial.print(" red ");
  green_debug ? Serial.print(" Green ") : Serial.print(" green ");
  blue_debug ? Serial.print(" BLUE ") : Serial.print(" blue ");
} 

// This function chose the main colors(RGB) execpt white and black

void color_choice()
{
  // turn off white color if the yellow button is repress again
  if (digitalRead(WHITE_DIGITAL) == LOW)
  {
    white = false;
    loop();
  }

  red_color();
  green_color();
  blue_color();
}

// This function allow the led pixel to run the red color

void red_color()
{
  // Set the color of the while loop
  if (digitalRead(RED_BUTTON) == LOW && white == true)
  {
    red = true;
    green = false;
    blue = false;
  }
  
  while (red)
  {
    for (int i = 0; i < LEDS_COUNT; i++) 
    {
      // Debug(0);  Turn off this line to acces to the Debug function
      strip.setLedColorData(i, m_color[0][0], m_color[0][1], m_color[0][2]);// Set color data.
      strip.show();   // Send color data to LED, and display.
      delay(delayval);// Interval time of each LED.
      // if the yellow button is pressed, turn off the loop and turn oin the white loop
      if (digitalRead(WHITE_DIGITAL) == LOW && red == true)
      {
        white = true;
        red = false;
        loop();
      }
      // Check if an another button of the RGB color is pressed
      green_color();
      blue_color();
    }
    delay(500);       // Interval time of each group of colors.

    for (int i = 0; i < LEDS_COUNT; i++) 
    {
      // Debug(4);  Turn off this line to acces to the Debug function
      strip.setLedColorData(i, m_color[4][0], m_color[4][1], m_color[4][2]);// Set color data.
      strip.show();   // Send color data to LED, and display.
      delay(delayval);// Interval time of each LED.
      // if the yellow button is pressed, turn off the loop and turn oin the white loop
      if (digitalRead(WHITE_DIGITAL) == LOW && red == true)
      {
        white = true;
        red = false;
        loop();
      }
      // Check if an another button of the RGB color is pressed
      green_color();
      blue_color();
    }
    delay(500);       // Interval time of each group of colors.
  }
}

// This function allow the led pixel to run the green color

void green_color()
{
  // Set the color of the while loop
  if (digitalRead(GREEN_BUTTON) == LOW && white == true)
  {
    red = false;
    green = true;
    blue = false;
  }
  
  while (green)
  {
    for (int i = 0; i < LEDS_COUNT; i++) 
    {
      // Debug(1);  Turn off this line to acces to the Debug function
      strip.setLedColorData(i, m_color[1][0], m_color[1][1], m_color[1][2]);// Set color data.
      strip.show();   // Send color data to LED, and display.
      delay(delayval);// Interval time of each LED.
      // if the yellow button is pressed, turn off the loop and turn oin the white loop
      if (digitalRead(WHITE_DIGITAL) == LOW && green == true)
      {
        white = true;
        green = false;
        loop();
      }
      // Check if an another button of the RGB color is pressed
      red_color();
      blue_color();
    }
    delay(500);       // Interval time of each group of colors.

    for (int i = 0; i < LEDS_COUNT; i++) 
    {
      // Debug(4);  Turn off this line to acces to the Debug function
      strip.setLedColorData(i, m_color[4][0], m_color[4][1], m_color[4][2]);// Set color data.
      strip.show();   // Send color data to LED, and display.
      delay(delayval);// Interval time of each LED.
      // if the yellow button is pressed, turn off the loop and turn oin the white loop
      if (digitalRead(WHITE_DIGITAL) == LOW && green == true)
      {
        white = true;
        green = false;
        loop();
      }
      // Check if an another button of the RGB color is pressed
      red_color();
      blue_color();
    }
    delay(500);       // Interval time of each group of colors.
  }
}

// This function allow the led pixel to run the blue color

void blue_color()
{
  // Set the color of the while loop
  if (digitalRead(BLUE_BUTTON) == LOW && white == true)
  {
    red = false;
    green = false;
    blue = true;
  }
  
  while (blue)
  {
    for (int i = 0; i < LEDS_COUNT; i++) 
    {
      // Debug(2);  Turn off this line to acces to the Debug function
      strip.setLedColorData(i, m_color[2][0], m_color[2][1], m_color[2][2]);// Set color data.
      strip.show();   // Send color data to LED, and display.
      delay(delayval);// Interval time of each LED.
      // if the yellow button is pressed, turn off the loop and turn oin the white loop
      if (digitalRead(WHITE_DIGITAL) == LOW && blue == true)
      {
        white = true;
        blue = false;
        loop();
      }
      // Check if an another button of the RGB color is pressed
      red_color();
      green_color();
    }
    delay(500);       // Interval time of each group of colors.

    for (int i = 0; i < LEDS_COUNT; i++) 
    {
      // Debug(4);  Turn off this line to acces to the Debug function
      strip.setLedColorData(i, m_color[4][0], m_color[4][1], m_color[4][2]);// Set color data.
      strip.show();   // Send color data to LED, and display.
      delay(delayval);// Interval time of each LED.
      // if the yellow button is pressed, turn off the loop and turn oin the white loop
      if (digitalRead(WHITE_DIGITAL) == LOW && blue == true)
      {
        white = true;
        blue = false;
        loop();
      }
      // Check if an another button of the RGB color is pressed
      red_color();
      green_color();
    }
    delay(500);       // Interval time of each group of colors.
  }
}

// Principal function of arduino, run only one time

void setup() 
{
	strip.begin();
	strip.setBrightness(10);
  Serial.begin(115200);
  Serial.println("ESP32S3 initialization completed !");	
}

// Principal function on arduino, run each time the function is done

void loop() 
{
  // This loop Turn off the led pixel and wait only the yellow button is pressed
  while(!white)
  {
    for (int i = 0; i < LEDS_COUNT; i++) 
    {
      strip.setLedColorData(i, m_color[4][0], m_color[4][1], m_color[4][2]);// Set color data.
      strip.show();   // Send color data to LED, and display.
      delay(delayval);// Interval time of each LED.
      if (digitalRead(WHITE_DIGITAL) == LOW) 
      {
        delay(100);
        if (digitalRead(WHITE_DIGITAL) == LOW)
        {
          white = true;
        }
      }
    }
  }
  
  // This loop start the logic of the code and start the led pixel
  while (white)
  {
    for (int i = 0; i < LEDS_COUNT; i++) 
    {
      // Debug(3);  Turn off this line to acces to the Debug function
      strip.setLedColorData(i, m_color[3][0], m_color[3][1], m_color[3][2]);// Set color data.
      strip.show();   // Send color data to LED, and display.
      delay(delayval);// Interval time of each LED.
      // Check if the code need to stop or anothe rbutton is trigged
      color_choice();
    }
    delay(500);       // Interval time of each group of colors.

    for (int i = 0; i < LEDS_COUNT; i++) 
    {
      // Debug(3);  Turn off this line to acces to the Debug function
      strip.setLedColorData(i, m_color[4][0], m_color[4][1], m_color[4][2]);// Set color data.
      strip.show();   // Send color data to LED, and display.
      delay(delayval);// Interval time of each LED.
      // Check if the code need to stop or anothe rbutton is trigged
      color_choice();
    }
    delay(500);       // Interval time of each group of colors.
  }
}