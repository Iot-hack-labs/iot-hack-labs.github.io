+++
title = "Discovery"
date = 2021-10-18T20:39:54-06:00
weight = 5
+++


### Discovery

This requires the attacker discover that port 8291 is exposed and running the Winbox service. (Not in the default nmap scan port list)

Only ports 8291, 21 are open.
```
nmap 172.21.0.4 -p21,22,23,53,80,2000,8291
Starting Nmap 7.91 ( https://nmap.org ) at 2021-10-18 13:20 MDT
Nmap scan report for 172.21.0.4
Host is up (0.0047s latency).

PORT     STATE    SERVICE
21/tcp   open     ftp
22/tcp   filtered ssh
23/tcp   filtered telnet
53/tcp   filtered domain
80/tcp   filtered     http
2000/tcp filtered cisco-sccp
8291/tcp open     unknown
```


The router version can be found by running nmap with service discovery.
```
$ nmap 172.21.0.4 -p21,8291 -sC

PORT     STATE SERVICE
21/tcp   open  ftp
| ftp-syst:
|_  SYST: UNIX MikroTik 6.39.2
8291/tcp open  unknown
```
