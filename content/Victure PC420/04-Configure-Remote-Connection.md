---
title: "Configure Remote Connection"
weight: 400
date: 2021-10-18T20:48:21-06:01
---

## Configure Remote Connection
We have successfully been dropped into a root shell on the camera, but this required physical access. We are next going to update the camera's firmware to run `telnetd` upon booting up, allowing us to connect to it remotely.

### Dump Firmware
The first step in enabling remote connections is to dump the camera's firmware.

You may notice that, though we have shell, basic commands like `whoami` seem to give errors
```sh
/ # whoami
whoami: unknown uid 0
```
This is because we bypassed the initialization scripts that would mount file systems and start and configure certain services.

We could simply run `/init` but the camera's services all output to `stdout` which make it nearly impossible to use the shell. Thankfully, the services will log to a specific file if it exists when they are run.

Run the following to ensure the services will only log to a file
```sh
mount /mnt && mkdir /mnt/debug && touch /mnt/debug/log.txt
```
Where,
- `mount /mnt`: Mounts the `/mnt` directory according to the `/etc/fstab` file
- `mkdir /mnt/debug && touch /mnt/debug/log.txt`: Creates the debug directory and the log file the services will log to

Now we can safely run the initialization scripts. The scripts output to the console then start executing services in the background, dropping you back in the shell
```
/etc/init.d/rcS
```
```
mount all file system...
mount: according to /proc/mounts, tmpfs is already mounted on /mnt
starting mdev...
**************************
    Love Linux ! ! !
**************************
200+0 records in
200+0 records out
102400 bytes (100.0KB) copied, 0.024803 seconds, 3.9MB/s
find: insmod: No such file or directory
aksensor_module_init
aksensor 0-0001: Sensor ID error
```

Running `whoami` shows us that the system has been initialized
```sh
~ # whoami
root
```

Because we will be connecting remotely later on, lets update root's password to something we know
```sh
~ # passwd
Changing password for root
New password:
Bad password: too short
Retype password:
Password for root changed by root
```
**Note:** For the purpose of this guide, a simple password was used. It is advised to use a stronger password to avoid being easily compromised.

Connect the micro SD card to the camera and run the following:
```sh
mkdir /mnt/firmware
cp /dev/mtdblock* /mnt/firmware/
```
Where,
- `cp /dev/mtdblock* /mnt/firmware/`: Copies the block devices that contain the firmware over to the micro SD card

### Modify firmware
**The following steps need to be done on the laptop**

The block device that we need to modify is just a squashfs filesystem file. To extract the files from the firmware, lets install the `squashfs` tools
```sh
sudo apt install squashfs-tools 2> /dev/null
```

Now connect the micro SD to the computer and mount the card
```sh
sudo mkdir /mnt/pc420
sudo mount /dev/sdb1 /mnt/pc420
```

Now run the following to unsquash the root filesystem:
```sh
unsquashfs -d rootfs /mnt/pc420/firmware/mtdblock4
```
```
Parallel unsquashfs: Using 6 processors
320 inodes (338 blocks) to write

[===================-] 338/338 100%

created 302 files
created 17 directories
created 18 symlinks
created 0 devices
created 0 fifos
created 0 sockets
```
Where,
- `unsquashfs -d rootfs /mnt/pc420/firmware/mtdblock4`: Unsquashes the `mtdblock4` squashfs file and extracts the files to the `rootfs` directory

Now we are going to update the initialization scripts to start `telnet` and `ftp` upon boot. Edit `rootfs/etc/init.d/rcS` and uncomment lines 7 and 8
```sh
echo "start telnet......"
telnetd &
```
Edit `rootfs/etc/init.d/rc.local` and uncomment line 13
```sh
/bin/tcpsvd 0 21 ftpd -w / -t 600 &
```

### Build firmware
Now that we have modified the initialization scripts, we are going to 'resquash' the files
```sh
mksquashfs rootfs /mnt/pc420/root.sqsh4 -comp xz
```
Where,
- `rootfs`: The path to the directory containing the filesystem
- `/mnt/pc420/root.sqsh4`: The destination of the resulting squashfs file
- `-comp xz`: Compress the filesystem using `xz`

Once complete, unmount the micro SD card
```sh
sudo umount /mnt/pc420
```

### Update camera firmware
**The following commands need to be run on the camera**

Now that we have the modified squashfs file, we can update the camera's firmware. Plug the micro SD into the camera and run the following
```sh
/usr/sbin/update.sh
```
Where,
- `/usr/sbin/update.sh`: Runs the script to update the camera's firmware

The camera should reboot once it is done updating.

### Connect camera to WiFi
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

gen_qr_code_str "SAINTCON" "saintcon2021" | nc -v 10.1.8.1 6666
```
This sends the camera all of the info it needs in order to connect to the WiFi. Once done, you should see output in the `screen` session related to the camera connecting to the WiFi. Make note of the IP that is displayed once it has connected to the WiFi.
```sh
Sending select for 192.168.4.46...
Lease of 192.168.4.46 obtained, lease time 14400
deleting routes
route: SIOCDELRT: No such process
adding dns 69.27.0.130
adding dns 69.27.0.131
totalsize [4857755] VmRSS [3672] [4020] VmSize [13104]
no network for token
interface [wlan0] ip [192.168.4.46]
```
