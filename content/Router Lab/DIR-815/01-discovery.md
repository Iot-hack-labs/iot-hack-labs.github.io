+++
title = "Discovery"
date = 2021-10-18T20:39:54-06:00
weight = 1
+++

Run nmap against the target. The `-Pn` flag is used to scan ports even though nmap is not receiving a ping response from the device.
```
nmap 172.21.0.23 -Pn
```

You should see that only port 8080 is shown as open.
```
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times will be slower.
Starting Nmap 7.91 ( https://nmap.org ) at 2021-10-19 13:20 MDT
Nmap scan report for 172.21.0.23
Host is up (0.010s latency).
Not shown: 999 filtered ports
PORT     STATE SERVICE
8080/tcp open  http-proxy
```

Open up a browser and navigate to https://172.16.0.23:8080

![images/dir-815-login.png](/static/dir-815-login.png)

You can try logging in, but we should see that we don't have the password.
