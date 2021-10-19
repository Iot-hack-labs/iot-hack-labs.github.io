+++
title = "Getting Started"
date = 2021-10-18T20:39:54-06:00
weight = 5
+++

### Devices

Because it may be difficult to scan for all Bluetooth devices in such a crowded area, the BLE_CTF_INFINITY MAC addresses are provided below. If you are at a provided lab machine, try use the same number as your lab number. 1-5.

0. Flag 0: 94:B9:7E:DA:08:56
1. Flag 1: 08:3A:F2:7D:65:8A
2. Flag 2: 94:B9:7E:FA:27:72
3. Flag 3: 94:B9:7E:F9:21:B6

## Tools

We can use a few different tools to solve some BLE CTF Infinity challenges.

- hciconfig
- bleah
- gatttool

### Hciconfig

You can view BLE interfaces on you system by using the `hciconfig` command. You should see at least one interface.

![images/hciconfig.png](/static/hciconfig.png)

### Gatttool

We use `gatttool` to read and write values to service handles.
```bash
$ gatttool -b 94:B9:7E:DA:08:56 --char-read-a 0x0016
```

When navigating to different challenges, you will probably get the following error:
```
Characteristic Write Request failed: Request attribute has encountered an unlikely error
```
This is unavoidable because of the way the CTF was architected.


### Bleah

Although actually deprecated in favor of Bettercap, it may be easier to use bleah to target which device to enumerate characteristics.

![images/hciconfig.png](/static/hciconfig.png)
