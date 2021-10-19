+++
title = "Getting Started"
date = 2021-10-18T20:39:54-06:00
weight = 5
+++

### Devices

Because it may be difficult to scan for all Bluetooth devices in such a crowded area, the BLE_CTF_INFINITY MAC addresses for each challenge are provided below.

0. Challenge 0: 94:B9:7E:DA:08:56
1. Challenge 1: 08:3A:F2:7D:65:8A
2. Challenge 2: 94:B9:7E:FA:27:72
3. Challenge 3: 94:B9:7E:F9:21:B6

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


### Bleah

Although actually deprecated in favor of Bettercap, it may be easier to use bleah to target which device to enumerate characteristics.

![images/hciconfig.png](/static/hciconfig.png)

⚠️ Bleah has been deprecated in favor of Bettercap and may not be available.

### Bettercap

```
$ sudo bettercap
```

```
> ble.recon on
```

![images/ble_recon.png](/static/ble_recon.png)
