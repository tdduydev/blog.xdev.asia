---
id: 019c9617-fcd8-70c2-9f38-389135ea238e
title: Cài Đặt KVM trên Ubuntu 24.04
slug: cai-dat-kvm-tren-ubuntu-24-04
excerpt: >-
  Hướng dẫn chi tiết cách cài đặt KVM (Kernel-based Virtual Machine) trên Ubuntu
  24.04 LTS với giao diện quản lý web Cockpit hoặc Kimchi. Tìm hiểu cách thiết
  lập môi trường ảo hóa hoàn chỉnh, cấu hình network bridge, và tạo máy ảo đầu
  tiên của bạn một cách dễ dàng.
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
---
<p>KVM (Kernel-based Virtual Machine) là một giải pháp ảo hóa mã nguồn mở mạnh mẽ cho Linux. Khi kết hợp với giao diện quản lý dựa trên web như Cockpit hoặc Kimchi, việc quản lý máy ảo trở nên trực quan và có thể truy cập từ bất kỳ đâu. Hướng dẫn này sẽ hướng dẫn bạn cách cài đặt KVM trên Ubuntu 24.04 và thiết lập giao diện web để quản lý VM dễ dàng.</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">Yêu Cầu Hệ Thống</h2><ul><li>Ubuntu 24.04 LTS đã cài đặt</li><li>Quyền truy cập root hoặc sudo</li><li>CPU hỗ trợ ảo hóa (Intel VT-x hoặc AMD-V)</li><li>Tối thiểu 4GB RAM (khuyến nghị 8GB trở lên)</li><li>Đủ dung lượng ổ đĩa cho các VM</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-1-ki%E1%BB%83m-tra-h%E1%BB%97-tr%E1%BB%A3-%E1%BA%A3o-h%C3%B3a-ph%E1%BA%A7n-c%E1%BB%A9ng">Bước 1: Kiểm Tra Hỗ Trợ Ảo Hóa Phần Cứng</h2><p>Đầu tiên, kiểm tra xem CPU của bạn có hỗ trợ ảo hóa không:</p><pre><code class="language-bash">egrep -c '(vmx|svm)' /proc/cpuinfo
</code></pre><p>Nếu kết quả là&nbsp;<code>0</code>, ảo hóa không được hỗ trợ hoặc chưa được bật trong BIOS. Bất kỳ số nào lớn hơn&nbsp;<code>0</code>&nbsp;đều cho thấy có hỗ trợ.</p><p>Bạn cũng có thể sử dụng:</p><pre><code class="language-bash">kvm-ok
</code></pre><p>Nếu&nbsp;<code>kvm-ok</code>&nbsp;chưa được cài đặt, hãy cài đặt nó trước:</p><pre><code class="language-bash">sudo apt install cpu-checker
kvm-ok
</code></pre><p>Kết quả mong đợi:&nbsp;<code>INFO: /dev/kvm exists. KVM acceleration can be used</code></p><h2 id="b%C6%B0%E1%BB%9Bc-2-c%E1%BA%ADp-nh%E1%BA%ADt-c%C3%A1c-g%C3%B3i-h%E1%BB%87-th%E1%BB%91ng">Bước 2: Cập Nhật Các Gói Hệ Thống</h2><p>Cập nhật hệ thống của bạn để đảm bảo tất cả các gói đều mới nhất:</p><pre><code class="language-bash">sudo apt update
sudo apt upgrade -y
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-3-c%C3%A0i-%C4%91%E1%BA%B7t-kvm-v%C3%A0-c%C3%A1c-g%C3%B3i-li%C3%AAn-quan">Bước 3: Cài Đặt KVM và Các Gói Liên Quan</h2><p>Cài đặt KVM cùng với các công cụ ảo hóa thiết yếu:</p><pre><code class="language-bash">sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virtinst virt-manager
</code></pre><p><strong>Giải thích các gói:</strong></p><ul><li><code>qemu-kvm</code>: Gói chính KVM và QEMU</li><li><code>libvirt-daemon-system</code>: Daemon Libvirt để quản lý ảo hóa</li><li><code>libvirt-clients</code>: Các tiện ích phía client cho libvirt</li><li><code>bridge-utils</code>: Các tiện ích bridge mạng</li><li><code>virtinst</code>: Công cụ dòng lệnh để tạo VM</li><li><code>virt-manager</code>: Ứng dụng desktop để quản lý VM (tùy chọn)</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-4-k%C3%ADch-ho%E1%BA%A1t-v%C3%A0-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-d%E1%BB%8Bch-v%E1%BB%A5-libvirt">Bước 4: Kích Hoạt và Khởi Động Dịch Vụ Libvirt</h2><p>Kích hoạt dịch vụ libvirt để tự động khởi động khi boot và khởi động nó ngay:</p><pre><code class="language-bash">sudo systemctl enable libvirtd
sudo systemctl start libvirtd
</code></pre><p>Kiểm tra dịch vụ đang chạy:</p><pre><code class="language-bash">sudo systemctl status libvirtd
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-5-th%C3%AAm-user-v%C3%A0o-c%C3%A1c-nh%C3%B3m-c%E1%BA%A7n-thi%E1%BA%BFt">Bước 5: Thêm User Vào Các Nhóm Cần Thiết</h2><p>Thêm user của bạn vào nhóm&nbsp;<code>libvirt</code>&nbsp;và&nbsp;<code>kvm</code>&nbsp;để quản lý VM mà không cần sudo:</p><pre><code class="language-bash">sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER
</code></pre><p>Đăng xuất và đăng nhập lại để các thay đổi nhóm có hiệu lực, hoặc chạy:</p><pre><code class="language-bash">newgrp libvirt
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-6-x%C3%A1c-minh-c%C3%A0i-%C4%91%E1%BA%B7t-kvm">Bước 6: Xác Minh Cài Đặt KVM</h2><p>Kiểm tra KVM đã được cài đặt đúng:</p><pre><code class="language-bash">virsh list --all
</code></pre><p>Lệnh này sẽ trả về danh sách VM rỗng (trừ khi bạn đã tạo một số VM).</p><h2 id="b%C6%B0%E1%BB%9Bc-7-c%C3%A0i-%C4%91%E1%BA%B7t-giao-di%E1%BB%87n-webt%C3%B9y-ch%E1%BB%8Dn-1-cockpit-khuy%E1%BA%BFn-ngh%E1%BB%8B">Bước 7: Cài Đặt Giao Diện Web - Tùy Chọn 1: Cockpit (Khuyến Nghị)</h2><p>Cockpit là giao diện web hiện đại, nhẹ để quản lý các máy chủ Linux, bao gồm cả ảo hóa KVM.</p><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-cockpit">Cài Đặt Cockpit</h3><pre><code class="language-bash">sudo apt install -y cockpit cockpit-machines
</code></pre><h3 id="k%C3%ADch-ho%E1%BA%A1t-v%C3%A0-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-cockpit">Kích Hoạt và Khởi Động Cockpit</h3><pre><code class="language-bash">sudo systemctl enable --now cockpit.socket
</code></pre><h3 id="truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web-cockpit">Truy Cập Giao Diện Web Cockpit</h3><p>Mở trình duyệt web và truy cập:</p><pre><code class="language-text">https://your-server-ip:9090
</code></pre><p>Hoặc nếu truy cập cục bộ:</p><pre><code class="language-text">https://localhost:9090
</code></pre><p>Đăng nhập bằng tên người dùng và mật khẩu Ubuntu của bạn. Điều hướng đến&nbsp;<strong>Virtual Machines</strong>&nbsp;trong thanh bên trái để quản lý KVM.</p><h3 id="cho-ph%C3%A9p-cockpit-qua-t%C6%B0%E1%BB%9Dng-l%E1%BB%ADa-n%E1%BA%BFu-ufw-%C4%91%C6%B0%E1%BB%A3c-b%E1%BA%ADt">Cho Phép Cockpit Qua Tường Lửa (nếu UFW được bật)</h3><pre><code class="language-bash">sudo ufw allow 9090/tcp
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-8-c%C3%A0i-%C4%91%E1%BA%B7t-giao-di%E1%BB%87n-webt%C3%B9y-ch%E1%BB%8Dn-2-kimchi">Bước 8: Cài Đặt Giao Diện Web - Tùy Chọn 2: Kimchi</h2><p>Kimchi là một công cụ quản lý ảo hóa dựa trên web khác chạy trên Wok.</p><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-c%C3%A1c-ph%E1%BB%A5-thu%E1%BB%99c">Cài Đặt Các Phụ Thuộc</h3><pre><code class="language-bash">sudo apt install -y git python3-pip nginx
</code></pre><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-wok-v%C3%A0-kimchi">Cài Đặt Wok và Kimchi</h3><pre><code class="language-bash">sudo apt install -y wok kimchi
</code></pre><p>Nếu không có trong repository, cài đặt từ mã nguồn:</p><pre><code class="language-bash"># Cài đặt các phụ thuộc
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
</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-d%E1%BB%8Bch-v%E1%BB%A5-wok">Khởi Động Dịch Vụ Wok</h3><pre><code class="language-bash">sudo systemctl enable wokd
sudo systemctl start wokd
</code></pre><h3 id="truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web-kimchi">Truy Cập Giao Diện Web Kimchi</h3><p>Mở trình duyệt web và truy cập:</p><pre><code class="language-text">https://your-server-ip:8001
</code></pre><p>Đăng nhập bằng tên người dùng và mật khẩu Ubuntu của bạn.</p><h2 id="b%C6%B0%E1%BB%9Bc-9-c%E1%BA%A5u-h%C3%ACnh-network-bridge-t%C3%B9y-ch%E1%BB%8Dn">Bước 9: Cấu Hình Network Bridge (Tùy Chọn)</h2><p>Để VM có quyền truy cập mạng trực tiếp, cấu hình network bridge:</p><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-netplan-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh-ubuntu-2404">Sử Dụng Netplan (Mặc định Ubuntu 24.04)</h3><p>Chỉnh sửa cấu hình netplan:</p><pre><code class="language-bash">sudo nano /etc/netplan/00-installer-config.yaml
</code></pre><p>Cấu hình ví dụ:</p><pre><code class="language-yaml">network:
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
</code></pre><p>Thay thế&nbsp;<code>enp0s3</code>&nbsp;bằng tên giao diện mạng thực tế của bạn (tìm bằng lệnh&nbsp;<code>ip a</code>).</p><p>Áp dụng cấu hình:</p><pre><code class="language-bash">sudo netplan apply
</code></pre><h3 id="x%C3%A1c-minh-bridge">Xác Minh Bridge</h3><pre><code class="language-bash">ip addr show br0
brctl show
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-10-t%E1%BA%A1o-m%C3%A1y-%E1%BA%A3o-%C4%91%E1%BA%A7u-ti%C3%AAn">Bước 10: Tạo Máy Ảo Đầu Tiên</h2><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-giao-di%E1%BB%87n-web-cockpit">Sử Dụng Giao Diện Web Cockpit</h3><ol><li>Điều hướng đến&nbsp;<strong>Virtual Machines</strong>&nbsp;trong Cockpit</li><li>Nhấp&nbsp;<strong>Create VM</strong></li><li>Chọn nguồn cài đặt (file ISO, URL, hoặc PXE)</li><li>Cấu hình thiết lập VM (CPU, RAM, disk)</li><li>Bắt đầu cài đặt</li></ol><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-d%C3%B2ng-l%E1%BB%87nh">Sử Dụng Dòng Lệnh</h3><p>Tải xuống file ISO (ví dụ: Ubuntu Server):</p><pre><code class="language-bash">cd /var/lib/libvirt/images/
sudo wget https://releases.ubuntu.com/24.04/ubuntu-24.04-live-server-amd64.iso
</code></pre><p>Tạo một VM:</p><pre><code class="language-bash">sudo virt-install \
  --name ubuntu-vm \
  --ram 2048 \
  --vcpus 2 \
  --disk path=/var/lib/libvirt/images/ubuntu-vm.qcow2,size=20 \
  --os-variant ubuntu24.04 \
  --network bridge=virbr0 \
  --graphics vnc,listen=0.0.0.0 \
  --cdrom /var/lib/libvirt/images/ubuntu-24.04-live-server-amd64.iso
</code></pre><h2 id="x%E1%BB%AD-l%C3%BD-s%E1%BB%B1-c%E1%BB%91">Xử Lý Sự Cố</h2><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-permission-denied-quy%E1%BB%81n-b%E1%BB%8B-t%E1%BB%AB-ch%E1%BB%91i">Vấn Đề: Permission Denied (Quyền Bị Từ Chối)</h3><p>Nếu bạn gặp lỗi quyền, hãy đảm bảo user của bạn nằm trong các nhóm đúng:</p><pre><code class="language-bash">groups $USER
</code></pre><p>Nên bao gồm&nbsp;<code>libvirt</code>&nbsp;và&nbsp;<code>kvm</code>.</p><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-d%E1%BB%8Bch-v%E1%BB%A5-libvirtd-th%E1%BA%A5t-b%E1%BA%A1i">Vấn Đề: Dịch Vụ libvirtd Thất Bại</h3><p>Kiểm tra logs:</p><pre><code class="language-bash">sudo journalctl -u libvirtd
</code></pre><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-kh%C3%B4ng-th%E1%BB%83-truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web">Vấn Đề: Không Thể Truy Cập Giao Diện Web</h3><p>Kiểm tra xem dịch vụ có đang chạy không:</p><pre><code class="language-bash"># Với Cockpit
sudo systemctl status cockpit.socket

# Với Kimchi/Wok
sudo systemctl status wokd
</code></pre><p>Kiểm tra tường lửa:</p><pre><code class="language-bash">sudo ufw status
</code></pre><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-kh%C3%B4ng-c%C3%B3-k%E1%BA%BFt-n%E1%BB%91i-m%E1%BA%A1ng-trong-vm">Vấn Đề: Không Có Kết Nối Mạng Trong VM</h3><p>Xác minh mạng mặc định đang hoạt động:</p><pre><code class="language-bash">virsh net-list --all
sudo virsh net-start default
sudo virsh net-autostart default
</code></pre><h2 id="c%C3%A1c-v%E1%BA%A5n-%C4%91%E1%BB%81-b%E1%BA%A3o-m%E1%BA%ADt">Các Vấn Đề Bảo Mật</h2><ol><li><strong>Tường lửa</strong>: Chỉ mở các cổng giao diện web cho các mạng đáng tin cậy</li><li><strong>SSL/TLS</strong>: Sử dụng chứng chỉ phù hợp cho môi trường production</li><li><strong>Quyền truy cập người dùng</strong>: Tạo người dùng chuyên dụng với quyền hạn chế</li><li><strong>Cập nhật</strong>: Giữ KVM và các công cụ quản lý luôn được cập nhật</li><li><strong>Sao lưu</strong>: Thường xuyên sao lưu cấu hình và dữ liệu VM</li></ol><h2 id="c%C3%A1c-l%E1%BB%87nh-h%E1%BB%AFu-%C3%ADch">Các Lệnh Hữu Ích</h2><pre><code class="language-bash"># Liệt kê tất cả VM
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
</code></pre><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">Kết Luận</h2><p>Bây giờ bạn đã có một môi trường ảo hóa KVM hoàn chỉnh trên Ubuntu 24.04 với giao diện quản lý dựa trên web. Cockpit cung cấp giao diện hiện đại, dễ sử dụng để quản lý máy ảo, trong khi Kimchi cung cấp các tính năng nâng cao hơn cho người dùng chuyên nghiệp. Chọn cái phù hợp nhất với nhu cầu của bạn và bắt đầu tạo và quản lý máy ảo một cách hiệu quả.</p><h2 id="t%C3%A0i-nguy%C3%AAn-b%E1%BB%95-sung">Tài Nguyên Bổ Sung</h2><ul><li><a href="https://www.linux-kvm.org/">Tài liệu chính thức KVM</a></li><li><a href="https://libvirt.org/docs.html">Tài liệu Libvirt</a></li><li><a href="https://cockpit-project.org/">Dự án Cockpit</a></li><li><a href="https://ubuntu.com/server/docs">Tài liệu Ubuntu Server</a></li></ul>
