+++
title = "Flag1"
date = 2021-10-18T20:39:54-06:00
weight = 20
+++

Here are the target devices for reference:

0. Flag 0: 94:B9:7E:DA:08:56
1. Flag 1: 08:3A:F2:7D:65:8A
2. Flag 2: 94:B9:7E:FA:27:72
3. Flag 3: 94:B9:7E:F9:21:B6


### Use Bleah to Enumerate All Characteristics

At this point, if we try to use `bleah` to enumerate the characteristics, we see that `bleah` shows us some interesting values.

```
$ sudo bleah -b 08:3A:F2:7D:65:8A -e
```

![images/bleah_flag_1.png](/static/bleah_flag_1.png)

When enumerating, the value at handle `0x002a` returns `goodbye 👋`. This disconnects the device. We have to use another tool to target reading the other values.


### Use Gatttool to Read Characteristics

Read the value at `0x002c` using `gatttool`.

``` bash
$ gatttool -b 08:3A:F2:7D:65:8A char-read -a 0x002c
```
![images/bleah_flag_1.png](/static/bleah_flag_1.png)

The value at `0x002c` decoded looks like our flag :)
