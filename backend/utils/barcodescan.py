import cv2
from pyzbar.pyzbar import decode

class BarcodeScan():
    def getInfo(photoname):
        img = cv2.imread(photoname)
        print(decode(img))