---
id: lt-cka-series-001
title: "Luyện thi CKA — Certified Kubernetes Administrator"
slug: luyen-thi-cka
description: >-
  Lộ trình ôn tập toàn diện cho kỳ thi CKA (Certified Kubernetes Administrator).
  Bao phủ đầy đủ 5 domain hands-on: Troubleshooting (30%), Cluster Architecture (25%),
  Services & Networking (20%), Workloads & Scheduling (15%), Storage (10%).
  12 bài học kèm bài tập thực hành terminal.

featured_image: images/blog/luyen-thi-cka-banner.webp
level: intermediate
duration_hours: 35
lesson_count: 12
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-04-05T10:00:00.000000Z'
created_at: '2026-04-05T10:00:00.000000Z'

author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg

category:
  id: 019c9616-cat9-7009-a009-000000000009
  name: Luyện thi chứng chỉ
  slug: luyen-thi

tags:

- name: Kubernetes
  slug: kubernetes
- name: CKA
  slug: cka
- name: CNCF
  slug: cncf
- name: Chứng chỉ
  slug: chung-chi
- name: DevOps
  slug: devops
- name: Linux Foundation
  slug: linux-foundation

quiz_slug: cka

sections:

- id: cka-section-01
  title: "Domain 1: Cluster Architecture, Installation & Configuration (25%)"
  description: kubeadm, RBAC, cluster upgrade, etcd backup/restore
  sort_order: 1
  lessons:
  - id: cka-d1-l01
    title: "Bài 1: Kubernetes Architecture & kubeadm Cluster Setup"
    slug: 01-kien-truc-cka-kubeadm
    description: >-
      Control plane components sâu. kubeadm init, join, config.
      High Availability cluster topology. Certificate rotation.
      kubectl config, contexts, kubeconfig.
    duration_minutes: 65
    is_free: true
    sort_order: 1
    video_url: null
  - id: cka-d1-l02
    title: "Bài 2: Cluster Upgrade với kubeadm"
    slug: 02-cluster-upgrade-kubeadm
    description: >-
      Upgrade strategy: control plane → worker nodes.
      drain, cordon, uncordon. Version skew policy.
      kubeadm upgrade plan/apply. Rollback procedures.
    duration_minutes: 60
    is_free: true
    sort_order: 2
    video_url: null
  - id: cka-d1-l03
    title: "Bài 3: RBAC — Role-Based Access Control"
    slug: 03-rbac-cka
    description: >-
      Role vs ClusterRole. RoleBinding vs ClusterRoleBinding.
      ServiceAccounts và token. kubectl auth can-i.
      Aggregated ClusterRoles. Least privilege patterns.
    duration_minutes: 60
    is_free: true
    sort_order: 3
    video_url: null

- id: cka-section-02
  title: "Domain 2: Workloads & Scheduling (15%)"
  description: Deployments, DaemonSets, scheduling, taints/tolerations, affinity
  sort_order: 2
  lessons:
  - id: cka-d2-l01
    title: "Bài 4: Deployments, DaemonSets & StatefulSets"
    slug: 04-deployments-daemonsets-statefulsets
    description: >-
      Rolling update strategies. Rollback. ReplicaSet vs Deployment.
      DaemonSet use cases. StatefulSet: headless service, volumeClaimTemplates.
      Resource requests & limits. QoS classes.
    duration_minutes: 60
    is_free: true
    sort_order: 4
    video_url: null
  - id: cka-d2-l02
    title: "Bài 5: Scheduling — Taints, Tolerations & Affinity"
    slug: 05-scheduling-taints-affinity
    description: >-
      Manual scheduling (nodeName, nodeSelector). Node Affinity/Anti-affinity.
      Pod Affinity/Anti-affinity. Taints & Tolerations.
      Priority Classes. Resource quotas & LimitRanges.
    duration_minutes: 60
    is_free: true
    sort_order: 5
    video_url: null

- id: cka-section-03
  title: "Domain 3: Services & Networking (20%)"
  description: Services, DNS, Ingress, NetworkPolicies, CNI
  sort_order: 3
  lessons:
  - id: cka-d3-l01
    title: "Bài 6: Services, Endpoints & CoreDNS"
    slug: 06-services-endpoints-coredns
    description: >-
      ClusterIP, NodePort, LoadBalancer, ExternalName, Headless.
      Endpoints & EndpointSlices. CoreDNS configuration.
      Service discovery patterns. kube-proxy modes (iptables, IPVS).
    duration_minutes: 60
    is_free: true
    sort_order: 6
    video_url: null
  - id: cka-d3-l02
    title: "Bài 7: Ingress, Network Policies & CNI"
    slug: 07-ingress-networkpolicies-cni
    description: >-
      Ingress controllers (nginx). Ingress rules, TLS.
      NetworkPolicy: ingress/egress rules, label selectors.
      CNI plugins: Calico, Flannel, Cilium overview.
      Pod CIDR vs Service CIDR.
    duration_minutes: 65
    is_free: true
    sort_order: 7
    video_url: null

- id: cka-section-04
  title: "Domain 4: Storage (10%)"
  description: PV, PVC, StorageClass, volumes
  sort_order: 4
  lessons:
  - id: cka-d4-l01
    title: "Bài 8: Persistent Volumes, PVCs & StorageClass"
    slug: 08-persistent-volumes-storageclass
    description: >-
      PersistentVolume, PersistentVolumeClaim lifecycle. Access modes.
      Reclaim policies. StorageClass & dynamic provisioning.
      hostPath, emptyDir, NFS. VolumeMount vs VolumeFrom.
    duration_minutes: 55
    is_free: true
    sort_order: 8
    video_url: null

- id: cka-section-05
  title: "Domain 5: Troubleshooting (30%)"
  description: Node, workload, networking troubleshooting, etcd backup
  sort_order: 5
  lessons:
  - id: cka-d5-l01
    title: "Bài 9: etcd Backup & Restore"
    slug: 09-etcd-backup-restore
    description: >-
      etcd architecture. etcdctl snapshot save/restore.
      Environment variables: ETCDCTL_API, certificates.
      Static pod manifest cho etcd. Recovery procedures.
      Encryption at rest configuration.
    duration_minutes: 55
    is_free: true
    sort_order: 9
    video_url: null
  - id: cka-d5-l02
    title: "Bài 10: Troubleshooting Nodes & Cluster"
    slug: 10-troubleshooting-nodes
    description: >-
      Node NotReady: kubelet, container runtime issues.
      journalctl, systemctl debugging. Certificate issues.
      Control plane component failures. Static pods.
      kubectl describe node, kubectl get events.
    duration_minutes: 60
    is_free: true
    sort_order: 10
    video_url: null
  - id: cka-d5-l03
    title: "Bài 11: Troubleshooting Workloads"
    slug: 11-troubleshooting-workloads
    description: >-
      Pod stuck states: Pending, CrashLoopBackOff, ImagePullBackOff, OOMKilled.
      kubectl logs, exec, describe. Init container debugging.
      Resource constraints. Liveness/Readiness probe failures.
    duration_minutes: 60
    is_free: true
    sort_order: 11
    video_url: null
  - id: cka-d5-l04
    title: "Bài 12: Troubleshooting Networking & Exam Strategy"
    slug: 12-troubleshooting-networking-exam
    description: >-
      DNS resolution failures. Service not reachable. kube-proxy issues.
      Network policy blocking traffic. nslookup, curl debugging.
      CKA exam tips: time management, kubectl shortcuts, imperative commands.
    duration_minutes: 60
    is_free: true
    sort_order: 12
    video_url: null
