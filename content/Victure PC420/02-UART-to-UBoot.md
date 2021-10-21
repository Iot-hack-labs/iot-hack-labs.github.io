---
title: "UART to U-Boot"
weight: 200
date: 2021-10-18T20:47:46-06:00
---

## UART to U-Boot
{{%expand "Home Only"%}}
We will now connect to the Victure camera via the USB to TTL adapter.

![DSD Tech USB to TTL Adapter](/static/PC420-dsd-tech-usb-to-ttl.jpg)
![Shikra Diagram](/static/PC420-shikra-diagram.png)

Connect the female ends of the jumper cables to the TX, RX, and GND pins on the USB to TTL adapter shown above. Once done, connect the adapter to the computer

Now connect the male ends of the jumper cables to the camera's UART ports according to the following table

| Adapter | Camera |
| --- | --- |
| GND | GND |
| TX | RX |
| RX | TX |

![Victure UART Ports](/static/PC420-victure.png)
{{% /expand%}}

`screen` can be used to connect to serial consoles. To connect to the adapter, run the following
```sh
screen /dev/ttyUSB3 115200
```
Where,
- `/dev/ttyUSB3`: Linux serial port for the USB to TTL adapter
- `115200`: The baud rate (i.e. communication speed). `115200` is often the baud rate of UART devices.

{{%expand "Home Only"%}}
**Note:** Your serial port might not be `/dev/ttyUSB3`. You can disconnect the adapter from the computer, run `ls /dev`, reconnect the adapter and run `ls /dev` to determine the correct serial port to use.
{{% /expand%}}

It is now time to power the camera. **Before doing so, make sure you are ready to press any key in the terminal where you ran the `screen` command to connect to the adapter's serial console.**

Once the camera is powered on, you should see something like this in the `screen` session

```sh
U-Boot 2013.10.0-AK_V3.0.05 (Jan 11 2021 - 08:10:47)

DRAM:  64 MiB
8 MiB
Create flash partition table init OK!
ak_sdhsmmc_init:
ANYKA SDHC/MMC4.0: 0
Load Env CRC OK!
In:    serial
Out:   serial
Err:   serial
reset pin value: 1

Hit any key to stop autoboot:  1
```
**Press any key to stop the autoboot process**. The following shell prompt should be shown
```sh
anyka$
```

**Note:** If you weren't fast enough, just simply disconnect and reconnect the power and try again.
