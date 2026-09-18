---
id: 019c9617-fb5e-71a4-b3a1-a77a7c225818
title: 第 1 課：PostgreSQL 高可用性概述
slug: bai-1-tong-quan-ve-postgresql-high-availability
description: 了解為什麼需要高可用性，比較流行的 HA 解決方案（Patroni、Repmgr、Pacemaker）並掌握 PostgreSQL HA 系統的整體架構。
duration_minutes: 110
is_free: true
video_url: null
sort_order: 1
section_title: 第 1 部分：概述與背景
course:
  id: 019c9617-fad7-7170-97f5-55c1940af2f5
  title: PostgreSQL 透過 Patroni 和 etcd 實現高可用性
  slug: postgresql-high-availability-voi-patroni-etcd
locale: zh-tw
---
<h2 id="m%E1%BB%A5c-ti%C3%AAu-b%C3%A0i-h%E1%BB%8Dc">課程目標___HTMLTAG_1__HTMLTAG_2___學完本課，您將：___HTMLTAG_3__HTMLTAG_4__HTMLTAG_5___理解為什麼高可用性 (HA) 對資料庫系統很重要SQL_HTMLTAG_6__HTMLTAG_7___ML_7_7_7___ML Patroni、Repmgr 和Pacemaker___HTMLTAG_10__HTMLTAG_11___了解 PostgreSQL 系統的整體架構HA___HTMLTAG_12__HTMLTAG_13__HTMLTAG_14__HTMLTAG_15___1。為什麼我們需要高可用性？ ___HTMLTAG_16__HTMLTAG_17___1.1。單點故障 (SPOF) 問題___HTMLTAG_18__HTMLTAG_19___在具有單一伺服器的傳統資料庫系統中：___HTMLTAG_20__HTMLTAG_21__HTMLTAG_22__HTMLTAG_23__HTMLTAG_24___單點故障(SPOF)___HTMLTAG_25__HTMLTAG_26______HTMLTAG_27__HTMLTAG_28__HTMLTAG_29___後果資料庫伺服器崩潰錯誤：___HTMLTAG_30__HTMLTAG_31__HTM LTAG_32__HTMLTAG_33__HTMLTAG_34___停機</strong>：應用程式無法存取資料___HTMLTAG_36__HTMLTAG_37__HTMLTAG_38___收入損失___HTMLTAG _39___：每一分鐘的停機時間都會造成數百萬美元的損失洞___HTMLTAG_40__HTMLTAG_41__HTMLTAG_42___聲譽損失</strong>：使用者無法使用服務___HTMLTAG_44__HTML TAG_45__HTMLTAG_46___資料遺失</strong>：如果沒有及時備份___HTMLTAG_48__HTMLTAG_49__HTMLTAG_50___1.2.停機的常見原因</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>原因__HTMLTAG_57___
<th>評分</th>
<th>影響</th>
</tr>
</thead>
<tbody>
<tr>
<td>硬體錯誤（磁碟、RAM、CPU）</td>
<td>30%</td>
<td>高</td>
</tr>
<tr>
<td>網路錯誤</td>
<td>20%</td>
<td>平均</td>
</tr>
<tr>
<td>軟體錯誤/bug__HTMLTAG_83___
<td>25%</td>
<td>高</td>
</tr>
<tr>
<td>維護有計畫__HTMLTAG_91___
<td>15%</td>
<td>可控</td>
</tr>
<tr>
<td>人為錯誤__HTMLTAG_99___
<td>10%</td>
<td>高</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="13-high-availability-l%C3%A0-g%C3%AC">1.3。什麼是高可用性？ ___HTMLTAG_109__HTMLTAG_110__HTMLTAG_111___高可用性 (HA)</strong> 是指系統在一個或多個元件發生故障時仍能保持連續運作的能力。 ___HTMLTAG_113__HTMLTAG_114__HTMLTAG_115___測量指標 HA：___HTMLTAG_116__HTMLTAG_117___
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>可用性</th>
<th>停機時間/年</th>
<th>停機時間/月</th>
<th>等級</th>
</tr>
</thead>
<tbody>
<tr>
<td>99%（2 個 9）</td>
<td>3.65 天</td>
<td>7.2 小時</td>
<td>低</td>
___HTML標籤_142___
<tr>
<td>99.9%（3 個九）</td>
<td>8.76 小時</td>
<td>43.2 分鐘</td>
<td>平均</td>
</tr>
<tr>
<td>99.99%（4 個九）</td>
<td>52.56 分鐘__HTMLTAG_157___
<td>4.32 分鐘__HTMLTAG_159___
<td>高</td>
</tr>
<tr>
<td>99.999%（5 個 9）</td>
<td>5.26 分鐘</td>
<td>25.9 秒</td>
<td>非常高</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="14-l%E1%BB%A3i-%C3%ADch-c%E1%BB%A7a-ha">1.4。 HA的好處____HTMLTAG_177__HTMLTAG_178__HTMLTAG_179___商業利益：___HTMLTAG_180__HTMLTAG_181__HTMLTAG_182__HTMLTAG_183___最大限度地減少停機時間與收入損失____HTMLTAG_184__HTMLTAG_185___提高系統可靠性____HTMLTAG_186__HTMLTAG_187___改善使用者經驗____HTMLTAG_188__HTMLTAG_189___滿足SLA（服務等級協定）____HTMLTAG_190__HTMLTAG_191__HTMLTAG_192__HTMLTAG_193___技術優勢：____HTMLTAG_194__HTMLTAG_195__HTMLTAG_196__HTMLTAG_194__HTMLTAG_195__HTMLTAG_196__HTMLTAG_194__HTMLTAG_195__HTMLTAG_196__HTMLTAG_197___當主問題轉移時自動9____零停機維護____HTMLTAG_200__HTMLTAG_201____載入讀取查詢___HTMLTAG_202__HTMLTAG_203___災難復原___HTMLTAG_204__HTMLTAG_205______20___HTMLTAG_206__HTMLTAG_20720202020___206__ PostgreSQL 的 HA 方法___HTMLTAG_210__HTMLTAG_211___2.1。日誌傳送（WAL 傳送）____HTMLTAG_212__HTMLTAG_213__HTMLTAG_214__HTMLTAG_215___<span style="white-space: pre-wrap;">_日誌傳送（WAL傳送）___HTMLTAG_217__HTMLTAG_218__HTMLTAG_219__HTMLTAG_220__HTMLTAG_221___如何操作工作原理：___HTMLTAG_222__HTMLTAG_223__HTMLTAG_2244__HTMLTAG _225___主伺服器寫入WAL（預先寫入日誌）檔案___HTMLTAG_226__HTMLTAG_227___WAL檔案複製到備用伺服器___HTMLTAG_228__HTMLTAG_229___備用伺服器重播WAL以同步資料___HTMLTAG_230__HTM LTAG_231__HTMLTAG_232__HTMLTAG_233___優點：___HTMLTAG_234__HTMLTAG_235__HTMLTAG_236__HTMLTAG_237___簡單，易於設定___HTMLTAG_238__HTMLTAG_239 ___資源消耗少原始___HTMLTAG_240__HTMLTAG_241__HTMLTAG_242__HTMLTAG_243___缺點：___HTMLTAG_244__HTMLTAG_245__HTMLTAG_246__HTMLTAG_247___復原時間目標(RTO) 高（分鐘 →小時）___HTMLTAG_248__HTMLTAG_249___無自動故障轉移___HTMLTAG_250__HTMLTAG_251___可能會發生資料遺失__HTMLTAG_252__HTMLTAG_253_____HT MLTAG_255__HTMLTAG_256___2.2.流複製___HTMLTAG_257__HTMLTAG_258__HTMLTAG_259___工作原理：___HTMLTAG_260__HTMLTAG_261__HTMLTAG_262__HTMLTAG_263_____HTMLTAG_262__HTMLTAG_263_____ WAL 即時記錄到備用____HTMLTAG_264__HTMLTAG_265___備用立即應用更改___HTMLTAG_266__HTMLTAG_267___備用可以提供讀取查詢（熱備用）</li></ul>___HTMLTAG_270HTMLTAG_2681HTMLTAG_269______HTMLTAG_270HTML (WAL運費）___HTMLTAG_274__HTMLTAG_275__HTMLTAG_276__HTMLTAG_277__HTMLTAG_278___優點：___HTMLTAG_279__HTMLTAG_280__HTMLTAG_281__HTMLTAG_279__HTMLTAG_280__HTMLTAG_281__HTMLTAG_282_______t; 1秒)____HTMLTAG_283__HTMLTAG_284___熱備可以服務讀取查詢____HTMLTAG_285__HTMLTAG_286___同步模式減少資料遺失__HTMLTAG_287__HTMLTAG_288__HTMLTAG_289__HTMLTAG_290____ TMLTAG_291__HTMLTAG_292__HTMLTAG_293__HTMLTAG_294___仍需要手動故障轉移____HTMLTAG_295__HTMLTAG_296___需要外部自動化工具____HTMLTAG_297__HTMLTAG_298__HTMLTAG_2998__HT.2998__HT。邏輯複製___HTMLTAG_300__HTMLTAG_301__HTMLTAG_302___工作原理：___HTMLTAG_303__HTMLTAG_304__HTMLTAG_305__HT MLTAG_306___在邏輯層級複製（表、行）___HTMLTAG_307__HTMLTAG_308___啟用選擇性複製資料___HTMLTAG_309__HTMLTAG_310___發布者→訂閱者模型___HTMLTAG_311__HTMLTAG_312__HTMLTAG_313__HTMLTAG_314___優點：___HTMLTAG_315__HTMLTAG_316__HTMLTAG_317__HTMLTAG_318___不同 PostgreSQL版本之間的複製___HTMLTAG_319__HTMLTAG_320____選擇性複製（某些表僅）____HTMLTAG_321__HTMLTAG_322____可實現多主機（使用BDR）___HTMLTAG_323__HTMLTAG_324__HTMLTAG_325__HTMLTAG_326___缺點：____HTMLTAG_327__HTMLTAG_328__HTMLTAG_329__HTMLTAG_330___開銷高於物理開銷複製___HTMLTAG_329__HTMLTAG_330___開銷高於物理開銷複製___MLTAGMLTAG132___主要HA解決方案（通常用於資料分發）___HTMLTAG_333__HTMLTAG_334__HTMLTAG_335___2.4。共享儲存(SAN)</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/shared-storage-san-c198e575.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">共享儲存(SAN)___HTMLTAG_341__HTML TAG_342__HTMLTAG_343__HTMLTAG_344__HTMLTAG_345___優點：___HTMLTAG_346__HTMLTAG_347__HTMLTAG_348__HTMLTAG_349___故障轉移很快（只需啟動PostgreSQL）____HTMLTAG_350__HTMLTAG_351___無資料損失____HTMLTAG_352__HTMLTAG_353__HTMLTAG_354__HTMLTAG_355______缺點：___HTMLTAG_356__HTMLTAG_357__58G_357__ TAG_359___昂貴（需要SAN基礎設施）___HTMLTAG_360__HTMLTAG_361___SAN成為單點失敗___HTMLTAG_362__HTMLTAG_3633___維護複雜___HTMLTAG_364__HTMLTAG_365__HTMLTAG____維護複雜___HTMLTAG_364__HTMLTAG_365__HTMLTAG____維護複雜___MLTAG_364__HTMLTAG_365__HTMLTAG____維護複雜___MLTAG_364__HTMLTAG_365__HTMLTAG____維護複雜___MLTAG_364__HTMLTAG_365__HTMLTAG____維護複雜___MLTAG_364__HTMLTAG_365__HTMLTAG____維護複雜__HTMLTAG_366373____。比較：Patroni、Repmgr 與 Pacemaker___HTMLTAG_368__HTMLTAG_369___3.1。 Patroni____HTMLTAG_370__HTMLTAG_371__HTMLTAG_372___功能：____HTMLTAG_373__HTMLTAG_374__HTMLTAG_375__HTMLTAG_376____基於Python____HTMLTAG_377__HTMLTAG_378___使用DCS（etcd、Consul、ZooKeeper）保存叢集狀態____HTMLTAG_379__HTMLTAG_380___用於管理的REST API___HTMLTAG_381__HTMLTAG_382___自動智慧故障轉移____HTMLTAG_383__HTMLTAG_384___基於範本設定___HTMLTAG_385__HTMLTAG_386__HTMLTAG_387__ HTMLTAG_388___優點：___HTMLTAG_389__HTMLTAG_390__HTMLTAG_391__HTMLTAG_392___✅易於安裝與設定映像___HTMLTAG_393__HTMLTAG_394___✅強大的REST API___HTMLTAG_395__HTMLTAG_396___✅與Kubernetes____HTMLTAG_397__HTMLTAG_398___✅ 活躍開發，大型社區__HTMLTAG_399__HTMLTAG_400___✅ 自動領導者選舉__HTMLTAG_399__HTMLTAG_400___✅ 自動領導者選舉__HTMLTAG_400___2____40___________捲動重啟，零停機更新___HTMLTAG_403__HTMLTAG_404__HTMLTAG_405__HTMLTAG_406___缺點要點：___HTMLTAG_407__HTMLTAG_408__HTMLTAG_409__HTMLTAG_407__HTMLTAG_408__HTMLTAG_409__HTMLTAG_410___❌取決於DCS（新增組件）___HTMLTAG_411__HTMLTAG_412___❌需要學習DCS（etcd/Consul）___HTMLTAG_413__HTMLTAG_414__HTMLTAG_415__HTMLTAG_416___使用適當的案例：______HTMLTAG_417__HTMLTAG_418__HTMLTAG_419__HTMLTAG_420___雲端原生應用程式___HTMLTAG_421__HTMLTAG_422___Kubernetes部署___HTML TAG_423__HTMLTAG_424___微服務架構___HTMLTAG_425__HTMLTAG_426___需要高自動化___HTMLTAG_427__HTMLTAG_428__HTMLTAG_429___3.2。 Repmgr___HTMLTAG_430__HTMLTAG_431__HTMLTAG_432___功能：___HTMLTAG_433__HTMLTAG_434__HTMLTAG_435__HTMLTAG_436___第二象限 (EnterpriseDB)的開源工具___HTMLTAG_437__HTMLTAG_438___獨立工具，無需DCS___HTMLTAG_439__HTMLTAG_440______投票見證節點____HTMLTAG_441__HTMLTAG_442___基於命令列仲裁投票見證節點____HTMLTAG_441__HTMLTAG_442___基於命令列的管理___HTMLTAG_443__HTMLTAG_444__HTMLTAG_445__HTMLTAG_446___優點：___HTMLTAG_447__HTMLTAG_448__HTMLTAG_449__HTMLTAG_450___✅否需新增外部 DCS___HTMLTAG_451__HTMLTAG_452___✅ 比 Patroni 簡單___HTMLTAG_453__HTMLTAG_454___✅ 良好的文件___HTMLTAG_455__HTMLTAG_456___✅ 良好的文件___HTMLTAG_455__HTMLTAG_456___✅成熟且穩定___HTMLTAG_457__HTMLTAG_458__HTMLTAG_459__HTMLTAG_460___缺點：___HTMLTAG_461__HTMLTAG_462__HTMLTAG_463__HTMLTAG_464___❌1自動化功能較少PatroniHTMLTAG_463__HTMLTAG_464___❌MLS_ML____ML API___HTMLTAG_467__HTMLTAG_468___❌較小的社區___HTMLTAG_469__HTMLTAG_470___❌複雜的故障轉移更多___HTMLTAG_471__HTMLTAG_472__HTMLTAG_473__HTMLTAG_471__HTMLTAG_472__HTMLTAG_473__HTMLTAG_474___ML_MLTAG1474___ML_MLTAGML_4741_ML TAG_476__HTMLTAG_477__HTMLTAG_478___傳統基礎設施___HTMLTAG_479__HTMLTAG_480___單一簡單，節點少___HTMLTAG_481__HTMLTAG_482___不想加入DCS___HTMLTAG_483__4MLTAG_483__4MLTAG848483_483__4MLTAG_483__4MLTAG8484853_483__4MLTAG_483__4MLTAG8484848483。 Pacemaker + Corosync____HTMLTAG_486__HTMLTAG_487__HTMLTAG_488___功能：____HTMLTAG_489__HTMLTAG_490__HTMLTAG_491 __HTMLTAG_492___高可用性叢集框架（Linux-HA）___HTMLTAG_493__HTMLTAG_494___管理多種類型的資源，而不僅僅是管理PostgreSQL___HTML TAG_495__HTMLTAG_496___投票仲裁機制___HTMLTAG_497__HTMLTAG_498___圍欄/STONITH以避免腦裂____HTMLTAG_499__HTMLT AG_500__HTMLTAG_501__HTMLTAG_502___優點分數：___HTMLTAG_503__HTMLTAG_504__HTMLTAG_505__HTMLTAG_506___✅成熟、經過生產驗證（20 年以上）___HTMLTAG_507__HTMLTAG_508___✅ 管理許多服務（PostgreSQL、Web 伺服器等）___HTMLTAG_509__HTMLTAG_510___✅ 強大的防護機制___HTMLTAG_511157G_51115支援共享儲存___HTMLTAG_513__HTMLTAG_514__HTMLTAG_515__HTMLTAG_516___缺點：____HTMLTAG_517__HTMLTAG_518__HTMLTAG_519__HTMLTAG_520___❌設定和設定非常複雜維護____HTMLTAG_521__HTMLTAG_522___❌學習曲線高____HTMLTAG_523__HTMLTAG_524___❌XML配置讀取困難___HTMLTAG_525__HTMLTAG_526___❌XML配置讀取困難___HTMLTAG_525__HTMLTAG_526___❌XML配置讀取困難___HTMLTAG_525__HTMLTAG_526___❌_錯誤___HTMLTAG_527__HTMLTAG_527__HTMLTAG_527___MLTAG G_528__HTMLTAG_529__HTMLTAG_530___用例適當案例：___HTMLTAG_531__HTMLTAG_532__HTMLTAG_533__HTMLTAG_534___企業環境____HTMLTAG_535__HTMLTAG_536___管理很多服务___HTMLTAG_537__HTMLTAG_538___具有共享存储（SAN）___HTMLTAG_539__HTMLTAG_540___团队有以下经验：起搏器___HTMLTAG_541__HTMLTAG_542__HTMLTAG_543___3.4。概覽比較表</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>標準</th>
<th>帕特羅尼</th>
<th>Repmgr</th>
<th>起搏器</th>
</tr>
</thead>
<tbody>
<tr>
___HTMLTAG_561__HTMLTAG_562___複雜性___HTMLTAG_563__HTMLTAG_564___
<td>平均</td>
<td>低</td>
<td>高</td>
</tr>
<tr>
___HTMLTAG_573__HTMLTAG_574___學習曲線___HTMLTAG_575__HTMLTAG_576___
<td>平均</td>
<td>低</td>
<td>非常高</td>
</tr>
<tr>
___HTMLTAG_585__HTMLTAG_586___設定時間___HTMLTAG_587__HTMLTAG_588___
<td>Nhanh</td>
<td>Nhanh</td>
<td>慢</td>
</tr>
<tr>
___HTMLTAG_597__HTMLTAG_598___自動故障轉移___HTMLTAG_599__HTMLTAG_600___
<td>✅ 非常好</td>
<td>✅ 好</td>
<td>✅ 非常好</td>
</tr>
<tr>
___HTMLTAG_609__HTMLTAG_610___REST API___HTMLTAG_611__HTMLTAG_612___
<td>✅ 是</td>
<td>❌ 否</td>
<td>❌ 否</td>
</tr>
<tr>
___HTMLTAG_621__HTMLTAG_622___Kubernetes 支援___HTMLTAG_623__HTMLTAG_624___
<td>✅ 非常好</td>
<td>⚠️ 有限</td>
<td>❌ 否</td>
</tr>
<tr>
___HTMLTAG_633__HTMLTAG_634___社群___HTMLTAG_635__HTMLTAG_636___
<td>⭐⭐⭐⭐⭐</td>
<td>⭐⭐⭐</td>
<td>⭐⭐⭐⭐</td>
</tr>
<tr>
___HTMLTAG_645__HTMLTAG_646___文檔___HTMLTAG_647__HTMLTAG_648___
<td>⭐⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐</td>
<td>⭐⭐⭐</td>
</tr>
<tr>
___HTMLTAG_657__HTMLTAG_658___依賴關係____HTMLTAG_659__HTMLTAG_660___
<td>DCS（etcd/Consul）</td>
<td>無</td>
<td>無</td>
</tr>
<tr>
___HTMLTAG_669__HTMLTAG_670___最適合___HTMLTAG_671__HTMLTAG_672___
<td>現代/雲</td>
<td>簡單設定</td>
<td>企業/綜合體</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="35-khuy%E1%BA%BFn-ngh%E1%BB%8B">3.5。推薦___HTMLTAG_684__HTMLTAG_685__HTMLTAG_686___選擇Patroni，如果：___HTMLTAG_687__HTMLTAG_688__HTMLTAG_689__HTMLTAG_690___在雲端或Kubernetes上部署_______MLG_691690___ API___HTMLTAG_693__HTMLTAG_694___團隊擁有現代經驗DevOps 工具___HTMLTAG_695__HTMLTAG_696___✅ <strong>這是目前最流行的選項___HTMLTAG_698__HTMLTAG_699___ML_MLTAG107070_MLTAG1_1] Repmgr if:___HTMLTAG_703__HTMLTAG_704__HTMLTAG_705__HTMLTAG_706___設定簡單，節點少(2-3)___HTMLTAG_707__HTMLTAG_708___不想依賴DCS___HTMLTAG_709__HTMLT AG_710___團隊熟悉PostgreSQL傳統工具____HTMLTAG_711__HTMLTAG_712__HTMLTAG_713__HTMLTAG_714___選擇起搏器，如果：___HTMLTAG_715__HTMLTAG_716__HTMLTAG_717__HTMLTAG_718___複雜的企業環境___HTMLTAG_719__HTMLTAG_720___Pacemaker基礎設施已可用___HTMLTAG_721__HTMLTAG_722___需要同時管理許多服務____HTMLTAG_723__HTMLTAG_724___可用共享儲存(SAN)___HTMLTAG_725__HTMLTAG_726__HTMLTAG_727__HTMLTAG_728___4。系統概述架構Patroni + etcd___HTMLTAG_729__HTMLTAG_730___4.1. 3節點叢集架構___HTMLTAG_731__HTMLTAG_732__HTMLTAG_733__HTMLTAG_734__HTMLTAG_735__HTMLTAG_733__HTMLTAG_734__HTMLTAG_735___系統概述架構Patroni +___ etcd___HTMLTAG_736__HTMLTAG_737__HTMLTAG_738__HTMLTAG_739___4.2.主要元件____HTMLTAG_740__HTMLTAG_741__HTMLTAG_742___PostgreSQL___HTMLTAG_743 __HTMLTAG_744__HTMLTAG_745__HTMLTAG_746___資料庫主引擎____HTMLTAG_747__HTMLTAG_748___一個節點為Leader（讀取/寫入）___HTMLTAG_749__HTMLTAG_750___其他節點為Replica （唯讀）___HTMLTAG_751__HTMLTAG_752___使用流複製來同步集___HTMLTAG_753__HTMLTAG_754__HTMLTAG_755__HTMLTAG_756___Patroni___HTMLTAG_757__HTMLTAGMLTAGMLTAG1758HTMLTAG157__HTMLTAGMLTAGMLTAG758生命週期管理____HTMLTAG_761__HTMLTAG_762____監控節點的運作狀況____HTMLTAG_763__HTMLTAG_764___執行自動故障轉移____HTMLTAG_765__HTMLTAG_766___公開 REST API (:8008) 來查詢叢集狀態____72____ML____ML_808) 來查詢讀取/寫入設定___HTMLTAG_769__HTMLTAG_770__HTMLTAG_771__HTMLTAG_772___etcd (DCS -分散式設定儲存)___HTMLTAG_773__HTMLTAG_774__HTMLTAG_775__HTMLTAG_776___儲存叢集狀態與設定___HTMLTAG_777__HTMLTA G_778___Leader選舉(決定哪個節點是Leader)___HTMLTAG_779__HTMLTAG_780___分散式鎖定機制___HTMLTAG_781__HTMLTAG_782__ _3個節點etcd形成法定人數（多數投票）____HTMLTAG_783__HTMLTAG_784__HTMLTAG_785__HTMLTAG_786___HAProxy（可選但建議）___ _HTMLTAG_787__HTMLTAG_788__HTMLTAG_789__HTMLTAG_790____負載平衡器___HTMLTAG_791__HTMLTAG_792___路由寫入流量→領導者___HTMLTAG_793__HTMLTAG_794___路由讀取流量→副本（循環）___HTMLTAG_795__HTMLTAG_796___健康檢查並在故障轉移時自動路由___HTMLTAG_797__HTMLTAG_798__HTMLTAG_799___4.3。活動流程___HTMLTAG_800__HTMLTAG_801__HTMLTAG_802___1。正常操作</strong></p><pre><code>1. Application gửi query → HAProxy
2. HAProxy kiểm tra health check
3. Route write → Leader, read → Replicas
4. Patroni trên mỗi node:
   - Gửi heartbeat vào etcd mỗi 10s
   - Update health status
   - Maintain leader lease
</code></pre><p><strong>2。領導失敗檢測</strong></p><pre><code>1. Node 1 (Leader) gặp sự cố → stop heartbeat
2. etcd phát hiện: leader lease expired (30s)
3. Patroni trên Node 2 và Node 3 nhận ra
4. Leader election được trigger
</code></pre><p><strong>3。自動故障轉移過程</strong></p><pre><code>Timeline: 0s  ──────────► 30s ──────► 45s ──────► 60s
          │              │           │            │
      Leader dies    etcd detects  New leader  Applications
                     lease expire   elected     reconnect
                                   (Node 2)
                                   
Node 1:   LEADER ──────► DOWN ──────────────────► STANDBY (sau khi recover)
Node 2:   REPLICA ─────────────────► LEADER ────► LEADER
Node 3:   REPLICA ──────────────────────────────► REPLICA
</code></pre><p><strong>4。故障轉移後___HTMLTAG_815__HTMLTAG_816__CODEBLOCK_3__HTMLTAG_817___4.4。重要情境___HTMLTAG_818__HTMLTAG_819__HTMLTAG_820___情境 1：計畫切換___HTMLTAG_821__HTMLTAG_822__CODEBLOCK_4______HTMLTAG_823__HTMLTAG_824___場景2：裂腦預防措施____HTMLTAG_825__HTMLTAG_826__CODEBLOCK_5__HTMLTAG_827__HTMLTAG_828____場景3：節點恢復____HTMLTAG_829__HTMLTAG_830__CODEBLOCK_63155。時間軸配置（重要參數）____HTMLTAG_832__CODEBLOCK_7__HTMLTAG_833__HTMLTAG_834___說明：____HTMLTAG_835__HTMLTAG_836__HTMLTAG_837__HTMLTAG_835__HTMLTAG_836__HTMLTAG_837__HTMLTAG_838__​​UttG_836__HTMLTAG_837__HTMLTAG_838__​​UttG_838__​​UttG____238__​​UttG____238_____每 30 秒租約一次，否則將被視為死亡___HTMLTAG_841__HTMLTAG_842__HTMLTAG_843___loop_wait: 10</code>: Patroni 每 10 秒檢查一次運行狀況___HTMLTAG_845__HTMLTAG_8461846 20-30 秒___HTMLTAG_847__HTMLTAG_848__HTMLTAG_849__HTMLTAG_850___5。摘要____HTMLTAG_851__HTMLTAG_852___要點____HTMLTAG_853__HTMLTAG_854__HTMLTAG_855__HTMLTAG_856___生產系統必須具備高可用性__HTMLTAG_857___，以減少停機時間和資料流遺失，複製停用+ 自動故障轉移</strong> 是 PostgreSQL 最受歡迎的 HA 方法____HTMLTAG_862__HTMLTAG_863__HTMLTAG_864___Patroni 是最佳選擇__HTMLTAG_865___ 对于大多数使用案例现代：____HTMLTAG_866__HTMLTAG_867____易于设置和维护____HTMLTAG_868__HTMLTAG_869____自动智能故障转移__HTMLTAG_870__HTMLTAG_871____REST强大的API__HT MLTAG_872__HTMLTAG_873____與雲端/K8s良好整合___HTMLTAG_874__HTMLTAG_875__HTMLTAG_876__HTMLTAG_877__HTMLTAG_878___3節點架構</strong>與Patroni + etcd提供：____HTMLTAG_880__HTMLTAG_881___自動故障轉移（RTO < 30秒）___HTMLTAG_882__HTMLTAG_883___同步複製實現零資料遺失___HTMLTAG_884__HTMLTAG_885___防止腦裂___HTMLTAG_886__HTMLTAG_887___讀取可擴充性工作負載___HTMLTAG_888__HTMLTAG889__ 90__HTMLTAG_891__HTMLTAG_892___作業____HTMLTAG_893__HTMLTAG_894__HTMLTAG_895___計算具有不同可用性等級（99%、99.9%、99.99%）的系統的停機時間___HTMLTAGTA_8961797622_____ HA 架構（節點數、資料中心、RTO/RPO 需求）___HTMLTAG_898__HTMLTAG_899___比較使用 HA 與接受業務停機之間的成本___HTMLTAG_900__HTMLTAG_901__HTMLTAG_902________2____MLTAG____30_______課程將深入探討<strong>_流式複製</strong> - PostgreSQL HA的基礎：___HTMLTAG_907__HTMLTAG_908__HTMLTAG_909___WAL的詳細運行機制___HTMLTAG_910__HTMLTAG_911____同步與異步複製____HTMLTAG_912__HTMLTAG_911____同步與異步複製____HTMLTAG_912__HTMLTAG_913___複製插槽____HTMLTAG_914__TAG______H TMLTAG_915___實驗室：手動複製設定____HTMLTAG_916__HTMLTAG_917__HTMLTAG_918__HTMLTAG_919___參考____HTMLTAG_920__HTMLTAG_921__HTMLTAG_922__HTMLTAG_920__HTMLTAG_921__HTMLTAG_922__HTMLTAGost_923_____官方文件 - 高可用性____HTMLTAG_924__HTMLTAG_925__HTMLTAG_926__HTMLTAG_927___Patroni GitHub 儲存庫____HTMLTAG_928__HTMLTAG_929__HTMLTAG_930__HTMLTAG_931_____文件___HTMLTAG_932__HTMLTAG_933__HTMLTAG_934__HTMLTAG_935___PostgreSQL 流複製___HTMLTAG_936__HTMLTAG_937__HTMLTAG_938___