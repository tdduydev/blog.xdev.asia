---
id: 019c9617-fcd8-70c2-9f38-389135ea238e
title: 在 Ubuntu 24.04 上安裝 KVM
slug: cai-dat-kvm-tren-ubuntu-24-04
excerpt: >-
  有關如何使用 Cockpit 或 Kimchi Web 管理介面在 Ubuntu 24.04 LTS 上安裝
  KVM（基於核心的虛擬機器）的詳細說明。了解如何設定完整的虛擬化環境、配置網橋以及輕鬆建立您的第一台虛擬機器。
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
  name: 開發營運
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
locale: zh-tw
---
<p>KVM（基於核心的虛擬機器）是一款功能強大的 Linux 開源虛擬化解決方案。當與基於 Web 的管理介面（如 Cockpit 或 Kimchi）結合使用時，虛擬機器管理變得直觀且可從任何地方存取。本教學將向您展示如何在 Ubuntu 24.04 上安裝 KVM 並設定 Web 介面以輕鬆管理 VM。</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">系統需求</h2><ul><li>安裝 Ubuntu 24.04 LTS</li><li>root 或 sudo 訪問</li><li>支援虛擬化的CPU（Intel VT-x或AMD-V）</li><li>最低 4GB RAM（建議 8GB 或更多）</li><li>足夠的磁碟空間供虛擬機器使用</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-1-ki%E1%BB%83m-tra-h%E1%BB%97-tr%E1%BB%A3-%E1%BA%A3o-h%C3%B3a-ph%E1%BA%A7n-c%E1%BB%A9ng">第 1 步：檢查硬體虛擬化支援</h2><p>首先，檢查您的CPU是否支援虛擬化：</p><pre><code class="language-bash">egrep -c '(vmx|svm)' /proc/cpuinfo
</code></pre><p>如果結果是 <code>0</code>、虛擬化不受支援或尚未在 BIOS 中啟用。哪個數字較大 <code>0</code> 都表示支持。</p><p>您也可以使用：</p><pre><code class="language-bash">kvm-ok
</code></pre><p>如果 <code>kvm-正常</code> 尚未安裝，請先安裝：</p><pre><code class="language-bash">sudo apt install cpu-checker
kvm-ok
</code></pre><p>預期結果： <code>訊息：/dev/kvm 存在。可以使用KVM加速</code></p><h2 id="b%C6%B0%E1%BB%9Bc-2-c%E1%BA%ADp-nh%E1%BA%ADt-c%C3%A1c-g%C3%B3i-h%E1%BB%87-th%E1%BB%91ng">步驟2：更新系統包</h2><p>更新您的系統以確保所有軟體包都是最新的：</p><pre><code class="language-bash">sudo apt update
sudo apt upgrade -y
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-3-c%C3%A0i-%C4%91%E1%BA%B7t-kvm-v%C3%A0-c%C3%A1c-g%C3%B3i-li%C3%AAn-quan">第三步：安裝KVM及相關軟體包</h2><p>安裝 KVM 以及必要的虛擬化工具：</p><pre><code class="language-bash">sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virtinst virt-manager
</code></pre><p><strong>包說明：</strong></p><ul><li><code>qemu-kvm</code>：KVM和QEMU主包</li><li><code>libvirt 守護程式系統</code>：用於虛擬化管理的 Libvirt 守護進程</li><li><code>libvirt 用戶端</code>：libvirt 的客戶端實用程式</li><li><code>橋接工具</code>：網橋實用程式</li><li><code>維廷斯特</code>：建立VM的命令列工具</li><li><code>虛擬管理器</code>：用於管理虛擬機器的桌面應用程式（可選）</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-4-k%C3%ADch-ho%E1%BA%A1t-v%C3%A0-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-d%E1%BB%8Bch-v%E1%BB%A5-libvirt">第四步：啟動並啟動Libvirt服務</h2><p>啟用 libvirt 服務在啟動時自動啟動並立即啟動：</p><pre><code class="language-bash">sudo systemctl enable libvirtd
sudo systemctl start libvirtd
</code></pre><p>檢查服務是否正在運作：</p><pre><code class="language-bash">sudo systemctl status libvirtd
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-5-th%C3%AAm-user-v%C3%A0o-c%C3%A1c-nh%C3%B3m-c%E1%BA%A7n-thi%E1%BA%BFt">步驟 5：將使用者新增至必要的群組中</h2><p>將您的用戶加入群組 <code>庫虛擬機</code> 和 <code>克VM</code> 無需 sudo 即可管理虛擬機器：</p><pre><code class="language-bash">sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER
</code></pre><p>登出並重新登入以使群組變更生效，或運行：</p><pre><code class="language-bash">newgrp libvirt
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-6-x%C3%A1c-minh-c%C3%A0i-%C4%91%E1%BA%B7t-kvm">第 6 步：驗證 KVM 設定</h2><p>檢查KVM是否安裝正確：</p><pre><code class="language-bash">virsh list --all
</code></pre><p>此命令將傳回一個空的虛擬機器清單（除非您已經建立了一些虛擬機器）。</p><h2 id="b%C6%B0%E1%BB%9Bc-7-c%C3%A0i-%C4%91%E1%BA%B7t-giao-di%E1%BB%87n-webt%C3%B9y-ch%E1%BB%8Dn-1-cockpit-khuy%E1%BA%BFn-ngh%E1%BB%8B">第 7 步：安裝 Web 介面 - 選項 1：Cockpit（建議）</h2><p>Cockpit 是一個現代的輕量級 Web 介面，用於管理 Linux 伺服器，包括 KVM 虛擬化。</p><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-cockpit">駕駛艙設置</h3><pre><code class="language-bash">sudo apt install -y cockpit cockpit-machines
</code></pre><h3 id="k%C3%ADch-ho%E1%BA%A1t-v%C3%A0-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-cockpit">駕駛艙啟動和啟動</h3><pre><code class="language-bash">sudo systemctl enable --now cockpit.socket
</code></pre><h3 id="truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web-cockpit">存取駕駛艙 Web 介面</h3><p>開啟網頁瀏覽器並造訪：</p><pre><code class="language-text">https://your-server-ip:9090
</code></pre><p>或如果本地存取：</p><pre><code class="language-text">https://localhost:9090
</code></pre><p>使用您的 Ubuntu 使用者名稱和密碼登入。導航至 <strong>虛擬機</strong> 管理 KVM。</p><h3 id="cho-ph%C3%A9p-cockpit-qua-t%C6%B0%E1%BB%9Dng-l%E1%BB%ADa-n%E1%BA%BFu-ufw-%C4%91%C6%B0%E1%BB%A3c-b%E1%BA%ADt">允許 Cockpit 通過防火牆（如果啟用了 UFW）</h3><pre><code class="language-bash">sudo ufw allow 9090/tcp
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-8-c%C3%A0i-%C4%91%E1%BA%B7t-giao-di%E1%BB%87n-webt%C3%B9y-ch%E1%BB%8Dn-2-kimchi">第 8 步：安裝 Web 介面 - 選項 2：Kimchi</h2><p>Kimchi 是另一個在 Wok 上運行的基於 Web 的虛擬化管理工具。</p><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-c%C3%A1c-ph%E1%BB%A5-thu%E1%BB%99c">安裝依賴項</h3><pre><code class="language-bash">sudo apt install -y git python3-pip nginx
</code></pre><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-wok-v%C3%A0-kimchi">安裝炒鍋和泡菜</h3><pre><code class="language-bash">sudo apt install -y wok kimchi
</code></pre><p>如果儲存庫中沒有，請從來源安裝：</p><pre><code class="language-bash"># Cài đặt các phụ thuộc
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
</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-d%E1%BB%8Bch-v%E1%BB%A5-wok">啟動炒鍋服務</h3><pre><code class="language-bash">sudo systemctl enable wokd
sudo systemctl start wokd
</code></pre><h3 id="truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web-kimchi">存取 Kimchi Web 介面</h3><p>開啟網頁瀏覽器並造訪：</p><pre><code class="language-text">https://your-server-ip:8001
</code></pre><p>使用您的 Ubuntu 使用者名稱和密碼登入。</p><h2 id="b%C6%B0%E1%BB%9Bc-9-c%E1%BA%A5u-h%C3%ACnh-network-bridge-t%C3%B9y-ch%E1%BB%8Dn">步驟 9：設定網橋（選購）</h2><p>若要為虛擬機器提供直接網路存取權限，請設定網橋：</p><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-netplan-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh-ubuntu-2404">使用 Netplan（預設 Ubuntu 24.04）</h3><p>編輯網路規劃配置：</p><pre><code class="language-bash">sudo nano /etc/netplan/00-installer-config.yaml
</code></pre><p>設定範例：</p><pre><code class="language-yaml">network:
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
</code></pre><p>更換 <code>enp0s3</code> 使用您的實際網路介面名稱（使用指令尋找 <code>ip 一個</code>）。</p><p>應用程式配置：</p><pre><code class="language-bash">sudo netplan apply
</code></pre><h3 id="x%C3%A1c-minh-bridge">橋接驗證</h3><pre><code class="language-bash">ip addr show br0
brctl show
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-10-t%E1%BA%A1o-m%C3%A1y-%E1%BA%A3o-%C4%91%E1%BA%A7u-ti%C3%AAn">第 10 步：建立您的第一台虛擬機</h2><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-giao-di%E1%BB%87n-web-cockpit">使用駕駛艙 Web 介面</h3><ol><li>導航至 <strong>虛擬機</strong> 在駕駛艙內</li><li>點擊 <strong>建立虛擬機</strong></li><li>選擇安裝來源（ISO 檔案、URL 或 PXE）</li><li>配置虛擬機器設定（CPU、RAM、磁碟）</li><li>開始安裝</li></ol><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-d%C3%B2ng-l%E1%BB%87nh">使用命令列</h3><p>下載 ISO 檔案（例如 Ubuntu Server）：</p><pre><code class="language-bash">cd /var/lib/libvirt/images/
sudo wget https://releases.ubuntu.com/24.04/ubuntu-24.04-live-server-amd64.iso
</code></pre><p>建立虛擬機器：</p><pre><code class="language-bash">sudo virt-install \
  --name ubuntu-vm \
  --ram 2048 \
  --vcpus 2 \
  --disk path=/var/lib/libvirt/images/ubuntu-vm.qcow2,size=20 \
  --os-variant ubuntu24.04 \
  --network bridge=virbr0 \
  --graphics vnc,listen=0.0.0.0 \
  --cdrom /var/lib/libvirt/images/ubuntu-24.04-live-server-amd64.iso
</code></pre><h2 id="x%E1%BB%AD-l%C3%BD-s%E1%BB%B1-c%E1%BB%91">故障排除</h2><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-permission-denied-quy%E1%BB%81n-b%E1%BB%8B-t%E1%BB%AB-ch%E1%BB%91i">問題：權限被拒絕</h3><p>如果您收到權限錯誤，請確保您的使用者位於正確的群組中：</p><pre><code class="language-bash">groups $USER
</code></pre><p>應該包括在內 <code>庫虛擬機</code> 和 <code>克VM</code>。</p><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-d%E1%BB%8Bch-v%E1%BB%A5-libvirtd-th%E1%BA%A5t-b%E1%BA%A1i">問題：libvirtd 服務失敗</h3><p>檢查日誌：</p><pre><code class="language-bash">sudo journalctl -u libvirtd
</code></pre><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-kh%C3%B4ng-th%E1%BB%83-truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web">問題：無法存取Web介面</h3><p>檢查服務是否正在運作：</p><pre><code class="language-bash"># Với Cockpit
sudo systemctl status cockpit.socket

# Với Kimchi/Wok
sudo systemctl status wokd
</code></pre><p>檢查防火牆：</p><pre><code class="language-bash">sudo ufw status
</code></pre><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-kh%C3%B4ng-c%C3%B3-k%E1%BA%BFt-n%E1%BB%91i-m%E1%BA%A1ng-trong-vm">問題：虛擬機器中無網路連接</h3><p>驗證預設網路是否正常運作：</p><pre><code class="language-bash">virsh net-list --all
sudo virsh net-start default
sudo virsh net-autostart default
</code></pre><h2 id="c%C3%A1c-v%E1%BA%A5n-%C4%91%E1%BB%81-b%E1%BA%A3o-m%E1%BA%ADt">安全問題</h2><ol><li><strong>防火牆</strong>：僅向受信任的網路開放 Web 介面連接埠</li><li><strong>SSL/TLS</strong>：使用適合生產環境的證書</li><li><strong>使用者存取權限</strong>：建立一個具有有限權限的專用用戶</li><li><strong>更新</strong>：讓 KVM 和管理工具保持最新</li><li><strong>備份</strong>：定期備份虛擬機器配置和數據</li></ol><h2 id="c%C3%A1c-l%E1%BB%87nh-h%E1%BB%AFu-%C3%ADch">有用的命令</h2><pre><code class="language-bash"># Liệt kê tất cả VM
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
</code></pre><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">結論</h2><p>您現在在 Ubuntu 24.04 上擁有一個完整的 KVM 虛擬化環境，並具有基於 Web 的管理介面。 Cockpit 為虛擬機器管理提供了現代化、易於使用的介面，而 Kimchi 則為專業用戶提供了更高級的功能。選擇最適合您需求的虛擬機器並開始有效率地建立和管理虛擬機器。</p><h2 id="t%C3%A0i-nguy%C3%AAn-b%E1%BB%95-sung">其他資源</h2><ul><li><a href="https://www.linux-kvm.org/">官方KVM文檔</a></li><li><a href="https://libvirt.org/docs.html">Libvirt 文檔</a></li><li><a href="https://cockpit-project.org/">駕駛艙專案</a></li><li><a href="https://ubuntu.com/server/docs">Ubuntu 伺服器文檔</a></li></ul>
