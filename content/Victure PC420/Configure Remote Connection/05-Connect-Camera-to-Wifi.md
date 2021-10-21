---
title: "Connect Camera to WiFi"
weight: 500
date: 2021-10-18T20:48:21-06:01
---

Now that the firmware has been updated, we no longer need to boot to `/bin/sh`. To change the bootargs, follow the steps taken in the `UART to U-Boot` section to get into the U-Boot shell and run the following:

```sh
setenv bootargs console=ttySAK0,115200n8 root=/dev/mtdblock4 rootfstype=squashfs init=/init mem=64M memsize=64M
saveenv
```
```
Saving Environment to SPI Flash...
Env save done OK
```
Now disconnect and reconnect the power to the camera. The camera should not boot into a shell but should run our modified initialization scripts.

We now need to connect the camera to the WiFi. The first step to do this is to connect the computer to the WiFi the camera is broadcasting. The camera's WiFi SSID should start with 'Victure_'.

Once connected, run the following on the computer, replacing PASSWORD and SSID with the password and SSID of the WiFi it should connect to:
```sh
gen_qr_code_str(){
    qrcode_header='\x68\x00\x00\x00\x80'
    victure_user="95c992cdf31fc7d0"
    timezone="-7.00"
    region="US"
    wifi_type="WPA"
    wifi_ssid="$1"
    wifi_password="$2"

    payload="WIFI:U:$victure_user;Z:$timezone;R:$region;T:$wifi_type;P:\"$wifi_password\";S:$wifi_ssid;"

    ssidLength="${#wifi_ssid}"
    passwordLength="${#wifi_password}"
    payloadLength="${#payload}"
    lengths="$passwordLength;$ssidLength;$payloadLength"
    echo -en "${qrcode_header}L:$lengths;$payload"
}

gen_qr_code_str "HP Office Jet 420" "omg pizza party" | nc -v 10.1.8.1 6666
```
This sends the camera all of the info it needs in order to connect to the WiFi. Once done, you should see output in the `screen` session related to the camera connecting to the WiFi. Make note of the IP that is displayed once it has connected to the WiFi.
```sh
Sending select for 172.21.0.69...
Lease of 172.21.0.69 obtained, lease time 14400
deleting routes
route: SIOCDELRT: No such process
adding dns 69.27.0.130
adding dns 69.27.0.131
totalsize [4857755] VmRSS [3672] [4020] VmSize [13104]
no network for token
interface [wlan0] ip [172.21.0.69]
```
