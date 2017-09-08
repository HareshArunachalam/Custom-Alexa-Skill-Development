import time

tempadd = "/sys/bus/w1/devices/28-0314667ef0ff/w1_slave"

try:
	while 1:
		tempfile = open(tempadd, "r")
		tempdata = tempfile.read()
		tempfile.close()
		(first, second, third) = tempdata.partition("t=")
		temp = float(third)/1000
		unit = raw_input("K for Kelvin, C for Celcius and F for Fahrenheit: ")
		if unit == "C":
			print " The temperature is " + str(temp) + " degree celcius "
		elif unit == "K":
			tempK = temp + 273.15
			print " The temperature is " + str(tempK) + " degree kelvin "
		elif unit == "F":
			tempF = temp*1.8 + 32
			print " The temperature is " + str(tempF) + " fahreneit "	
	        time.sleep(1)

except KeyboardInterrupt:
	pass

		
