
+++
title = "Ultraloq-UL3"
date = 2021-10-18T20:39:54-06:00
weight = 90
+++

## Ultraloq UL3

Find the firmware version that is being broadcasted by the Ultraloq UL3 Bluetooth enabled lock.

This can be done using some different tools.

## Bettercap

Because there are so many BLE devices in crowded areas, we will provide you the MAC address of the Ultraloq UL3:
```
78:DB:2F:DA:BA:3B
```

You can also use a tool like bettercap to find this.
```
$ sudo bettercap
```
```
> ble.recon on
```
You will have to turn off recon shortly after starting it because there are so many devices.

![images/bettercap_find_ultraloq.png](/static/bettercap_find_ultraloq.png)

```
> ble.enum 78:DB:2F:DA:BA:3B
```


### Bleah

If `bleah` is available on a lab machine or your own device, you can also try:
```
$ sudo bleah -b 78:DB:2F:DA:BA:3B -e
```
Note: this project has been deprecated in favor of Bettercap.



### BT Inspector Mobile App

Download and install an app like BT Inspector:

#### iOS
![images/bt_inspector_iphone.png](/static/bt_inspector_iphone.png)

#### Android

TBD
