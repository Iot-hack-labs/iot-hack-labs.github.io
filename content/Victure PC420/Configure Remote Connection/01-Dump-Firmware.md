---
title: "Dump Firmware"
weight: 100
date: 2021-10-18T20:48:21-06:01
---

## Dump Firmware
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