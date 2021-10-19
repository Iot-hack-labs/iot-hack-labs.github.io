+++
title = "Flag3"
date = 2021-10-18T20:39:54-06:00
weight = 40
+++


Here are the target devices for reference:

0. Flag 0: 94:B9:7E:DA:08:56
1. Flag 1: 08:3A:F2:7D:65:8A
2. Flag 2: 94:B9:7E:FA:27:72
3. Flag 3: 94:B9:7E:F9:21:B6


### View Gatt Table

Use `bleah` to enumerate its characteristics again.
```
$ sudo bleah -b 94:B9:7E:FA:27:72 -e
```

![images/bleah_flag_3.png](/static/bleah_flag_3.png)

We can see that it is looking for a device with the MAC address `11:22:33:44:55:66` to connect to it.

## View the Interface MAC Address

Use `hciconfig` to view the MAC address of the interface.

![images/bleah_flag_3.png](/static/bleah_flag_3.png)

### Spooftooph

We can spoof our mac address with the tool `spooftooph`. (Make sure to use `sudo`)
```
$ sudo spooftooph -i hci0 -a 11:22:33:44:55:66
```
![images/bleah_flag_3.png](/static/bleah_flag_3.png)


Once we have done this, we need to reset the interface for the changes to take.
```
$ sudo hciconfig hci0 reset
```
Now `hciconfig` should show the new MAC.

![images/bleah_flag_3.png](/static/bleah_flag_3.png)

### Read the Gatt Table with Spoofed MAC

Using `bettercap` with the spoofed MAC we can now read the flag: `0ad3fe0c58e0a47b8afb`.

![images/bleah_flag_3.png](/static/bleah_flag_3.png)
