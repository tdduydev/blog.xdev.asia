---
id: 01970000-a1b2-7c03-d004-e5f6a7b8c0e1
title: "AIニュースダイジェスト 2026年4月5日：Microsoftが3つの新モデルを発表、Holo3がコンピューター使用のSoTAを更新、AnthropicがBiotechを4億ドルで買収"
slug: ai-news-digest-05-04-2026
excerpt: >-
  今週のAI業界は特に活発でした：MicrosoftがMAI基盤モデル3種（音声認識・音声生成・画像）を同時発表し、H CompanyのHolo3がOSWorldベンチマークで78.85%のSoTAを達成。Anthropicはバイオテックスタートアップを4億ドルで買収し、Claude CodeのサブスクリプションからOpenClawを締め出す決定を下しました。
featured_image: /images/blog/ban-tin-ai-05-04-2026.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-04-05T08:00:00.000000Z'
created_at: '2026-04-05T08:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI, slug: ai}, {name: News, slug: news}, {name: LLM, slug: llm}, {name: Microsoft, slug: microsoft}, {name: Anthropic, slug: anthropic}, {name: OpenAI, slug: openai}]
locale: ja
comments: []
---

過去72時間で、AI業界は重大なニュースが立て続けに舞い込みました。MicrosoftがGoogleやOpenAIより安価な3つの新しい基盤モデルを引っ提げてAIモデル競争に本格参入し、H CompanyはHolo3でコンピューター使用のSoTAを更新。AnthropicはBiotechスタートアップを4億ドルで買収する一方で、Claude CodeのサブスクリプションからOpenClawを締め出す決定が大きな論争を巻き起こしました。

---

## 📰 クイックサマリー

| イベント | 組織 | 日付 | 重要度 |
|---------|------|------|--------|
| MAI-Transcribe-1・MAI-Voice-1・MAI-Image-2の発表 | Microsoft | 4/2 | ⭐⭐⭐⭐⭐ |
| Holo3がOSWorldで78.85% SoTAを達成 | H Company | 4/1 | ⭐⭐⭐⭐⭐ |
| Coefficient Bioの買収——4億ドル | Anthropic | 4/3 | ⭐⭐⭐⭐ |
| Claude CodeがOpenClawを締め出し、追加料金を設定 | Anthropic | 4/4 | ⭐⭐⭐⭐ |
| COO・CMO・CEOが相次いで交代 | OpenAI | 4/3 | ⭐⭐⭐ |

---

## 1. Microsoftが3つのMAI基盤モデルを発表——「GoogleとOpenAIより安価」

2026年4月2日、Mustafa Suleyman氏が率いる**Microsoft AI**は、**Microsoft Foundry**と**MAI Playground**で利用可能な3つの新しい基盤モデルを発表しました。

- **MAI-Transcribe-1**: 音声テキスト変換モデル、**25言語**に対応。Azure Fast比**2.5倍**の処理速度を実現し、価格は**$0.36/時間**。
- **MAI-Voice-1**: 音声生成モデル。**1秒でわずか60秒の音声**を生成でき、カスタム音声の作成にも対応。価格は**$22/100万文字**から。
- **MAI-Image-2**: 画像・動画生成モデル。3月19日からMAI Playgroundでテスト公開されていたものが正式リリース。価格はテキスト入力**$5/100万トークン**、画像出力**$33/100万トークン**。

これら3つのモデルは、2025年11月に設立された**MAI Superintelligence Team**が開発した初の製品群です。Suleyman氏はこう述べています。「私たちはHumanist AIを構築しています——人間を中心に置き、人間が実際にコミュニケーションをとる方法に最適化されたAIです」

注目すべきは、MicrosoftがMAIをGoogleやOpenAIの同等モデルより低価格に設定しているという点です。これは明確な価格競争のシグナルです。Suleyman氏は同時に、MicrosoftがOpenAIとのパートナーシップを維持し続けると断言した上で、「これはあくまでも始まりです。今後さらに多くのモデルをリリースしていきます」と述べました。

この戦略は、Microsoftが単一のパートナーへの依存から脱却しようとする姿勢を反映しています。MicrosoftはOpenAIに**130億ドル以上**を投資してきましたが、独自の「バックアップスタック」の構築を進めているのは明らかです。

> **要点：** MicrosoftはもはやOpenAIの単なる再販業者ではありません——真に独立したAIラボへと変貌を遂げています。

---

## 2. Holo3——OSWorldで78.85%を達成し、コンピューター使用のSoTAを更新

2026年4月1日、**H Company**は最新のコンピューター使用モデル**Holo3**が**OSWorld-Verified**で**78.85%**を達成したと発表しました。これは現時点で最も厳格とされるデスクトップ自動化ベンチマークの新SoTAです。

Holo3の特徴：

- **350億のトータルパラメータ**ながら、推論時にはわずか**100億のパラメータのみがアクティブ**（MoE：Mixture of Expertsアーキテクチャ）
- 実際のデスクトップ環境で「見て、考えて、行動する」能力を持つ
- パラメータ数がはるかに多い競合モデルを上回る性能
- **Apache 2.0**ライセンス——HuggingFaceでウェイトを公開

Holo3の強みは**Agentic Learning Flywheel**にあります。これは3つの要素から成る専門的なトレーニングパイプラインです：合成ナビゲーションデータ、ドメイン外拡張、および精選された強化学習。H Companyはさらに**Synthetic Environment Factory**も構築しました——エンタープライズシステムを自動的に再現し、Eコマースソフトウェアやビジネスツール、コラボレーションプラットフォームなどの実際のシナリオでモデルをトレーニングする「工場」です。

**486のマルチステップタスク**で構成される**H Corporate Benchmarks**では、Holo3が複雑な多段階タスクを処理できることが示されています——例えば、PDFから価格を取得し、従業員の予算と照合した上で、各人への承認・却下の個別メールを送信するといったタスクです。

Holo3は現在、H Companyの**Inference API**からフリーティアで利用できます。

> **要点：** OSWorldで78.85%という数字は重要なマイルストーンです——コンピューター使用エージェントが、エンタープライズでの実用展開に足る信頼性のしきい値に近づいています。

---

## 3. Anthropicが4億ドルでCoefficient Bioを買収——創薬分野に大きな賭け

2026年4月3日、*The Information*と*Eric Newcomer*の報道によると、**Anthropic**は**Coefficient Bio**（ステルスモードのBiotech AIスタートアップ）を**株式4億ドル**で買収したことを確認しました。

Coefficient Bioはわずか**8ヶ月前**に**Samuel Stanton**氏と**Nathan C. Frey**氏——いずれもPrescient Design（Genentechの計算創薬部門）の元従業員——によって設立されました。約**10名**のチームでAIを活用した創薬と生物学研究の加速化に取り組んでいます。

この買収は、2025年10月にAnthropicが発表した**Claude for Life Sciences**——科学研究者をサポートするプラットフォーム——の延長線上にあります。Coefficient Bioのチーム全員がAnthropicの**ヘルス・ライフサイエンスチーム**に合流する予定です。

今回の取引で示唆される評価額（株式ベースとはいえ、1人あたり4,000万ドル）を考えると、これは非常に高額な「アクワイアハイア」です——DeepMind（AlphaFold）やIsomorphic Labsなどが先行するAI for bio/pharma領域への大きな賭けを示しています。

> **要点：** AnthropicはLLM・コーディングアシスタントの枠を超えて拡大を続けています——Biotech AIが新たなフロンティアです。

---

## 4. Anthropic vs OpenClaw：開発者争奪戦

2026年4月4日（本日）、**Anthropic**はClaude Codeのサブスクライバーに通知しました。4月4日の正午より、**サブスクリプション枠を使ってOpenClaw**などのサードパーティハーネス経由でClaudeを利用することが**できなくなります**。代わりに、別途**従量課金制**で支払う必要があります。

**OpenClaw**は非常に人気の高いオープンソースのコーディングツールです。Peter Steinberger氏が作成したもので、彼は最近[OpenClawを離れてOpenAIに入社しています](https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/)。

AnthropicのClaude Code責任者Boris Cherny氏は次のように説明しています。「サブスクリプションは、こうしたサードパーティツールの使用パターンを前提として設計されていませんでした」同社はサブスクライバーに対して全額返金を提供しています。

しかし、Steinberger氏はXで強く反発しました。「タイミングが面白いですね——まず彼らは人気の機能をいくつか自社のクローズドハーネスにコピーし、次にオープンソースを締め出す」同氏とボードメンバーのDave Morin氏がAnthropicを説得しようとしたものの、1週間の猶予を得るにとどまりました。

この出来事にはより広い背景があります。OpenAIは最近、開発者ツールに注力するためにSora Appを閉鎖しました——これはまさにClaude Codeが競合している市場です。AI開発者争奪戦は激化しており、Anthropicは明らかに自社プラットフォームからの収益を守ろうとしています。

> **要点：** オープンソースのツールと商用AIサブスクリプションが衝突しています——2026年を通じてホットなテーマになるでしょう。

---

## 5. OpenAIの幹部異動：COO・CMO退任、CEOは医療休暇

2026年4月3日、OpenAIは一連のエグゼクティブレベルの変更を発表しました。

- **Brad Lightcap**氏（COO）は新しい役割に移行し、複雑な取引や投資を含む**「スペシャルプロジェクト」**を率いることになりました。商業業務はDenise Dresser氏（Slackの元CEO、2025年末にCROとして入社）に引き継がれます。
- **Fidji Simo**氏（AGI Development CEO）は**神経免疫疾患**の治療のため、数週間の医療休暇を取ることを発表しました。この期間中、共同創業者でプレジデントの**Greg Brockman**氏が製品管理を担当します。
- **Kate Rouch**氏（CMO）はがんの回復に専念するため退任。OpenAIは新しいCMOを探しています。

OpenAIには全世界で**10億人近いユーザー**がおり、公式声明によれば「継続性とモメンタム」を持って運営されています。ただし、上位3名のエグゼクティブが同時に交代するのは——それぞれに合理的な説明があるとはいえ——注視すべきシグナルです。

> **要点：** OpenAIは重要なリーダーシップ移行期にあります——Brockman氏の製品管理への復帰が変化をもたらすかどうかを注目してください。

---

## 🔮 今週の分析

**Microsoftは真のAIラボへと変貌しました。** MAI Superintelligence Teamと、Google・OpenAIより低価格に設定された3つの新モデルにより、MicrosoftはもはやただのOpenAIのクラウドパートナーではありません。OpenAIパートナーシップを維持しながら独自開発も進めるデュアルトラック戦略は賢い選択です——特にOpenAI契約を再交渉してMicrosoftにより多くの自由度を確保した後は。

**コンピューター使用エージェントはプロダクション対応フェーズに突入しています。** Holo3の78.85% OSWorld達成と軽量アーキテクチャ（アクティブパラメータ100億）、Apache 2.0ライセンスは明確なシグナルです：今後6〜12ヶ月で、デスクトップワークフローを自動化できるエージェントがエンタープライズに広く普及するでしょう。これこそが真の「RPA 2.0」です。

**Anthropicは複数の戦線で同時に戦っています。** Biotechへの4億ドル投資、OpenClawとの対立、新しい政治PAC、そして4億ドルのプライベートマーケット取引——これは同社にとって非常に多忙な週でした。リスクは戦線を広げすぎることです。機会は、Biotech AIが爆発的に成長した場合（多くの予測が示す通り）、Anthropicが早期に足がかりを築いていることです。

---

## 📌 さらに読むべきリンク

- [Microsoft blog: 3 MAI models on Foundry](https://microsoft.ai/news/today-were-announcing-3-new-world-class-mai-models-available-in-foundry/) — Mustafa Suleyman氏からの公式発表
- [Holo3 on HuggingFace](https://huggingface.co/blog/Hcompany/holo3) — H Companyからの技術ブログ（トレーニングパイプラインの詳細）
- [TechCrunch: Anthropic buys Coefficient Bio](https://techcrunch.com/2026/04/03/anthropic-buys-biotech-startup-coefficient-bio-in-400m-deal-reports/) — 最初の報道
- [TechCrunch: Claude Code vs OpenClaw](https://techcrunch.com/2026/04/04/anthropic-says-claude-code-subscribers-will-need-to-pay-extra-for-openclaw-support/) — 全貌
- [TechCrunch: OpenAI executive shuffle](https://techcrunch.com/2026/04/03/openai-executive-shuffle-new-roles-coo-brad-lightcap-fidji-simo-kate-rouch/) — 人事変更の詳細

---

*AIニュースダイジェストはxdev.asiaで毎日更新されています。重要なAIニュースを見逃さないようにフォローしてください。*
