from subprocess import call
import os
for i in range(100):
        if(os.path.exists("/home/pi/test" + str(i) + ".jpg")== True):
                                i = i+1
        else:
                break
call(["fswebcam", "test" + str(i) + ".jpg"])

