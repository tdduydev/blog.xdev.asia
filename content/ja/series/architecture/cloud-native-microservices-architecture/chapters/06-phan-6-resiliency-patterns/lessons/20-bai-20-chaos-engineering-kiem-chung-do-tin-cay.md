---
id: 019d8a22-c320-7a10-b001-a1b2c3d4e520
title: 'レッスン 20: カオス エンジニアリング — システムの信頼性の検証'
slug: bai-20-chaos-engineering-kiem-chung-do-tin-cay
description: カオス エンジニアリングの原則、カオス モンキーとリトマスカオス、カオス実験の設計、定常状態の仮説、爆発範囲の制御、試合日、回復力の文化の構築。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 20
section_title: 'パート 6: 回復力パターン'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2385" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2385)"/>

  <!-- Decorations -->
  <g>
    <circle cx="965" cy="125" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="830" cy="70" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="695" cy="275" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="1060" cy="220" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="925" cy="165" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <line x1="600" y1="95" x2="1100" y2="175" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="125" x2="1050" y2="195" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="970.9807621135332,130 970.9807621135332,160 945,175 919.0192378864668,160 919.0192378864668,130 945,115" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ アーキテクチャ — レッスン 20</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 20: カオス エンジニアリング — 学位の検証</tspan>
      <tspan x="60" dy="42">システムの信頼</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 6: 回復力パターン</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 20: カオス エンジニアリング — システムの信頼性の検証](/storage/uploads/2026/03/cn-bai-20-diagram.webp)

## はじめに

サーキット ブレーカー、再試行、バルクヘッドを実装しました...しかし、本番環境で問題が発生した場合、それらが実際に機能することをどのように証明しますか?

**カオス エンジニアリング**は、予期せぬ事態が発生する前に、本番環境またはステージング環境で問題を**積極的に*発生させることにより、システムのフォールト トレランスを検証する分野です。

> *「失敗を練習しないと、失敗中にシステムがどのように動作するか実際にはわかりません。」* — Netflix

---

## 1. カオスエンジニアリングの原則

### 1.1 定義

カオス エンジニアリングは、「面白半分にシステムを破壊する」というものではありません。これは制御された科学的プロセスです。

```
1. Xác định Steady State (baseline bình thường)
2. Đặt ra Hypothesis ("nếu X xảy ra, hệ thống vẫn ổn vì...")
3. Thiết kế experiment với blast radius nhỏ
4. Chạy experiment
5. Quan sát kết quả
6. So sánh với hypothesis
7. Nếu sai → fix → verify
8. Nếu đúng → mở rộng scope
```

### 1.2 定常状態の仮説

```yaml
# Ví dụ Steady State cho e-commerce:
steady_state:
  metrics:
    - name: "Order success rate"
      query: "rate(http_requests_total{service='order',status='201'}[5m])"
      threshold: "> 0.99"      # > 99% thành công

    - name: "p99 latency"
      query: "histogram_quantile(0.99, ...)"
      threshold: "< 500ms"

    - name: "Active orders being processed"
      query: "order_processing_active"
      threshold: "> 0"          # Vẫn đang xử lý orders
```

カオス実験は、実験中および実験後に定常状態が維持される場合にのみ**合格**します。

### 1.3 カオスの種類

```
Infrastructure Chaos:
  - Pod kill / crash loop
  - Node failure
  - Network partition
  - Resource starvation (CPU, memory)

Application Chaos:
  - Latency injection (làm service chậm giả)
  - Error injection (trả về 500 ngẫu nhiên)
  - Dependency failure mocking

Data Chaos:
  - Database failover
  - Cache eviction
  - Message queue backlog

Security Chaos:
  - Certificate expiry simulation
  - Auth service unavailability
```

---

## 2. カオスエンジニアリングツール

### 2.1 LitmusChaos (Kubernetes ネイティブ)

LitmusChaos は CNCF プロジェクトであり、Kubernetes 用のクラウドネイティブ カオス エンジニアリング プラットフォームです。

```bash
# Cài đặt LitmusChaos
kubectl apply -f https://litmuschaos.github.io/litmus/litmus-operator-v3.x.yaml

# Cài ChaosCenterCLI
curl -O https://litmusctl-bucket.s3-website.us-east-2.amazonaws.com/litmusctl-linux-amd64-latest.tar.gz
```

### 2.2 ポッドキルの実験

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: pod-kill-experiment
  namespace: services-prod
spec:
  engineState: 'active'
  appinfo:
    appns: 'services-prod'
    applabel: 'app=payment-service'
    appkind: 'deployment'
  chaosServiceAccount: litmus-admin
  experiments:
    - name: pod-delete
      spec:
        components:
          env:
            - name: TOTAL_CHAOS_DURATION
              value: '60'       # Thử nghiệm 60 giây
            - name: CHAOS_INTERVAL
              value: '10'       # Kill pod mỗi 10 giây
            - name: FORCE
              value: 'false'    # Graceful delete
            - name: PODS_AFFECTED_PERC
              value: '50'       # Kill 50% pods
```

### 2.3 ネットワーク遅延の挿入

```yaml
# Inject 500ms latency vào 50% requests từ/đến payment-service
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: network-latency-experiment
spec:
  experiments:
    - name: pod-network-latency
      spec:
        components:
          env:
            - name: NETWORK_INTERFACE
              value: 'eth0'
            - name: NETWORK_LATENCY
              value: '500'      # 500ms latency
            - name: JITTER
              value: '100'      # ± 100ms jitter
            - name: TOTAL_CHAOS_DURATION
              value: '120'
            - name: PODS_AFFECTED_PERC
              value: '50'       # Chỉ ảnh hưởng 50% pods
```

### 2.4 CPU ストレス

```yaml
- name: pod-cpu-hog
  spec:
    components:
      env:
        - name: CPU_CORES
          value: '1'          # Stress 1 CPU core toàn bộ
        - name: TOTAL_CHAOS_DURATION
          value: '60'
        - name: CPU_LOAD
          value: '100'        # 100% CPU usage
```

---

## 3. カオス実験を設計する

### 3.1 爆発半径の制御

常に最小の爆発半径から開始します。

```
Tăng dần theo giai đoạn:

Stage 1: Dev environment, 1 pod
  → Xác nhận mechanism hoạt động

Stage 2: Staging, 25% pods
  → Xác nhận hành vi dưới partial failure

Stage 3: Production, giờ thấp điểm, 10% pods
  → Xác nhận dưới real traffic

Stage 4: Production, 50% pods
  → Xác nhận major failure handling

Stage 5: Production, node failure
  → Multi-availability zone resilience
```

### 3.2 実験テンプレート

```yaml
# chaos-experiment-template.yaml
experiment:
  name: "Payment Service Pod Kill"
  version: "1.0"
  hypothesis: >
    Khi 50% pods của payment-service bị kill,
    order success rate vẫn > 95% nhờ:
    (1) Kubernetes tự restart pods mới
    (2) Circuit Breaker chuyển sang Half-Open khi pods quay lại
    (3) Retry mechanism handle transient failures

  blast_radius:
    service: payment-service
    percentage: 50
    duration: 60s
    environment: staging

  steady_state_hypothesis:
    before:
      - metric: order_success_rate > 99%
      - metric: p99_latency < 300ms
    during:
      - metric: order_success_rate > 95%   # Cho phép degraded
      - metric: p99_latency < 800ms        # Latency có thể tăng
    after:
      - metric: order_success_rate > 99%   # Phải phục hồi
      - metric: p99_latency < 300ms        # Về baseline

  rollback:
    automatic: true
    trigger: order_success_rate < 90%
```

### 3.3 中止条件

```
Tự động dừng experiment khi:
- Error rate > 10% (threshold)
- p99 latency > 2s
- Có manual intervention từ on-call engineer
- Business-critical metric vượt ngưỡng (orders failed > X)
```

---

## 4. 実践: カオス実験をエンドツーエンドで行う

### 4.1 シナリオ: 決済サービスの低下

**ステップ 1: ベースラインを確認する**

```bash
# Kiểm tra steady state trước khi bắt đầu
kubectl get pods -n services-prod -l app=payment-service
# NAME                        READY   STATUS    RESTARTS
# payment-service-abc123-1    1/1     Running   0
# payment-service-abc123-2    1/1     Running   0
# payment-service-abc123-3    1/1     Running   0

# Check metrics
curl -s prometheus:9090/api/v1/query?query=order_success_rate
```

**ステップ 2: カオスを注入する**

```bash
kubectl apply -f pod-delete-experiment.yaml

# Monitor trong real-time
watch kubectl get pods -n services-prod -l app=payment-service
```

**ステップ 3: 観察**

```
T+0s: Experiment bắt đầu, 1 pod bị kill
      → Pod restart (Kubernetes)
      → Circuit Breaker nhận một số errors
      → Retry mechanism kick in

T+10s: Pod mới lên, nhưng pod thứ 2 bị kill
       → Requests đến pod đang restart fail
       → Error rate: 2.3% (dưới threshold 5%)

T+30s: 2 pods healthy, 1 restarting
       → System degraded nhưng functional

T+60s: Experiment kết thúc, tất cả pods healthy
       → Error rate → 0%
       → Steady state phục hồi trong 15s
```

**ステップ 4: 結果を分析する**

```
Expected vs Actual:
                    Expected    Actual   Pass?
Error rate (peak)   < 5%        2.3%     ✅
Recovery time       < 30s       15s      ✅
Orders lost         0           0        ✅
Alert triggered     Yes         Yes      ✅

Kết luận: Payment service resilient trước pod kill scenario
```

---

## 5. ゲームデイ

**Game Day** は組織化された訓練セッションです。エンジニアリング チームが集結して災害復旧をテストします。

```
Game Day Schedule:
9:00  - Briefing: scenario được chọn, team assignments
9:30  - Inject chaos (ví dụ: Database failover)
9:30-11:00 - Team response, triage, mitigation
11:00 - Khôi phục hệ thống
11:30 - Post-mortem: what happened, what worked, what didn't
12:00 - Action items: fix findings, improve runbooks
```

### 人気のゲームデーのシナリオ

```
Scenario 1: "Primary DB region gone"
→ Test: Database failover tự động
→ Verify: Read replicas promote, application reconnect

Scenario 2: "Kafka cluster unavailable"
→ Test: Event-driven services handle backpressure
→ Verify: Outbox pattern, dead letter queue, alerts

Scenario 3: "Auth service down"
→ Test: JWT caching cho validation
→ Verify: Graceful degradation, what percentage of traffic breaks

Scenario 4: "DDoS-like traffic spike"
→ Test: Rate limiting, auto-scaling
→ Verify: System scales, bad traffic rejected, good traffic served
```

---

## 6. レジリエンスの文化を構築する

### 6.1 事後対応から事前対応へ

```
Reactive culture:
"Sự cố xảy ra → Panic → Fix → Forget"

Proactive culture:
"Chủ động inject failure → Learn → Improve → Verify"
```

### 6.2 混乱前のチェックリスト

```
□ Có monitoring/alerting đầy đủ
□ Team on-call biết về experiment
□ Runbook sẵn sàng cho rollback
□ Blast radius được giới hạn rõ ràng
□ Abort conditions được định nghĩa
□ Stakeholders đã được thông báo (nếu production)
□ Experiment có thể dừng ngay bằng một lệnh
```

### 6.3 カオスエンジニアリング成熟度モデル

```
Level 1 — Manual (Beginner)
  Chạy chaos manually, thủ công trên dev/staging
  Không có automation

Level 2 — Automated experiments trong CI
  Chaos tests tự động chạy mỗi tuần
  Kết quả phải pass trước khi release

Level 3 — Continuous Chaos (Advanced)
  Chaos experiments chạy liên tục 24/7 ở production
  Netflix Chaos Monkey — kill random instances
  Luôn test khả năng tự phục hồi

Level 4 — Full Automation + GameDays
  Tất cả scenarios được automated
  Quarterly game days cho catastrophic scenarios
  SRE team chuyên về resilience
```

---

## 概要

|コンセプト |目的 |
|----------|----------|
|定常状態の仮説 |ベースラインと予想される動作の定義 |
|爆発半径 |実験の影響範囲を制限する |
|リトマスカオス | Kubernetes ネイティブのカオス ツール |
|ポッドキル |自動再始動とサーキットブレーカーをテストする |
|ネットワーク遅延の挿入 |タイムアウトと再試行の動作をテストする |
|ゲームデー |チームとして災害対応をリハーサルする |
|継続的な混乱 |レジリエンスを 24 時間 365 日常に検証 (Netflix レベル) |

**次の記事**: マイクロサービス用の CI/CD パイプライン
