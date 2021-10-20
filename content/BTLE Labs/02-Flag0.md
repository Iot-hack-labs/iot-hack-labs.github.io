+++
title = "Flag0"
date = 2021-10-18T20:39:54-06:00
weight = 10
+++


Use `bettercap` to enumerate the characteristics on the device.

```
sudo bettercap
```
```
ble.recon on
ble.enum 94:B9:7E:DA:08:56
```

![images/ble_enum_flag_0.png](/static/ble_enum_flag_0.png)

⚠️ Try this a few times if it doesn't work and/or removing and plugging in the bluetooth dongle.

For the flag 0, we see that the 'Device Name' kinda looks like a flag.

![images/bleah_flag_0.png](/static/bleah_flag_0.png)
