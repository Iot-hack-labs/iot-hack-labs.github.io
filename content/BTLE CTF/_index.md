+++
title = "BTLE CTF"
date = 2021-10-18T20:39:54-06:00
weight = 5
chapter = true
+++

### BTLE CTF

## Tips for this lab

⚠️⚠️⚠️ BLE devices are finicky. You **will** encounter errors and have to retry commands when following this lab. Here are some helpful tips:
1. Don't be afraid to run commands multiple times if you get an error. You may see error messages when in fact the command was successful.
2. Remove and re insert the Bluetooth dongle. (Or run `sudo systemctl restart bluetooth`)
3. Power cycle the BLE CTF device. (Progress will persist, but you will need to navigate to the challenge again)

## Tools

We can use a few different tools to solve some BLE CTF Infinity challenges.

- hciconfig
- bettercap
- gatttool


This lab walks through some tools that are used for hacking Bluetooth Low Energy (BLE). Our target is a Bluetooth CTF project designed to allow users to learn about core concepts of Bluetooth client and server interactions. (<a href="https://github.com/hackgnar/ble_ctf_infinity">BLE CTF Infinity</a>)
