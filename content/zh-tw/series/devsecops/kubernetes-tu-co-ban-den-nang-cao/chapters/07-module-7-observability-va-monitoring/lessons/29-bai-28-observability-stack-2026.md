---
id: 019c9618-0501-7000-8000-c1147ba22e15
title: 第 28 課：可觀測性堆疊 2026 — PLG + OPENTELEMETRY
slug: bai-28-observability-stack-2026-plg-opentelemetry
description: OpenTelemetry 2026 標準的可觀測性的 3 個支柱。 PLG 堆疊：Prometheus（指標）、Loki（日誌）、Grafana（視覺化）。 Grafana Alloy 取代了 Promtail + OTel Collector。為什麼不是EFK？
duration_minutes: 90
is_free: false
video_url: null
sort_order: 28
section_title: 模組 7：可觀察性和監控
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: Kubernetes：從基礎到高級
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: zh-tw
---
<h2>可觀測性堆疊 2026 — PLG + OpenTelemetry</h2>

<p>在分散式系統的現代世界中，根據系統輸出到外部的內容來了解系統的內部狀態是 <strong>可觀察性</strong> 的核心定義。與傳統監控不同，傳統監控僅詢問「系統是否正常運作？」的問題。 ——可觀察性讓你可以問「為什麼系統會這樣做？」即使是在您從未預料到的情況下。 </p>

<p>本課程將全面介紹 2026 年推薦的可觀測性堆疊，包括三大可觀測性支柱、OpenTelemetry 標準、PLG 和 EFK 堆疊之間的對比以及 Grafana Alloy 作為統一收集器的角色。 </p>

<img src="/storage/uploads/2026/03/k8s-observability-stack-2026.webp" alt="Kubernetes Observability Stack 2026 - Prometheus, Loki, Tempo, Grafana, OpenTelemetry" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>可觀察性的三大支柱__HTMLTAG_10___

<p>每個可觀測系統都圍繞著三種基本類型的訊號。了解每種類型以及它們如何相互補充是建立有效觀察系統的基礎。 </p>

<h3>指標 — 一段時間內的數值資料</h3>

<p>指標是隨著時間的推移測量和收集的數值。它們可讓您觀察趨勢、設定警報閾值並檢測異常。例如：每秒請求數、CPU 使用率、平均延遲、錯誤率。 </p>

<p>metric 的優點是儲存成本低、查詢快、非常適合用於警報。但是，指標無法告訴您 <em>為什麼 </em> 某個值不正常 — 您需要日誌和追蹤來進一步調查。 </p>

<h3>日誌 — 事件日誌</h3>

<p>日誌是應用程式和系統產生的事件日誌。它們提供了有關特定時間發生的事情的最詳細的背景資訊。每個日誌條目通常包括時間戳記、嚴重性等級、訊息和元資料欄位。 </p>

<p>當您確定了時間段和有問題的組件（來自指標警報）並且需要了解更多詳細資訊時，日誌非常強大。日誌面臨的挑戰是資料量龐大，儲存/查詢成本可能非常高。 </p>

<h3>追蹤 — 請求追蹤</h3>

<p>分散式追蹤跨多個服務和元件追蹤請求。每個追蹤由多個 <strong>spans</strong> 組成 - 具有開始和結束時間戳、操作名稱和元資料的工作單元。追蹤可協助您了解服務之間的依賴關係、識別瓶頸以及偵錯與延遲相關的錯誤。 </p>

<h3>為什麼需要全部三個？ </h3><p>在典型調查過程中協同工作的三大支柱：</p>
<ul>
  ___HTMLTAG_38__HTMLTAG_39___指標警報</strong>警告錯誤率在凌晨 2:30 增加</li>
  <li>您開啟 <strong>Grafana 儀表板</strong>檢視指標並意識到服務支付有問題</li>
  <li>您在此期間跳轉至 <strong>Loki 日誌</strong> 進行服務付款，並看到「連線被拒絕」錯誤</li>
  <li>您按一下日誌行中的追蹤 ID 並跳到 <strong>Tempo 追蹤</strong> 以查看請求在資料庫呼叫處逾時</li>
  <li>結論：資料庫連線池已耗盡</li>
</ul>

<p>三個支柱都無法單獨提供足夠的資訊。力量在於它們之間的組合和相關性。 </p>

<h2>OpenTelemetry — 獨特標準 2026</h2>

<p>在 OpenTelemetry 之前，每個供應商（Datadog、New Relic、Jaeger、Zipkin...）都有自己的 SDK 和代理商。改變供應商意味著重寫檢測程式碼。 OpenTelemetry (OTel) 的誕生就是為了解決這個供應商鎖定問題。 </p>

<h3>什麼是 OpenTelemetry？ </h3>

<p>OpenTelemetry 是 CNCF 畢業專案 — 收集和匯出遙測資料（指標、日誌、追蹤）的業界標準。 OTel 由 2019 年 OpenCensus 和 OpenTracing 合併而成，到 2026 年，OTel 已成為雲端原生生態系統中無可爭議的標準。 </p>

<h3>與供應商無關的架構</h3>

<p>OTel 架構明確區分了偵測（如何收集資料）和匯出（將資料傳送到何處）。您檢測一次，然後只需更改匯出器配置即可將資料傳送至 Prometheus、Jaeger、Datadog、New Relic 或任何後端。 </p>

<h3>自動偵測 — 無需更改程式碼</h3>

<p>OTel 最強大的功能之一是其自動偵測功能。借助 Java、Python、Node.js 和 .NET 等流行語言，OTel 可以自動注入檢測，無需開發人員更改任何程式碼行。這對於：</p> 特別有用
<ul>
  <li>沒有偵測的舊版應用程式__HTMLTAG_77___
  <li>您無法控制其原始程式碼的第三方程式庫</li>
  <li>為整個車隊快速部署儀器__HTMLTAG_81___
</ul>

<h3>OTLP 協定 — 統一傳輸</h3>

<p>OpenTelemetry Line Protocol (OTLP) 是用於傳輸指標、日誌和追蹤的統一協定。 OTLP 支援 gRPC（連接埠 4317）和 HTTP（連接埠 4318）。對所有三種訊號類型使用單一協定可以大幅簡化網路配置、防火牆規則和負載平衡。 </p>

<h3>Kubernetes 的 OpenTelemetry 運算子</h3><p>OpenTelemetry Operator 是一個 Kubernetes Operator，用於管理 OTel 收集器和自動檢測的部署和配置。它提供了兩個主要的 CRD：</p>
<ul>
  ___HTMLTAG_92__HTMLTAG_93___OpenTelemetryCollector</strong>：部署與設定 OTel Collector 實例</li>
  ___HTMLTAG_96__HTMLTAG_97___偵測</strong>：為工作負載設定自動偵測</li>
</ul>

___程式碼區塊_0___

<p>應用Instrumentation CRD後，只需在Pod中加入註解即可啟動自動偵測：</p>

___程式碼區塊_1___

<h2>PLG 堆疊與 EFK 堆疊</h2>

<p>Kubernetes 中用於日誌聚合和可觀察性的兩個最受歡迎的堆疊是 PLG (Prometheus + Loki + Grafana) 和 EFK (Elasticsearch + Fluentd/Fluent Bit + Kibana)。在它們之間進行選擇取決於特定的用例。 </p>

<h3>PLG 堆疊 — 輕量級、廉價、基於標籤</h3>

<p>PLG 堆疊專為雲端原生環境而設計，其理念是「索引標籤，而不是內容」：</p>
<ul>
  ___HTMLTAG_112__HTMLTAG_113___Prometheus</strong>：依時間序列收集與儲存指標</li>
  ___HTMLTAG_116__HTMLTAG_117___Loki</strong>：使用基於標籤的索引進行日誌聚合（類似於 Prometheus，但用於日誌）</li>
  ___HTMLTAG_120__HTMLTAG_121___Grafana</strong>：所有資料來源的統一視覺化</li>
</ul>

<p>Loki 不索引日誌內容（僅標籤），這使得儲存和營運成本顯著低於 Elasticsearch。權衡是全文搜尋功能不太強大。但對於大多數用例（按服務、命名空間、時間範圍、模式匹配進行查詢），Loki 完全足夠了。 </p>

<h3>EFK 堆疊 — 全文搜索，較重</h3>

<p>EFK 堆疊針對全文搜尋和複雜分析進行了最佳化：</p>
<ul>
  ___HTMLTAG_132__HTMLTAG_133___Elasticsearch</strong>：全文索引日誌存儲，搜尋能力很強</li>
  ___HTMLTAG_136__HTMLTAG_137___Fluentd/Fluent Bit</strong>：日誌收集器與處理器</li>
  ___HTMLTAG_140__HTMLTAG_141___Kibana</strong>：Elasticsearch 的可視化與搜尋 UI</li>
</ul>

<p>Elasticsearch 對整個日誌內容建立索引，從而實現極其強大的全文搜尋。然而，這是有代價的：Elasticsearch 消耗更多的 RAM 和 CPU，需要至少 3 個節點的叢集來確保 HA，並且營運成本要高得多。 </p>

<h3>何時使用 EFK？ </h3>

<p>在下列情況下選擇 EFK：</p>
<ul>
  <li>需要在日誌內容中進行全文搜尋（例如，可選地按錯誤訊息搜尋）</li>
  <li>需要對日誌資料進行複雜的聚合和分析</li>
  <li>團隊擁有 Elasticsearch 經驗</li>
  <li>預算不是問題，需要 Elastic 的企業功能</li>
</ul><p>對於大多數團隊來說，PLG 堆疊是 2026 年 Kubernetes 可觀測性的更好選擇。更低的營運成本、與 Prometheus 生態系統更好的整合以及物件儲存上更好的可擴展性。 </p>

<h2>Grafana 合金 — 統一收集器</h2>

<p>Grafana Alloy（2024 年正式發布，取代 Grafana Agent）是一個統一的遙測收集器，繼承並合併了許多以前的工具：</p>
<ul>
  <li>取代 <strong>Promtail</strong>（Loki 日誌收集器）</li>
  <li>取代 <strong>Prometheus 遠端寫入代理程式___HTMLTAG_174__HTMLTAG_175___
  <li>在許多用例中取代 <strong>OTel Collector</strong></li>
  <li>替換 <strong>Grafana 代理</strong>（前身）</li>
</ul>

<h3>River DSL 設定__HTMLTAG_186___

<p>Alloy 使用 River DSL — Grafana 自己的設定語言，基於 HCL (Terraform)。 River 能夠聲明具有互連組件的管道：</p>

___程式碼區塊_2___

<h3>從代理程式收集指標、日誌、追蹤</h3>

<p>Alloy 允許運行單個 DaemonSet 來處理所有這些，而不是運行 3-4 個單獨的 DaemonSet（Promtail、節點導出器、OTel Collector...）。這最大限度地減少了：</p>
<ul>
  <li>每個節點上運行的 Pod 數量</li>
  <li>容器運行時的開銷__HTMLTAG_197___
  <li>設定管理的複雜性__HTMLTAG_199___
  <li>到後端的網路連線</li>
</ul>

<h2>推薦堆疊 2026</h2>

<p>基於營運現實和社群趨勢，以下是 2026 年 Kubernetes 的建議可觀測性堆疊：</p>

<h3>主要组件</h3>
<ul>
  ___HTMLTAG_210__HTMLTAG_211___指標</strong>：Prometheus + kube-state-metrics + 節點導出器</li>
  ___HTMLTAG_214__HTMLTAG_215___日誌</strong>：Loki（帶有用於生產的物件儲存後端）</li>
  ___HTMLTAG_218__HTMLTAG_219___痕跡</strong>：Grafana 節奏</li>
  ___HTMLTAG_222__HTMLTAG_223___可視化</strong>：Grafana</li>
  ___HTMLTAG_226__HTMLTAG_227___收集器</strong>：Grafana Alloy（每個節點的守護程序集）</li>
  ___HTMLTAG_230__HTMLTAG_231___儀器標準</strong>：OpenTelemetry</li>
</ul>

<h3>架構流程</h3>

<p>此堆疊中的資料流如下：</p>

___程式碼區塊_3___

<p>該架構的優點在於所有視覺化都通過一扇門：Grafana。您可以在不離開 Grafana UI 的情況下從指標 → 日誌 → 追蹤進行深入分析，並且可以透過追蹤 ID 或時間範圍關聯資料。 </p>

<h2>kube-prometheus-stack Helm 圖表</h2><p>不是一一安裝每個元件，<strong>kube-prometheus-stack</strong> 是一個整合的一體化 Helm 圖表：</p>
<ul>
  <li>普羅米修斯運算子</li>
  <li>Prometheus 實例</li>
  <li>AlertManager</li>
  <li>Grafana</li>
  <li>kube-state-metrics__HTMLTAG_257___
  <li>節點導出器</li>
  <li>Kubernetes 的預設儀表板和警報規則__HTMLTAG_261___
</ul>

___程式碼區塊_4___

<p>開始使用的基本values.yaml檔案：</p>

___程式碼區塊_5___

<p>安裝 kube-prometheus-stack 後，您將擁有 Kubernetes 叢集的完整指標和警報。下一步是新增 Loki（日誌）和 Tempo（追蹤）以完成可觀察性堆疊。 </p>

<h2>摘要</h2>

<p>可觀察性不是一個可以在以後添加的功能 - 它需要從頭開始設計。 2026 年，OpenTelemetry 已成為無可爭議的標準，而採用 Grafana Alloy 的 PLG 堆疊是大多數 Kubernetes 團隊最現實的選擇。 </p>

<p>在接下來的課程中，我們將深入了解每個組件：</p>
<ul>
  ___HTMLTAG_274__HTMLTAG_275___第 29 課</strong>：Prometheus Operator、ServiceMonitor、PromQL、AlertManager</li>
  ___HTMLTAG_278__HTMLTAG_279___第 30 課</strong>：Loki、Tempo 與相關可觀察性</li>
  ___HTMLTAG_282__HTMLTAG_283___第 31 課</strong>：Kubernetes 除錯與故障排除</li>
  ___HTMLTAG_286__HTMLTAG_287___練習 7</strong>：部署整個堆疊並練習端對端</li>
</ul>