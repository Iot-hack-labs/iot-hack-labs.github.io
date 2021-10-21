---
title: "Modify Firmware"
weight: 200
date: 2021-10-18T20:48:21-06:01
---

## Modify Firmware

**The following steps need to be done on the laptop**

The block device that we need to modify is just a squashfs filesystem file.

{{%expand "Home Only"%}}
To extract the files from the firmware, lets install the `squashfs` tools
```sh
sudo apt install squashfs-tools 2> /dev/null
```
{{% /expand%}}

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
