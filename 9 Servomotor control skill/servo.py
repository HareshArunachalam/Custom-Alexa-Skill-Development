import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT)
pwm=GPIO.PWM(12,100)
pwm.start(5)
try:
	while 1:
		angle = raw_input("Enter angle: ")
		duty = float(angle) / 10.0 + 2.5
		pwm.ChangeDutyCycle(duty)
		time.sleep(0.5)
except KeyboardInterrupt:
		GPIO.cleanup()
