---
title: "Test Remote Connection"
weight: 900
date: 2021-10-18T20:52:11-06:00
---

Now that the camera is connected to the WiFi, we should be able to disconnect our USB to TTL adapter and remotely connect to it.
```sh
telnet 172.21.0.69
```
```
Trying 172.21.0.69...
Connected to 172.21.0.69.
Escape character is '^]'.

anyka login: root
Password:
welcome to file system
```
```
[root@anyka ~]$ uname -a
Linux anyka 3.4.35 #9 Thu Feb 25 11:45:35 UTC 2021 armv5tejl GNU/Linux
```
