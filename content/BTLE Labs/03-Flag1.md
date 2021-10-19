+++
title = "Flag1"
date = 2021-10-18T20:39:54-06:00
weight = 20
+++


### Use Bettercap to Enumerate All Characteristics

At this point, if we try to use `bleah` to enumerate the characteristics, we see that `bleah` shows us some interesting values.

```
$ sudo bleah -b 08:3A:F2:7D:65:8A -e
```

![images/bleah_flag_1.png](/static/bleah_flag_1.png)

When enumerating, the value at handle `0x002a` returns `goodbye 👋`. This disconnects the device. We have to use another tool to target reading the other values.


### Use Gatttool to Read Characteristics

Read the value at `0x002c` using `gatttool`.

``` bash
$ gatttool -b 08:3A:F2:7D:65:8A --char-read -a 0x002c
```
![images/bleah_flag_1.png](/static/bleah_flag_1.png)

The value at `0x002c` decoded looks like our flag :)
