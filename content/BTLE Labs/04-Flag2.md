+++
title = "Flag2"
date = 2021-10-18T20:39:54-06:00
weight = 30
+++

Here are the target devices for reference:

0. Flag 0: 94:B9:7E:DA:08:56
1. Flag 1: 08:3A:F2:7D:65:8A
2. Flag 2: 94:B9:7E:FA:27:72
3. Flag 3: 94:B9:7E:F9:21:B6


### View Gatt Table

After switching to challenge 2, use `bleah` to enumerate its characteristics again.
```
$ sudo bleah -b 94:B9:7E:FA:27:72 -e
```

![images/bleah_flag_2.png](/static/bleah_flag_2.png)

We see that there is some authentication required, and that we should connect with pin 0000. We can do this with `gatttool`.

### Use Gatttool with Authentication

```bash
$ gatttool --sec-level=high -b 94:B9:7E:FA:27:72 --char-read -a 0x002c
```
This will prompt you for the pin. Enter `0000` and click `OK`.

![images/bleah_flag_2.png](/static/bleah_flag_2.png)

After authenticating, it will then print the value of `0x002c`.

![images/bleah_flag_2.png](/static/bleah_flag_2.png)

Using <a href="https://gchq.github.io/CyberChef/#recipe=From_Hex('Auto')&input=MzUgNjQgMzYgMzkgMzYgNjMgNjQgNjYgMzUgMzMgNjEgMzkgMzEgMzYgNjMgMzAgNjEgMzkgMzggNjQ">Cyberchef</a> we see
```
35 64 36 39 36 63 64 66 35 33 61 39 31 36 63 30 61 39 38 64
```
decodes to
```
5d696cdf53a916c0a98d
```
