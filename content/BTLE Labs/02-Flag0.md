+++
title = "Flag0"
date = 2021-10-18T20:39:54-06:00
weight = 10
+++


Here are the target devices for reference:

0. Flag 0: 94:B9:7E:DA:08:56
1. Flag 1: 08:3A:F2:7D:65:8A
2. Flag 2: 94:B9:7E:FA:27:72
3. Flag 3: 94:B9:7E:F9:21:B6

Use `bettercap` to enumerate the characteristics on the device.

```
$ sudo bettercap
```
```
> ble.recon on
> ble.enum bleah 94:B9:7E:DA:08:56
```

![images/ble_enum_flag_0.png](/static/ble_enum_flag_0.png)

⚠️ Try this a few times if it doesn't work and/or removing and plugging in the bluetooth dongle.

For the flag 0, we notice that the 'Device Name' kinda looks like a flag.

![images/bleah_flag_0.png](/static/bleah_flag_0.png)
