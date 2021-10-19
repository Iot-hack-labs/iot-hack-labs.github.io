+++
title = "Discovery"
date = 2021-10-18T20:39:54-06:00
weight = 5
+++

### About

This will guide you how to exploit a Mikrotik running Router Os.


### Discovery

1. First, run nmap against the target to discover what ports are open.
- `-Pn`: scan the device even though its not responding to ping.
- `--top-ports=4000` will scan the top 4000 most common service ports. The default is 1000, and will miss one of the open ports.

```
nmap 172.21.0.4 --top-ports=4000 -Pn
```

You should see that there are 2 open ports, 21 and 8291.
```
nmap 172.21.0.4 --top-ports=4000 -Pn
Starting Nmap 7.91 ( https://nmap.org ) at 2021-10-18 13:20 MDT
Nmap scan report for 172.21.0.4
Host is up (0.0047s latency).

PORT     STATE    SERVICE
21/tcp   open     ftp
8291/tcp open     unknown
```

2. Do service discovery on the open ports by using the `-sC` flag.
```
$ nmap 172.21.0.4 -p21,8291 -sC -Pn
```
```
$ nmap 172.21.0.4 -p21,8291 -sC -Pn
PORT     STATE SERVICE
21/tcp   open  ftp
| ftp-syst:
|_  SYST: UNIX MikroTik 6.39.2
8291/tcp open  unknown
```

Nice. Now we know that this router is running MikroTik version 6.39.2.
