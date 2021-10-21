---
title: "Build Firmware"
weight: 300
date: 2021-10-18T20:48:21-06:01
---
Now that we have modified the initialization scripts, we are going to 'resquash' the files
```sh
sudo mksquashfs rootfs /mnt/pc420/root.sqsh4 -comp xz
```
Where,
- `rootfs`: The path to the directory containing the filesystem
- `/mnt/pc420/root.sqsh4`: The destination of the resulting squashfs file
- `-comp xz`: Compress the filesystem using `xz`

Once complete, unmount the micro SD card
```sh
sudo umount /mnt/pc420
```
