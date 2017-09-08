import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)

try:
        pin = int(raw_input("Enter the pin Number : "))
        while True:
                GPIO.setup(pin, GPIO.OUT)
                status = raw_input("Turn On or Off : ")
                if status=="On":
                        GPIO.output(pin, GPIO.HIGH)
                elif status=="Off":
                        GPIO.output(pin, GPIO.LOW)
except KeyboardInterrupt:
        GPIO.cleanup()
