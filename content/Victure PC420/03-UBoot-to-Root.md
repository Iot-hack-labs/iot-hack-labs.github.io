---
title: "U-Boot to Root"
weight: 300
date: 2021-10-18T20:48:21-06:00
---

## U-Boot to Root

The current shell is actually a U-Boot a limited shell. U-Boot is an open-source, primary boot loader. This shell has commands related to the booting process.

```sh
anyka$ help
?       - alias for 'help'
base    - print or set address offset
bootm   - boot application image from memory
bootp   - boot image via network using BOOTP/TFTP protocol
chpart  - change active partition
cmp     - memory compare
cp      - memory copy
crc32   - checksum calculation
downcheck_patition_update- load usr.sqsh4 tftp
downimage- downimage   - download and write All-Image to FLASH device,partiton table from ENV partition.
downjffs2fs- load usr.jffs2 tftp
downkernel- load uImage tftp
...<omitted for brevity>...
```
This U-Boot shell can be used to drop us into a root shell. To do so, run the following
```sh
setenv bootargs console=ttySAK0,115200n8 root=/dev/mtdblock4 rootfstype=squashfs init=/bin/sh mem=64M memsize=64M
saveenv
```

```
Saving Environment to SPI Flash...
Env save done OK

```
Where,
- `setenv bootargs args...`: Sets the command line arguments that are passed to the kernel. The change here is `init=/bin/sh`. This means that instead of running `/init` when fully booted, `/bin/sh` will be run.
- `saveenv`: Saves the environment to Flash memory.

Now disconnect and reconnect the power to the camera. Once fully booted, you should be dropped into a shell.

```sh
/ # ls -lah
total 3
drwxrwxr-x   13 1024     1028         162 Mar  2  2021 .
drwxrwxr-x   13 1024     1028         162 Mar  2  2021 ..
drwxr-xr-x    2 1024     1028        2.3K Oct 28  2019 bin
drwxr-xr-x    3 0        root           0 Jan  1 00:00 dev
drwxr-xr-x    5 1024     1028         283 Mar  2  2021 etc
-rwxr-xr-x    1 1024     1028        2.7K Nov 22  2017 init
drwxr-xr-x    3 1024     1028         816 Feb  9  2021 lib
drwxr-xr-x    2 1024     1028           3 Feb  9  2017 mnt
drwxr-xr-x    2 1024     1028           3 Feb  9  2017 proc
drwxr-xr-x    2 1024     1028        1.4K Mar  2  2021 sbin
drwxr-xr-x    2 1024     1028           3 Feb  9  2017 sys
drwxr-xr-x    2 1024     1028           3 Feb  9  2017 tmp
drwxr-xr-x    2 1024     1028           3 Mar  2  2021 usr
drwxr-xr-x    3 1024     1028          26 Apr 14  2017 var
```
