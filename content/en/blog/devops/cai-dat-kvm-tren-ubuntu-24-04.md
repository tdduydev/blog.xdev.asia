---
id: 019c9617-fcd8-70c2-9f38-389135ea238e
title: Install KVM on Ubuntu 24.04
slug: cai-dat-kvm-tren-ubuntu-24-04
excerpt: >-
  Detailed instructions on how to install KVM (Kernel-based Virtual Machine) on
  Ubuntu 24.04 LTS with Cockpit or Kimchi web management interface. Learn how to
  set up a complete virtualization environment, configure a network bridge, and
  create your first virtual machine with ease.
featured_image: /images/blog/kvm-ubuntu-featured.webp
type: blog
reading_time: 9
view_count: 2
meta: null
published_at: '2025-11-24T15:26:53.000000Z'
created_at: '2026-02-25T18:38:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9617-faa6-70d6-8679-ee4de1f177b3
  name: DevOps
  slug: devops
tags:
  - name: devops
    slug: devops
  - name: linux
    slug: linux
  - name: kvm
    slug: kvm
  - name: virtualization
    slug: virtualization
  - name: ubuntu
    slug: ubuntu
  - name: ubuntu-24.04
    slug: ubuntu-2404
  - name: cockpit
    slug: cockpit
  - name: kimchi
    slug: kimchi
  - name: libvirt
    slug: libvirt
  - name: qemu
    slug: qemu
  - name: web-ui
    slug: web-ui
  - name: virtual-machines
    slug: virtual-machines
  - name: hypervisor
    slug: hypervisor
  - name: server
    slug: server
comments: []
locale: en
---
<p>KVM (Kernel-based Virtual Machine) is a powerful open source virtualization solution for Linux. When combined with a web-based management interface like Cockpit or Kimchi, virtual machine management becomes intuitive and accessible from anywhere. This tutorial will show you how to install KVM on Ubuntu 24.04 and set up a web interface for easy VM management.</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">System Requirements</h2><ul><li>Ubuntu 24.04 LTS installed</li><li>Root or sudo access</li><li>CPU that supports virtualization (Intel VT-x or AMD-V)</li><li>Minimum 4GB RAM (8GB or more recommended)</li><li>Enough disk space for VMs</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-1-ki%E1%BB%83m-tra-h%E1%BB%97-tr%E1%BB%A3-%E1%BA%A3o-h%C3%B3a-ph%E1%BA%A7n-c%E1%BB%A9ng">Step 1: Check Hardware Virtualization Support</h2><p>First, check if your CPU supports virtualization:</p><pre><code class="language-bash">egrep -c '(vmx|svm)' /proc/cpuinfo
</code></pre><p>If the result is <code>0</code>, virtualization is not supported or has not been enabled in the BIOS. Whichever number is larger <code>0</code> all show support.</p><p>You can also use:</p><pre><code class="language-bash">kvm-ok
</code></pre><p>If <code>kvm-ok</code> not installed yet, install it first:</p><pre><code class="language-bash">sudo apt install cpu-checker
kvm-ok
</code></pre><p>Expected results: <code>INFO: /dev/kvm exists. KVM acceleration can be used</code></p><h2 id="b%C6%B0%E1%BB%9Bc-2-c%E1%BA%ADp-nh%E1%BA%ADt-c%C3%A1c-g%C3%B3i-h%E1%BB%87-th%E1%BB%91ng">Step 2: Update System Packages</h2><p>Update your system to ensure all packages are up to date:</p><pre><code class="language-bash">sudo apt update
sudo apt upgrade -y
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-3-c%C3%A0i-%C4%91%E1%BA%B7t-kvm-v%C3%A0-c%C3%A1c-g%C3%B3i-li%C3%AAn-quan">Step 3: Install KVM and Related Packages</h2><p>Install KVM along with essential virtualization tools:</p><pre><code class="language-bash">sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virtinst virt-manager
</code></pre><p><strong>Explanation of packages:</strong></p><ul><li><code>qemu-kvm</code>: KVM and QEMU main package</li><li><code>libvirt-daemon-system</code>: Libvirt daemon for virtualization management</li><li><code>libvirt-clients</code>: Client-side utilities for libvirt</li><li><code>bridge-utils</code>: Network bridge utilities</li><li><code>virtinst</code>: Command line tool to create VM</li><li><code>virt-manager</code>: Desktop application to manage VMs (optional)</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-4-k%C3%ADch-ho%E1%BA%A1t-v%C3%A0-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-d%E1%BB%8Bch-v%E1%BB%A5-libvirt">Step 4: Activate and Start Libvirt Service</h2><p>Enable the libvirt service to start automatically on boot and start it now:</p><pre><code class="language-bash">sudo systemctl enable libvirtd
sudo systemctl start libvirtd
</code></pre><p>Check the service is running:</p><pre><code class="language-bash">sudo systemctl status libvirtd
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-5-th%C3%AAm-user-v%C3%A0o-c%C3%A1c-nh%C3%B3m-c%E1%BA%A7n-thi%E1%BA%BFt">Step 5: Add Users to Necessary Groups</h2><p>Add your user to the group <code>libvirt</code> and <code>kvm</code> to manage VM without sudo:</p><pre><code class="language-bash">sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER
</code></pre><p>Log out and back in for the group changes to take effect, or run:</p><pre><code class="language-bash">newgrp libvirt
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-6-x%C3%A1c-minh-c%C3%A0i-%C4%91%E1%BA%B7t-kvm">Step 6: Verify KVM Settings</h2><p>Check KVM is installed correctly:</p><pre><code class="language-bash">virsh list --all
</code></pre><p>This command will return an empty VM list (unless you have created some VMs).</p><h2 id="b%C6%B0%E1%BB%9Bc-7-c%C3%A0i-%C4%91%E1%BA%B7t-giao-di%E1%BB%87n-webt%C3%B9y-ch%E1%BB%8Dn-1-cockpit-khuy%E1%BA%BFn-ngh%E1%BB%8B">Step 7: Install Web Interface - Option 1: Cockpit (Recommended)</h2><p>Cockpit is a modern, lightweight web interface for managing Linux servers, including KVM virtualization.</p><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-cockpit">Cockpit Settings</h3><pre><code class="language-bash">sudo apt install -y cockpit cockpit-machines
</code></pre><h3 id="k%C3%ADch-ho%E1%BA%A1t-v%C3%A0-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-cockpit">Cockpit Activation and Start-up</h3><pre><code class="language-bash">sudo systemctl enable --now cockpit.socket
</code></pre><h3 id="truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web-cockpit">Access the Cockpit Web Interface</h3><p>Open a web browser and access:</p><pre><code class="language-text">https://your-server-ip:9090
</code></pre><p>Or if accessing locally:</p><pre><code class="language-text">https://localhost:9090
</code></pre><p>Log in with your Ubuntu username and password. Navigate to <strong>Virtual Machines</strong> in the left sidebar to manage KVM.</p><h3 id="cho-ph%C3%A9p-cockpit-qua-t%C6%B0%E1%BB%9Dng-l%E1%BB%ADa-n%E1%BA%BFu-ufw-%C4%91%C6%B0%E1%BB%A3c-b%E1%BA%ADt">Allow Cockpit Through Firewall (if UFW is enabled)</h3><pre><code class="language-bash">sudo ufw allow 9090/tcp
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-8-c%C3%A0i-%C4%91%E1%BA%B7t-giao-di%E1%BB%87n-webt%C3%B9y-ch%E1%BB%8Dn-2-kimchi">Step 8: Install Web Interface - Option 2: Kimchi</h2><p>Kimchi is another web-based virtualization management tool that runs on Wok.</p><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-c%C3%A1c-ph%E1%BB%A5-thu%E1%BB%99c">Install Dependencies</h3><pre><code class="language-bash">sudo apt install -y git python3-pip nginx
</code></pre><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-wok-v%C3%A0-kimchi">Install Wok and Kimchi</h3><pre><code class="language-bash">sudo apt install -y wok kimchi
</code></pre><p>If not in the repository, install from source:</p><pre><code class="language-bash"># Cài đặt các phụ thuộc
sudo apt install -y python3-cherrypy3 python3-cheetah python3-pam python3-m2crypto gettext

# Clone repositories
cd /tmp
git clone https://github.com/kimchi-project/wok.git
git clone https://github.com/kimchi-project/kimchi.git

# Cài đặt Wok
cd wok
sudo make install

# Cài đặt Kimchi
cd ../kimchi
sudo make install
</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-d%E1%BB%8Bch-v%E1%BB%A5-wok">Start Wok Service</h3><pre><code class="language-bash">sudo systemctl enable wokd
sudo systemctl start wokd
</code></pre><h3 id="truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web-kimchi">Access Kimchi Web Interface</h3><p>Open a web browser and access:</p><pre><code class="language-text">https://your-server-ip:8001
</code></pre><p>Log in with your Ubuntu username and password.</p><h2 id="b%C6%B0%E1%BB%9Bc-9-c%E1%BA%A5u-h%C3%ACnh-network-bridge-t%C3%B9y-ch%E1%BB%8Dn">Step 9: Configure Network Bridge (Optional)</h2><p>To give the VM direct network access, configure the network bridge:</p><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-netplan-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh-ubuntu-2404">Using Netplan (Default Ubuntu 24.04)</h3><p>Edit netplan configuration:</p><pre><code class="language-bash">sudo nano /etc/netplan/00-installer-config.yaml
</code></pre><p>Example configuration:</p><pre><code class="language-yaml">network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: no
  bridges:
    br0:
      interfaces: [enp0s3]
      dhcp4: yes
      parameters:
        stp: false
        forward-delay: 0
</code></pre><p>Replace <code>enp0s3</code> with your actual network interface name (find with command <code>ip a</code>).</p><p>Apply configuration:</p><pre><code class="language-bash">sudo netplan apply
</code></pre><h3 id="x%C3%A1c-minh-bridge">Bridge Verification</h3><pre><code class="language-bash">ip addr show br0
brctl show
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-10-t%E1%BA%A1o-m%C3%A1y-%E1%BA%A3o-%C4%91%E1%BA%A7u-ti%C3%AAn">Step 10: Create Your First Virtual Machine</h2><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-giao-di%E1%BB%87n-web-cockpit">Using the Cockpit Web Interface</h3><ol><li>Navigate to <strong>Virtual Machines</strong> in Cockpit</li><li>Click <strong>Create VM</strong></li><li>Select installation source (ISO file, URL, or PXE)</li><li>Configure VM settings (CPU, RAM, disk)</li><li>Start installation</li></ol><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-d%C3%B2ng-l%E1%BB%87nh">Using the Command Line</h3><p>Download the ISO file (eg Ubuntu Server):</p><pre><code class="language-bash">cd /var/lib/libvirt/images/
sudo wget https://releases.ubuntu.com/24.04/ubuntu-24.04-live-server-amd64.iso
</code></pre><p>Create a VM:</p><pre><code class="language-bash">sudo virt-install \
  --name ubuntu-vm \
  --ram 2048 \
  --vcpus 2 \
  --disk path=/var/lib/libvirt/images/ubuntu-vm.qcow2,size=20 \
  --os-variant ubuntu24.04 \
  --network bridge=virbr0 \
  --graphics vnc,listen=0.0.0.0 \
  --cdrom /var/lib/libvirt/images/ubuntu-24.04-live-server-amd64.iso
</code></pre><h2 id="x%E1%BB%AD-l%C3%BD-s%E1%BB%B1-c%E1%BB%91">Troubleshooting</h2><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-permission-denied-quy%E1%BB%81n-b%E1%BB%8B-t%E1%BB%AB-ch%E1%BB%91i">Problem: Permission Denied</h3><p>If you get permission errors, make sure your users are in the correct groups:</p><pre><code class="language-bash">groups $USER
</code></pre><p>Should be included <code>libvirt</code> and <code>kvm</code>.</p><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-d%E1%BB%8Bch-v%E1%BB%A5-libvirtd-th%E1%BA%A5t-b%E1%BA%A1i">Problem: libvirtd Service Failed</h3><p>Check logs:</p><pre><code class="language-bash">sudo journalctl -u libvirtd
</code></pre><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-kh%C3%B4ng-th%E1%BB%83-truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web">Problem: Cannot Access Web Interface</h3><p>Check if the service is running:</p><pre><code class="language-bash"># Với Cockpit
sudo systemctl status cockpit.socket

# Với Kimchi/Wok
sudo systemctl status wokd
</code></pre><p>Check firewall:</p><pre><code class="language-bash">sudo ufw status
</code></pre><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-kh%C3%B4ng-c%C3%B3-k%E1%BA%BFt-n%E1%BB%91i-m%E1%BA%A1ng-trong-vm">Problem: No Network Connection in VM</h3><p>Verify the default network is working:</p><pre><code class="language-bash">virsh net-list --all
sudo virsh net-start default
sudo virsh net-autostart default
</code></pre><h2 id="c%C3%A1c-v%E1%BA%A5n-%C4%91%E1%BB%81-b%E1%BA%A3o-m%E1%BA%ADt">Security Issues</h2><ol><li><strong>Firewall</strong>: Open web interface ports only to trusted networks</li><li><strong>SSL/TLS</strong>: Use the appropriate certificate for the production environment</li><li><strong>User access rights</strong>: Create a dedicated user with limited permissions</li><li><strong>Update</strong>: Keep KVM and management tools up to date</li><li><strong>Backup</strong>: Regularly back up VM configuration and data</li></ol><h2 id="c%C3%A1c-l%E1%BB%87nh-h%E1%BB%AFu-%C3%ADch">Useful Commands</h2><pre><code class="language-bash"># Liệt kê tất cả VM
virsh list --all

# Khởi động VM
virsh start vm-name

# Tắt VM
virsh shutdown vm-name

# Buộc tắt VM
virsh destroy vm-name

# Xóa VM
virsh undefine vm-name

# Chỉnh sửa cấu hình VM
virsh edit vm-name

# Xem console VM
virsh console vm-name

# Liệt kê các mạng
virsh net-list --all

# Liệt kê storage pools
virsh pool-list --all
</code></pre><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">Conclusion</h2><p>You now have a complete KVM virtualization environment on Ubuntu 24.04 with a web-based management interface. Cockpit provides a modern, easy-to-use interface for virtual machine management, while Kimchi offers more advanced features for professional users. Choose the one that best suits your needs and start creating and managing virtual machines efficiently.</p><h2 id="t%C3%A0i-nguy%C3%AAn-b%E1%BB%95-sung">Additional Resources</h2><ul><li><a href="https://www.linux-kvm.org/">Official KVM documentation</a></li><li><a href="https://libvirt.org/docs.html">Libvirt Documentation</a></li><li><a href="https://cockpit-project.org/">Cockpit Project</a></li><li><a href="https://ubuntu.com/server/docs">Ubuntu Server Documentation</a></li></ul>
