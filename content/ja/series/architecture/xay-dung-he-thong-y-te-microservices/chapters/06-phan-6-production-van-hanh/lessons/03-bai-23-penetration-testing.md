---
id: 019e1a40-a123-7001-d001-f0a1b2c30123
title: 'レッスン 23: 侵入テストとセキュリティ評価'
slug: bai-23-penetration-testing
description: >-
  医療システムのセキュリティ テスト: 脆弱性スキャン (OWASP ZAP、Nuclei)、CI/CD での SAST/DAST/IAST
  統合、依存関係スキャン (Snyk、Dependabot)、PostgreSQL セキュリティ監査、Keycloak セキュリティ評価、API セキュリティ
  テスト、コンプライアンス スキャン、HIPAA 要件に従ったセキュリティ評価レポートの作成。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 23
section_title: 'パート 6: 生産と運用'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
---

## 1. 医療向けセキュリティテストの概要

![Penetration Testing Lifecycle — Planning, Discovery, Attack, Reporting, Remediation](/storage/uploads/2026/04/healthcare-pentest-lifecycle.webp)

＃＃＃１．１． Pentest ヘルスケア システムが異なるのはなぜですか?

医療システムのセキュリティテストには、従来のITシステムと比較して特別なアプローチが必要です。医療データには、病歴、遺伝コード、社会保険番号などの不変の情報が含まれているため、**ダークウェブ上で最も高い価値**があり、クレジット カードの 10 ～ 50 倍です。

![Healthcare Security Testing — Unique Challenges: Regulatory, Data Sensitivity, System Availability](/storage/uploads/2026/04/healthcare-pentest-constraints.webp)

|チャレンジ |詳細 |
|----------|----------|
| **規制遵守** | HIPAA §164、ISO 27799、政令 13/2023、リスク評価 |
| **データの機密性** | ePHI/PHI、遺伝、メンタルヘルス、薬物乱用 |
| **システムの可用性** | 24 時間 365 日の運用、人命に関わる業務、ダウンタイムなし、ER システム |

**制約:** 患者ケアを中断することはできません。実際の PHI にアクセス/公開することはできません。監査証跡を維持する必要があります。結果 = 法的証拠。合成データを使用してテストし、正式な認可を受ける必要があります (BAA 修正)。

＃＃＃１．２．医療セキュリティ テスト フレームワーク

![Healthcare Security Testing Lifecycle — 5 phases: Planning → Discovery → Attack → Reporting → Remediation](/storage/uploads/2026/04/healthcare-pentest-lifecycle.webp)

**5 フェーズ:**

1. **計画とスコープ** → 2. **検出と偵察** → 3. **攻撃シミュレーション** → 4. **レポートと証拠** → 5. **修復と再テスト**

**HIPAA マッピング:**

- §164.308(a)(8) — 評価 (必須)
- §164.312(a)(1) — アクセス制御の検証
- §164.312(e)(1) — 伝送セキュリティテスト
- §164.306(e) — リスク分析を更新

＃＃＃１．３．セキュリティテストの分類

|テストの種類 |説明 |ツール |いつ実行するか |
|:---|:---|:---|:---|
| **SAST** |静的アプリケーション セキュリティ テスト — ソース コード分析 | SonarQube、Semgrep、SpotBugs |各コミット/PR |
| **ダスト** |動的アプリケーションセキュリティテスト — アプリケーションの実行テスト | OWASP ZAP、Nuclei、げっぷスイート |各リリース |
| **IAST** |インタラクティブ — 実行時のエージェント |コントラストセキュリティ |統合テストを実行するとき |
| **SCA** |ソフトウェア構成分析 — 依存関係チェック | Snyk、Dependabot、Trivy |各コミット + スケジュール済み |
| **ペンテスト** |手動侵入テスト |マニュアル+ツール |四半期/年次 |
| **構成監査** |インフラストラクチャ構成のレビュー | CIS-CAT、Lynis、kube-bench |月刊 |

---

## 2. Quarkus の静的アプリケーション セキュリティ テスト (SAST)

＃＃＃２．１．ヘルスケア Java 用の SonarQube 構成

```yaml
# sonar-project.properties
sonar.projectKey=healthcare-microservices
sonar.projectName=Healthcare Microservices Platform
sonar.organization=hospital-dev

# Source
sonar.sources=src/main/java
sonar.tests=src/test/java
sonar.java.binaries=target/classes
sonar.java.test.binaries=target/test-classes

# Quality Gate — Healthcare (stricter than default)
sonar.qualitygate=Healthcare-Critical

# Healthcare-specific rules
sonar.issue.ignore.multicriteria=e1
sonar.issue.ignore.multicriteria.e1.ruleKey=java:S106
sonar.issue.ignore.multicriteria.e1.resourceKey=**/HealthCheckResource.java

# Coverage requirements
sonar.coverage.jacoco.xmlReportPaths=target/jacoco-report/jacoco.xml
```

```java
// Healthcare-specific SonarQube Custom Rules
// custom-rules/src/main/java/vn/xdev/sonar/healthcare/

/**
 * Rule: PHI Data Logging Prevention
 * Detects potential PHI leakage in log statements
 */
@Rule(
    key = "HealthcarePHILogging",
    name = "PHI Data Must Not Be Logged in Plaintext",
    description = "Prevents logging of PHI fields such as patient name, SSN, " +
                  "diagnosis, or medical record number in plaintext",
    priority = Priority.BLOCKER,
    tags = {"hipaa", "phi", "security"}
)
public class PHILoggingCheck extends IssuableSubscriptionVisitor {

    private static final Set<String> PHI_FIELD_PATTERNS = Set.of(
        "patientName", "patientId", "ssn", "socialSecurityNumber",
        "dateOfBirth", "dob", "diagnosis", "diagnosisCode",
        "medicalRecordNumber", "mrn", "insuranceId",
        "phoneNumber", "address", "email", "labResult",
        "prescription", "treatmentPlan", "geneticData"
    );

    @Override
    public List<Tree.Kind> nodesToVisit() {
        return List.of(Tree.Kind.METHOD_INVOCATION);
    }

    @Override
    public void visitNode(Tree tree) {
        MethodInvocationTree methodInvocation = (MethodInvocationTree) tree;
        
        if (isLoggingMethod(methodInvocation)) {
            Arguments arguments = methodInvocation.arguments();
            for (ExpressionTree arg : arguments) {
                if (containsPHIField(arg)) {
                    reportIssue(arg,
                        "Potential PHI data detected in log statement. " +
                        "Use PHI masking or remove the field. " +
                        "HIPAA §164.312(a)(1) — Access Control.");
                }
            }
        }
    }

    private boolean isLoggingMethod(MethodInvocationTree mit) {
        String methodName = mit.methodSymbol().name();
        return Set.of("info", "debug", "warn", "error", "trace", "log")
                   .contains(methodName);
    }

    private boolean containsPHIField(ExpressionTree expression) {
        String exprText = expression.toString().toLowerCase();
        return PHI_FIELD_PATTERNS.stream()
            .anyMatch(field -> exprText.contains(field.toLowerCase()));
    }
}
```

＃＃＃２．２．医療に関する Semgrep ルール

```yaml
# .semgrep/healthcare-rules.yaml
rules:
  # Rule 1: Detect unhashed PHI in database queries
  - id: healthcare-phi-in-query
    patterns:
      - pattern: |
          $QUERY = "... " + $PHI_VAR + " ...";
      - metavariable-regex:
          metavariable: $PHI_VAR
          regex: (?i)(patient|ssn|diagnosis|mrn|dob|insurance)
    message: >-
      Potential PHI concatenation in SQL query detected.
      Use parameterized queries to prevent SQL injection and PHI exposure.
      HIPAA §164.312(a)(1) violation risk.
    severity: ERROR
    languages: [java]
    metadata:
      category: security
      subcategory: hipaa
      confidence: HIGH

  # Rule 2: Detect PHI in HTTP responses without encryption
  - id: healthcare-phi-response-unencrypted
    patterns:
      - pattern: |
          Response.ok($DATA)
      - metavariable-regex:
          metavariable: $DATA
          regex: (?i).*(patient|diagnosis|labResult|prescription).*
      - pattern-not-inside: |
          @Encrypted
          ...
    message: >-
      PHI data returned in response without field-level encryption annotation.
      Consider using @EncryptedResponse for PHI fields.
    severity: WARNING
    languages: [java]

  # Rule 3: Detect hardcoded encryption keys
  - id: healthcare-hardcoded-crypto-key
    patterns:
      - pattern-either:
          - pattern: |
              SecretKeySpec($KEY, ...)
          - pattern: |
              new SecretKey(...)
      - pattern-not-inside: |
          ... = vault.getSecret(...)
          ...
    message: >-
      Encryption key appears to be hardcoded. Healthcare encryption keys
      must be managed by a KMS (HashiCorp Vault).
      HIPAA §164.312(a)(2)(iv) — Encryption and Decryption.
    severity: ERROR
    languages: [java]

  # Rule 4: Detect missing audit logging on PHI access
  - id: healthcare-phi-access-no-audit
    patterns:
      - pattern: |
          public $RETURN $METHOD(...) {
            ...
            $REPO.find$ENTITY(...);
            ...
          }
      - metavariable-regex:
          metavariable: $ENTITY
          regex: (?i)(Patient|Encounter|Observation|DiagnosticReport|MedicationRequest)
      - pattern-not-inside: |
          ...
          auditService.$LOG(...);
          ...
    message: >-
      PHI entity accessed without audit logging.
      All FHIR resource access must be audited per HIPAA §164.312(b).
    severity: ERROR
    languages: [java]
```

＃＃＃２．３． Quarkus 用 SpotBugs セキュリティ プラグイン

```xml
<!-- pom.xml — SpotBugs configuration -->
<plugin>
    <groupId>com.github.spotbugs</groupId>
    <artifactId>spotbugs-maven-plugin</artifactId>
    <version>4.8.6.5</version>
    <configuration>
        <effort>Max</effort>
        <threshold>Low</threshold>
        <failOnError>true</failOnError>
        <plugins>
            <plugin>
                <groupId>com.h3xstream.findsecbugs</groupId>
                <artifactId>findsecbugs-plugin</artifactId>
                <version>1.13.0</version>
            </plugin>
        </plugins>
        <excludeFilterFile>spotbugs-exclude.xml</excludeFilterFile>
    </configuration>
    <executions>
        <execution>
            <phase>verify</phase>
            <goals><goal>check</goal></goals>
        </execution>
    </executions>
</plugin>
```

---

## 3. 動的アプリケーション セキュリティ テスト (DAST)

＃＃＃３．１．ヘルスケア API 用の OWASP ZAP

```yaml
# zap-healthcare-scan.yaml — ZAP Automation Framework
---
env:
  contexts:
    - name: "Healthcare API"
      urls:
        - "https://api.hospital.local"
      includePaths:
        - "https://api.hospital.local/api/v1/.*"
      excludePaths:
        - "https://api.hospital.local/api/v1/health"
      authentication:
        method: "json"
        parameters:
          loginPageUrl: "https://keycloak.hospital.local/realms/hospital/protocol/openid-connect/token"
          loginRequestUrl: "https://keycloak.hospital.local/realms/hospital/protocol/openid-connect/token"
          loginRequestBody: >-
            grant_type=client_credentials
            &client_id=zap-scanner
            &client_secret={%env:ZAP_CLIENT_SECRET%}
        verification:
          method: "response"
          loggedInRegex: "\\Qaccess_token\\E"
      technology:
        include:
          - "Java"
          - "PostgreSQL"
          - "Linux"

  parameters:
    failOnError: true
    failOnWarning: false
    progressToStdout: true

jobs:
  # Step 1: OpenAPI Import
  - type: openapi
    parameters:
      apiUrl: "https://api.hospital.local/q/openapi"
      context: "Healthcare API"

  # Step 2: Active Scan with healthcare-specific policies
  - type: activeScan
    parameters:
      context: "Healthcare API"
      policy: "Healthcare-HIPAA"
      maxRuleDurationInMins: 5
      maxScanDurationInMins: 60
    policyDefinition:
      rules:
        # SQL Injection — critical for PHI databases
        - id: 40018
          name: "SQL Injection"
          strength: INSANE
          threshold: LOW

        # XSS — patient portals are targets
        - id: 40012
          name: "Cross Site Scripting (Reflected)"
          strength: HIGH
          threshold: LOW

        # IDOR — patient data isolation
        - id: 40035
          name: "Out of Band XSS"
          strength: HIGH
          threshold: MEDIUM

        # Path Traversal — access to config files
        - id: 6
          name: "Path Traversal"
          strength: HIGH
          threshold: LOW

        # SSRF — internal service access
        - id: 40046
          name: "Server Side Request Forgery"
          strength: HIGH
          threshold: LOW

  # Step 3: Specific healthcare checks
  - type: requestor
    parameters:
      # Test IDOR on patient endpoints
      requests:
        - url: "https://api.hospital.local/api/v1/patients/PAT-OTHER-001/records"
          method: "GET"
          name: "IDOR-Patient-Records"
          responseCodeAccept: "403"

        - url: "https://api.hospital.local/api/v1/patients/PAT-OTHER-001/lab-results"
          method: "GET"
          name: "IDOR-Lab-Results"
          responseCodeAccept: "403"

  # Step 4: Report generation
  - type: report
    parameters:
      template: "sarif-json"
      reportDir: "/zap/reports"
      reportFile: "healthcare-zap-report"
    risks:
      - high
      - medium
      - low
      - info
```

＃＃＃３．２．医療固有の DAST テスト ケース

```java
// SecurityTestSuite.java — Integration tests for healthcare security
@QuarkusTest
@TestSecurity(user = "dr.nguyen", roles = {"doctor"})
public class HealthcareSecurityTestSuite {

    @Inject
    SecurityTestClient securityClient;

    // ================================================================
    // IDOR Tests — Insecure Direct Object Reference
    // ================================================================
    
    /**
     * Test: Bác sĩ A không thể xem bệnh án của bệnh nhân 
     * thuộc bác sĩ B (khác khoa)
     */
    @Test
    @TestSecurity(user = "dr.nguyen", roles = {"doctor"},
        attributes = @SecurityAttribute(key = "department", value = "cardiology"))
    void testIDOR_doctorCannotAccessOtherDepartmentPatient() {
        // Patient thuộc khoa Thần kinh, dr.nguyen thuộc khoa Tim mạch
        Response response = given()
            .header("Authorization", "Bearer " + getTokenForDrNguyen())
            .when()
            .get("/api/v1/patients/PAT-NEURO-001/medical-records")
            .then()
            .statusCode(403)
            .extract().response();

        // Verify audit log recorded the access attempt
        AuditEntry audit = auditService.getLatestEntry();
        assertThat(audit.getAction()).isEqualTo("ACCESS_DENIED");
        assertThat(audit.getResourceType()).isEqualTo("MedicalRecord");
        assertThat(audit.getReason()).contains("department_mismatch");
    }

    /**
     * Test: Bệnh nhân A không thể xem bệnh án bệnh nhân B
     */
    @Test
    @TestSecurity(user = "patient-001", roles = {"patient"})
    void testIDOR_patientCannotAccessOtherPatientRecords() {
        given()
            .when()
            .get("/api/v1/patients/PAT-002/records")
            .then()
            .statusCode(403);
    }

    // ================================================================
    // Injection Tests
    // ================================================================
    
    /**
     * Test: SQL Injection trên search endpoint
     */
    @Test
    void testSQLInjection_patientSearch() {
        String[] payloads = {
            "' OR '1'='1",
            "'; DROP TABLE patients; --",
            "' UNION SELECT * FROM patients --",
            "1' AND (SELECT COUNT(*) FROM pg_tables) > 0 --"
        };

        for (String payload : payloads) {
            given()
                .queryParam("name", payload)
                .when()
                .get("/api/v1/patients/search")
                .then()
                .statusCode(anyOf(is(400), is(200)))
                .body("$", not(hasKey("pg_tables")))
                .body("size()", lessThanOrEqualTo(0));
        }
    }

    /**
     * Test: XSS trong patient notes
     */
    @Test
    void testXSS_patientNotes() {
        String[] xssPayloads = {
            "<script>alert('xss')</script>",
            "<img src=x onerror=alert(1)>",
            "javascript:alert(document.cookie)",
            "<svg/onload=alert('XSS')>"
        };

        for (String payload : xssPayloads) {
            PatientNote note = new PatientNote();
            note.setContent(payload);

            String responseBody = given()
                .contentType(ContentType.JSON)
                .body(note)
                .when()
                .post("/api/v1/patients/PAT-001/notes")
                .then()
                .statusCode(201)
                .extract().body().asString();

            // Verify output encoding
            assertThat(responseBody).doesNotContain("<script>");
            assertThat(responseBody).doesNotContain("onerror=");
            assertThat(responseBody).doesNotContain("javascript:");
        }
    }

    // ================================================================
    // Authentication & Authorization Tests
    // ================================================================
    
    /**
     * Test: Expired token rejected
     */
    @Test
    void testAuth_expiredTokenRejected() {
        String expiredToken = generateExpiredToken();

        given()
            .header("Authorization", "Bearer " + expiredToken)
            .when()
            .get("/api/v1/patients/PAT-001")
            .then()
            .statusCode(401);
    }

    /**
     * Test: Token with tampered claims rejected
     */
    @Test
    void testAuth_tamperedTokenRejected() {
        String validToken = getValidToken();
        // Modify role claim from "nurse" to "admin"
        String tamperedToken = tamperTokenClaim(validToken, "roles", "admin");

        given()
            .header("Authorization", "Bearer " + tamperedToken)
            .when()
            .get("/api/v1/admin/users")
            .then()
            .statusCode(401); // Signature verification fails
    }

    /**
     * Test: Missing MFA for sensitive operations
     */
    @Test
    @TestSecurity(user = "dr.nguyen", roles = {"doctor"})
    void testAuth_sensitiveOpRequiresMFA() {
        // Prescription creation requires MFA (amr claim must include "mfa")
        String tokenWithoutMFA = getTokenWithoutMFAClaim();

        given()
            .header("Authorization", "Bearer " + tokenWithoutMFA)
            .contentType(ContentType.JSON)
            .body(createPrescriptionPayload())
            .when()
            .post("/api/v1/prescriptions")
            .then()
            .statusCode(403)
            .body("error", containsString("MFA_REQUIRED"));
    }

    // ================================================================
    // Data Leakage Tests
    // ================================================================
    
    /**
     * Test: Error responses don't leak sensitive info
     */
    @Test
    void testDataLeakage_errorResponseSanitized() {
        Response response = given()
            .queryParam("id", "invalid-uuid-format")
            .when()
            .get("/api/v1/patients/not-a-uuid")
            .then()
            .statusCode(400)
            .extract().response();

        String body = response.body().asString();
        
        // Must not expose stack traces
        assertThat(body).doesNotContain("java.lang");
        assertThat(body).doesNotContain("at io.quarkus");
        assertThat(body).doesNotContain("SQLException");
        // Must not expose database details
        assertThat(body).doesNotContain("postgresql");
        assertThat(body).doesNotContain("pg_catalog");
        assertThat(body).doesNotContain("SELECT");
    }

    /**
     * Test: Headers don't leak technology info
     */
    @Test
    void testDataLeakage_noTechInfoInHeaders() {
        Response response = given()
            .when()
            .get("/api/v1/health")
            .then()
            .extract().response();

        Headers headers = response.headers();
        
        assertThat(headers.hasHeaderWithName("X-Powered-By")).isFalse();
        assertThat(headers.hasHeaderWithName("Server")).isFalse();
        
        // Security headers must be present
        assertThat(headers.getValue("X-Content-Type-Options"))
            .isEqualTo("nosniff");
        assertThat(headers.getValue("X-Frame-Options"))
            .isEqualTo("DENY");
        assertThat(headers.getValue("Strict-Transport-Security"))
            .isNotNull();
    }
}
```

＃＃＃３．３．ヘルスケア用の核テンプレート

```yaml
# nuclei-templates/healthcare/hipaa-checks.yaml
id: hipaa-transmission-security
info:
  name: HIPAA Transmission Security Check
  author: xdev-security
  severity: critical
  description: >-
    Verify TLS configuration meets HIPAA §164.312(e)(1)
    Transmission Security requirements.
  tags: hipaa,tls,healthcare
  classification:
    cwe-id: CWE-319
    cvss-metrics: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N

requests:
  - method: GET
    path:
      - "{{BaseURL}}"
    matchers-condition: or
    matchers:
      # Fail if using weak TLS
      - type: dsl
        name: weak-tls
        dsl:
          - "ssl_version == 'tls10' || ssl_version == 'tls11'"
        condition: or

      # Fail if no HSTS header
      - type: word
        name: missing-hsts
        words:
          - "Strict-Transport-Security"
        negative: true
        part: header

---
id: hipaa-session-timeout
info:
  name: HIPAA Auto Logoff Check
  author: xdev-security
  severity: high
  description: >-
    Verify session timeout is configured (max 15 minutes for healthcare).
    HIPAA §164.312(a)(2)(iii) — Automatic Logoff.
  tags: hipaa,session,healthcare

requests:
  - method: POST
    path:
      - "{{BaseURL}}/realms/hospital/protocol/openid-connect/token"
    body: "grant_type=client_credentials&client_id={{client_id}}&client_secret={{client_secret}}"
    headers:
      Content-Type: application/x-www-form-urlencoded

    extractors:
      - type: json
        name: access_token
        json:
          - ".access_token"

    matchers:
      - type: json
        json:
          - ".expires_in"
        condition: and
        # Session > 900 seconds (15 min) = violation
        dsl:
          - "expires_in > 900"
```

---

## 4. ソフトウェア構成分析 (SCA)

＃＃＃４．１． Quarkus Healthcare の依存関係スキャン

```yaml
# .github/workflows/healthcare-security-scan.yml
name: Healthcare Security Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    # Daily scan at midnight — catch new CVEs
    - cron: '0 0 * * *'

jobs:
  sca-scan:
    name: Dependency Vulnerability Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'
          # Healthcare: fail on any HIGH or CRITICAL
          exit-code: '1'

      - name: Upload Trivy results
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Snyk Security Scan
        uses: snyk/actions/maven@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: >-
            --severity-threshold=high
            --policy-path=.snyk
            --json-file-output=snyk-results.json

      - name: Check for known healthcare CVEs
        run: |
          echo "=== Checking critical healthcare dependencies ==="
          
          # Check Keycloak version for known auth bypass CVEs
          KC_VERSION=$(mvn help:evaluate -Dexpression=keycloak.version -q -DforceStdout)
          echo "Keycloak version: $KC_VERSION"
          
          # Check PostgreSQL driver
          PG_VERSION=$(mvn help:evaluate -Dexpression=postgresql.version -q -DforceStdout)
          echo "PostgreSQL driver version: $PG_VERSION"
          
          # Check BouncyCastle (crypto library)
          BC_VERSION=$(mvn dependency:tree | grep -o 'bcprov-jdk[0-9]*:[0-9.]*' | head -1)
          echo "BouncyCastle version: $BC_VERSION"
          
          # Check for HAPI FHIR CVEs
          HAPI_VERSION=$(mvn help:evaluate -Dexpression=hapi.fhir.version -q -DforceStdout)
          echo "HAPI FHIR version: $HAPI_VERSION"

  sast-scan:
    name: Static Analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Semgrep with healthcare rules
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/java
            p/security-audit
            .semgrep/healthcare-rules.yaml

      - name: SonarQube Analysis
        uses: SonarSource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        with:
          args: >-
            -Dsonar.qualitygate.wait=true

  dast-scan:
    name: Dynamic Security Testing
    runs-on: ubuntu-latest
    needs: [sca-scan, sast-scan]
    steps:
      - uses: actions/checkout@v4

      - name: Start Healthcare Services
        run: docker compose -f docker-compose.test.yml up -d

      - name: Wait for services
        run: |
          timeout 120 bash -c 'until curl -sf http://localhost:8080/q/health; do sleep 2; done'

      - name: Run OWASP ZAP
        uses: zaproxy/action-api-scan@v0.9.0
        with:
          target: 'http://localhost:8080/q/openapi'
          rules_file_name: 'zap-healthcare-rules.tsv'
          cmd_options: '-c zap-healthcare-scan.yaml'

      - name: Run Nuclei Healthcare Checks
        uses: projectdiscovery/nuclei-action@main
        with:
          target: 'http://localhost:8080'
          templates: 'nuclei-templates/healthcare/'
          flags: '-severity critical,high -json -output nuclei-results.json'
```

＃＃＃４．２． SBOMの生成

```yaml
# Generate Software Bill of Materials for healthcare compliance
- name: Generate SBOM (CycloneDX)
  run: |
    mvn org.cyclonedx:cyclonedx-maven-plugin:makeBom \
      -DincludeLicenseText=true \
      -DoutputFormat=json \
      -DoutputName=healthcare-sbom

- name: Validate SBOM completeness
  run: |
    # Healthcare SBOM must include all transitive dependencies
    COMPONENT_COUNT=$(jq '.components | length' target/healthcare-sbom.json)
    echo "Total components in SBOM: $COMPONENT_COUNT"
    
    # Verify critical libraries are documented
    jq -r '.components[] | select(
      .group == "io.quarkus" or
      .group == "org.keycloak" or
      .group == "org.postgresql" or
      .group == "org.bouncycastle"
    ) | "\(.group):\(.name):\(.version)"' target/healthcare-sbom.json
```

---

## 5. PostgreSQL セキュリティ監査

＃＃＃５．１． PostgreSQL セキュリティ評価スクリプト

```sql
-- postgresql-security-audit.sql
-- Comprehensive security audit for healthcare PostgreSQL instances

-- ================================================================
-- 1. Authentication & Connection Security
-- ================================================================

-- Check authentication methods
SELECT 
    line_number,
    type,
    database,
    user_name,
    address,
    auth_method,
    CASE 
        WHEN auth_method = 'trust' THEN '❌ CRITICAL — trust = no authentication!'
        WHEN auth_method = 'md5' THEN '⚠️ WARNING — md5 is weak, use scram-sha-256'
        WHEN auth_method = 'password' THEN '❌ CRITICAL — plaintext password!'
        WHEN auth_method = 'scram-sha-256' THEN '✅ OK'
        WHEN auth_method = 'cert' THEN '✅ EXCELLENT — certificate auth'
        ELSE '⚠️ Review required'
    END AS assessment
FROM pg_hba_file_rules
ORDER BY line_number;

-- Check SSL status
SELECT 
    name, 
    setting,
    CASE
        WHEN name = 'ssl' AND setting = 'on' THEN '✅ SSL enabled'
        WHEN name = 'ssl' AND setting = 'off' THEN '❌ CRITICAL — SSL disabled! HIPAA violation'
        WHEN name = 'ssl_min_protocol_version' AND setting IN ('TLSv1', 'TLSv1.1') 
            THEN '❌ Weak TLS version'
        WHEN name = 'ssl_min_protocol_version' AND setting = 'TLSv1.2' THEN '✅ TLS 1.2+'
        WHEN name = 'ssl_ciphers' THEN '⚠️ Review cipher suite'
        ELSE setting
    END AS assessment
FROM pg_settings
WHERE name IN (
    'ssl', 'ssl_min_protocol_version', 'ssl_ciphers',
    'ssl_cert_file', 'ssl_key_file', 'ssl_ca_file'
);

-- ================================================================
-- 2. Role & Privilege Audit
-- ================================================================

-- Superuser accounts (should be minimal)
SELECT 
    rolname,
    rolsuper,
    rolcreaterole,
    rolcreatedb,
    rolbypassrls,
    rolvaliduntil,
    CASE 
        WHEN rolsuper THEN '❌ SUPERUSER — minimize these!'
        WHEN rolbypassrls THEN '❌ BYPASSES RLS — critical for healthcare!'
        WHEN rolcreaterole THEN '⚠️ Can create roles'
        ELSE '✅ OK'
    END AS assessment
FROM pg_roles
WHERE rolname NOT LIKE 'pg_%'
ORDER BY rolsuper DESC, rolcreaterole DESC;

-- Check roles that bypass RLS (critical for healthcare)
SELECT rolname, rolbypassrls
FROM pg_roles
WHERE rolbypassrls = true
  AND rolname NOT LIKE 'pg_%';
-- Expected: Only postgres superuser should bypass RLS

-- ================================================================
-- 3. Row-Level Security Status
-- ================================================================

-- Check which tables have RLS enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity AS rls_enabled,
    CASE
        WHEN tablename IN ('patients', 'medical_records', 'lab_results', 
                           'prescriptions', 'encounters', 'observations',
                           'diagnostic_reports')
             AND rowsecurity = false
        THEN '❌ CRITICAL — PHI table without RLS!'
        WHEN rowsecurity = true THEN '✅ RLS enabled'
        ELSE '— Non-PHI table'
    END AS assessment
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY rls_enabled, schemaname, tablename;

-- Check RLS policies
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual AS using_expression,
    with_check AS check_expression
FROM pg_policies
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY schemaname, tablename, policyname;

-- ================================================================
-- 4. Encryption Audit
-- ================================================================

-- Check if pgcrypto is installed
SELECT 
    extname,
    extversion,
    '✅ Encryption extension available' AS status
FROM pg_extension
WHERE extname IN ('pgcrypto', 'pgsodium');

-- Find potentially unencrypted PHI columns
SELECT 
    c.table_schema,
    c.table_name,
    c.column_name,
    c.data_type,
    CASE
        WHEN c.column_name IN ('ssn', 'social_security_number', 'insurance_id',
                                'diagnosis_code', 'diagnosis_text',
                                'genetic_data', 'mental_health_notes',
                                'substance_abuse_notes', 'hiv_status')
             AND c.data_type NOT IN ('bytea')
        THEN '❌ Sensitive field may need column encryption'
        ELSE '—'
    END AS assessment
FROM information_schema.columns c
WHERE c.table_schema NOT IN ('pg_catalog', 'information_schema')
  AND c.column_name ~* '(ssn|diagnosis|genetic|mental|substance|hiv|insurance)'
ORDER BY c.table_schema, c.table_name;

-- ================================================================
-- 5. Audit Logging (pgAudit)
-- ================================================================

-- Check pgAudit configuration
SELECT 
    name, 
    setting,
    CASE
        WHEN name = 'pgaudit.log' AND setting = 'none' 
            THEN '❌ Audit logging disabled!'
        WHEN name = 'pgaudit.log' AND setting LIKE '%read%' 
            THEN '✅ Read audit enabled'
        WHEN name = 'pgaudit.log_relation' AND setting = 'on' 
            THEN '✅ Relation-level audit'
        ELSE setting
    END AS assessment
FROM pg_settings
WHERE name LIKE 'pgaudit%';

-- ================================================================
-- 6. Connection & Session Security
-- ================================================================

-- Active connections audit
SELECT 
    pid,
    usename,
    client_addr,
    ssl,
    application_name,
    state,
    query_start,
    CASE
        WHEN ssl = false THEN '❌ Non-SSL connection!'
        WHEN usename = 'postgres' THEN '⚠️ Direct superuser connection'
        ELSE '✅ OK'
    END AS assessment
FROM pg_stat_ssl
JOIN pg_stat_activity USING (pid)
WHERE pid <> pg_backend_pid()
ORDER BY ssl, usename;

-- Password expiry check
SELECT 
    rolname,
    rolvaliduntil,
    CASE
        WHEN rolvaliduntil IS NULL THEN '⚠️ No password expiry set'
        WHEN rolvaliduntil < NOW() THEN '❌ Password expired!'
        WHEN rolvaliduntil < NOW() + INTERVAL '30 days' THEN '⚠️ Expiring soon'
        ELSE '✅ OK'
    END AS assessment
FROM pg_roles
WHERE rolcanlogin = true
  AND rolname NOT LIKE 'pg_%'
ORDER BY rolvaliduntil;
```

---

## 6. Keycloakのセキュリティ評価

＃＃＃６．１． Keycloak構成の監査

```java
// KeycloakSecurityAudit.java
// Automated Keycloak security assessment for healthcare

@ApplicationScoped
public class KeycloakSecurityAuditor {

    @Inject
    Keycloak keycloakAdmin;

    @ConfigProperty(name = "keycloak.realm")
    String realmName;

    /**
     * Comprehensive Keycloak security audit for healthcare realm
     */
    public SecurityAuditReport auditRealm() {
        var report = new SecurityAuditReport();
        RealmRepresentation realm = keycloakAdmin.realm(realmName).toRepresentation();

        // 1. Brute Force Protection
        auditBruteForceProtection(realm, report);

        // 2. Password Policy
        auditPasswordPolicy(realm, report);

        // 3. Session Configuration
        auditSessionConfig(realm, report);

        // 4. Token Configuration
        auditTokenConfig(realm, report);

        // 5. Client Security
        auditClientSecurity(report);

        // 6. MFA Configuration
        auditMFAConfig(realm, report);

        // 7. CORS & Security Headers
        auditSecurityHeaders(report);

        return report;
    }

    private void auditBruteForceProtection(RealmRepresentation realm, 
                                            SecurityAuditReport report) {
        if (!realm.isBruteForceProtected()) {
            report.addCritical("BRUTE_FORCE",
                "Brute force protection is DISABLED. " +
                "Healthcare systems must prevent credential stuffing attacks. " +
                "HIPAA §164.312(d) — Person or Entity Authentication.");
        } else {
            if (realm.getMaxFailureWaitSeconds() < 900) { // 15 min
                report.addWarning("BRUTE_FORCE_WAIT",
                    "Lockout duration is less than 15 minutes. " +
                    "Healthcare recommendation: 15-30 minute lockout.");
            }
            if (realm.getFailureFactor() > 5) {
                report.addWarning("BRUTE_FORCE_THRESHOLD",
                    "Failure threshold is > 5. " +
                    "Healthcare recommendation: max 5 failed attempts.");
            }
        }
    }

    private void auditPasswordPolicy(RealmRepresentation realm, 
                                      SecurityAuditReport report) {
        String policy = realm.getPasswordPolicy();
        if (policy == null || policy.isEmpty()) {
            report.addCritical("PASSWORD_POLICY",
                "No password policy configured! " +
                "HIPAA requires strong password controls.");
            return;
        }

        Map<String, String> policies = parsePasswordPolicy(policy);

        // Minimum length
        int minLength = Integer.parseInt(policies.getOrDefault("length", "0"));
        if (minLength < 12) {
            report.addWarning("PASSWORD_LENGTH",
                "Password minimum length is " + minLength + 
                ". Healthcare recommendation: 12+ characters.");
        }

        // Password history
        if (!policies.containsKey("passwordHistory")) {
            report.addWarning("PASSWORD_HISTORY",
                "Password history not enforced. Users can reuse old passwords.");
        }

        // Complexity requirements
        if (!policies.containsKey("upperCase") || !policies.containsKey("specialChars")) {
            report.addWarning("PASSWORD_COMPLEXITY",
                "Missing complexity requirements (uppercase, special chars).");
        }
    }

    private void auditSessionConfig(RealmRepresentation realm, 
                                     SecurityAuditReport report) {
        // HIPAA §164.312(a)(2)(iii) — Automatic Logoff
        int ssoSessionIdle = realm.getSsoSessionIdleTimeout();
        int ssoSessionMax = realm.getSsoSessionMaxLifespan();

        if (ssoSessionIdle > 900) { // 15 minutes
            report.addCritical("SESSION_IDLE",
                "SSO session idle timeout is " + (ssoSessionIdle / 60) + " minutes. " +
                "HIPAA requires auto-logoff. Healthcare max: 15 minutes.");
        }

        if (ssoSessionMax > 28800) { // 8 hours
            report.addWarning("SESSION_MAX",
                "SSO session max lifespan is " + (ssoSessionMax / 3600) + " hours. " +
                "Healthcare recommendation: max 8 hours (shift duration).");
        }
    }

    private void auditTokenConfig(RealmRepresentation realm, 
                                   SecurityAuditReport report) {
        int accessTokenLifespan = realm.getAccessTokenLifespan();
        
        if (accessTokenLifespan > 300) { // 5 minutes
            report.addWarning("TOKEN_LIFESPAN",
                "Access token lifespan is " + (accessTokenLifespan / 60) + " minutes. " +
                "Healthcare recommendation: 5 minutes max.");
        }
    }

    private void auditClientSecurity(SecurityAuditReport report) {
        List<ClientRepresentation> clients = keycloakAdmin.realm(realmName)
            .clients().findAll();

        for (ClientRepresentation client : clients) {
            if (client.isServiceAccountsEnabled() && client.isPublicClient()) {
                report.addCritical("CLIENT_PUBLIC_SA",
                    "Client '" + client.getClientId() + "' is public AND has " +
                    "service accounts. This is a severe misconfiguration.");
            }

            if ("*".equals(String.join(",", 
                    client.getRedirectUris() != null ? client.getRedirectUris() : List.of()))) {
                report.addCritical("CLIENT_REDIRECT_WILDCARD",
                    "Client '" + client.getClientId() + "' has wildcard redirect URI. " +
                    "This enables open redirect attacks.");
            }

            if (!client.isFullScopeAllowed() == false && 
                client.getDefaultClientScopes() != null &&
                client.getDefaultClientScopes().size() > 10) {
                report.addWarning("CLIENT_EXCESSIVE_SCOPES",
                    "Client '" + client.getClientId() + "' has many default scopes. " +
                    "Apply principle of least privilege.");
            }
        }
    }

    private void auditMFAConfig(RealmRepresentation realm, 
                                 SecurityAuditReport report) {
        // Check if OTP is available
        List<AuthenticationFlowRepresentation> flows = keycloakAdmin
            .realm(realmName).flows().getFlows();

        boolean hasMFA = flows.stream()
            .anyMatch(f -> f.getAlias().toLowerCase().contains("otp") ||
                          f.getAlias().toLowerCase().contains("mfa") ||
                          f.getAlias().toLowerCase().contains("webauthn"));

        if (!hasMFA) {
            report.addCritical("MFA_MISSING",
                "No MFA authentication flow detected. " +
                "Healthcare systems handling ePHI must implement MFA. " +
                "HIPAA §164.312(d) — Person or Entity Authentication.");
        }
    }
}
```

---

## 7. API セキュリティ テスト

＃＃＃７．１． FHIR API セキュリティ テスト

```java
// FHIRAPISecurityTest.java
@QuarkusTest
public class FHIRAPISecurityTest {

    /**
     * Test: FHIR search should not leak patient data across tenants
     */
    @Test
    void testFHIR_searchIsolation() {
        // Token for Hospital A
        String hospitalAToken = getTokenForHospital("hospital-a");
        
        // Create patient in Hospital A
        given()
            .header("Authorization", "Bearer " + hospitalAToken)
            .contentType("application/fhir+json")
            .body(createFHIRPatient("Nguyen Van A", "hospital-a"))
            .when()
            .post("/fhir/Patient")
            .then()
            .statusCode(201);

        // Token for Hospital B — should NOT see Hospital A's patients
        String hospitalBToken = getTokenForHospital("hospital-b");
        
        String result = given()
            .header("Authorization", "Bearer " + hospitalBToken)
            .when()
            .get("/fhir/Patient?name=Nguyen")
            .then()
            .statusCode(200)
            .extract().body().asString();

        // Hospital B must not see Hospital A's patient
        assertThat(result).doesNotContain("hospital-a");
        assertThat(result).doesNotContain("Nguyen Van A");
    }

    /**
     * Test: FHIR _include cannot be used to traverse to unauthorized resources
     */
    @Test
    void testFHIR_includeDoesNotLeakData() {
        String nurseToken = getTokenForRole("nurse", "ward-3");

        // Nurse from Ward 3 tries to include all Practitioners
        String result = given()
            .header("Authorization", "Bearer " + nurseToken)
            .when()
            .get("/fhir/Encounter?_include=Encounter:participant&ward=ward-3")
            .then()
            .statusCode(200)
            .extract().body().asString();

        // Should only see encounters and practitioners for ward-3
        // Count shouldn't include practitioners from other wards
        var bundle = parseFHIRBundle(result);
        bundle.getEntry().stream()
            .filter(e -> e.getResource() instanceof Encounter)
            .forEach(e -> {
                Encounter enc = (Encounter) e.getResource();
                assertThat(enc.getLocationFirstRep().getLocation()
                    .getDisplay()).contains("Ward 3");
            });
    }

    /**
     * Test: Rate limiting per client
     */
    @Test
    void testAPI_rateLimiting() {
        String token = getTokenForRole("doctor", "general");

        int successCount = 0;
        int rateLimitedCount = 0;

        // Send 200 requests rapidly
        for (int i = 0; i < 200; i++) {
            int status = given()
                .header("Authorization", "Bearer " + token)
                .when()
                .get("/api/v1/patients/PAT-001")
                .then()
                .extract().statusCode();

            if (status == 200) successCount++;
            if (status == 429) rateLimitedCount++;
        }

        // Should have been rate limited at some point
        assertThat(rateLimitedCount).isGreaterThan(0);
        // Rate limit header should be present
    }
}
```

---

## 8. コンプライアンススキャン

### 8.1。 HIPAA 準拠スキャナー

```java
// HIPAAComplianceScanner.java
@ApplicationScoped
public class HIPAAComplianceScanner {

    /**
     * Automated HIPAA Technical Safeguards compliance check
     */
    public HIPAAComplianceReport scan() {
        var report = new HIPAAComplianceReport();

        // §164.312(a)(1) — Access Control
        checkAccessControl(report);
        
        // §164.312(a)(2)(i) — Unique User Identification
        checkUniqueUserID(report);
        
        // §164.312(a)(2)(iii) — Automatic Logoff
        checkAutoLogoff(report);
        
        // §164.312(a)(2)(iv) — Encryption and Decryption
        checkEncryption(report);
        
        // §164.312(b) — Audit Controls
        checkAuditControls(report);
        
        // §164.312(c)(1) — Integrity
        checkIntegrity(report);
        
        // §164.312(d) — Person or Entity Authentication
        checkAuthentication(report);
        
        // §164.312(e)(1) — Transmission Security
        checkTransmissionSecurity(report);

        return report;
    }

    private void checkEncryption(HIPAAComplianceReport report) {
        var check = new ComplianceCheck("§164.312(a)(2)(iv)",
            "Encryption and Decryption", "Required");

        // Check 1: TDE or column encryption for ePHI at rest
        boolean atRestEncryption = verifyDatabaseEncryption();
        check.addResult("Data at rest encryption", atRestEncryption,
            atRestEncryption ? "pgcrypto/TDE active" : "No at-rest encryption detected");

        // Check 2: TLS for data in transit
        boolean inTransitEncryption = verifyTLSConfiguration();
        check.addResult("Data in transit encryption", inTransitEncryption,
            inTransitEncryption ? "TLS 1.2+ enforced" : "TLS not properly configured");

        // Check 3: Key management
        boolean keyManagement = verifyKeyManagement();
        check.addResult("Key management via KMS", keyManagement,
            keyManagement ? "Vault KMS active" : "No centralized key management");

        report.addCheck(check);
    }

    private void checkAuditControls(HIPAAComplianceReport report) {
        var check = new ComplianceCheck("§164.312(b)",
            "Audit Controls", "Required");

        // Check 1: pgAudit enabled
        boolean pgAuditEnabled = verifyPgAudit();
        check.addResult("Database audit logging", pgAuditEnabled,
            pgAuditEnabled ? "pgAudit active" : "pgAudit not detected");

        // Check 2: Application audit logging
        boolean appAudit = verifyApplicationAuditLogging();
        check.addResult("Application audit trail", appAudit,
            appAudit ? "Structured audit logging active" : "Missing audit logging");

        // Check 3: Immutable log storage
        boolean immutableLogs = verifyImmutableLogStorage();
        check.addResult("Immutable log storage", immutableLogs,
            immutableLogs ? "Write-once storage configured" : "Logs may be tampered");

        // Check 4: Log retention (6 years for HIPAA)
        boolean logRetention = verifyLogRetention();
        check.addResult("6-year log retention", logRetention,
            logRetention ? "Retention policy configured" : "Retention not verified");

        report.addCheck(check);
    }
}
```

### 8.2。コンプライアンスレポートのテンプレート

**HIPAA 技術的保護措置 - コンプライアンス評価レポート**

|フィールド |値 |
|------|------|
|システム |ヘルスケア マイクロサービス プラットフォーム |
|日付 | 2026 年第 1 四半期 |
|評価者 |セキュリティチーム |
|範囲 | Quarkus API + PostgreSQL + Keycloak |

**§164.312(a)(1) — アクセス制御:**

- 固有のユーザー ID — ✅ PASS
- 緊急アクセス手順 — ✅ パス
- 自動ログオフ (15 分) — ✅ パス
- 暗号化/復号化 - ✅ PASS

**§164.312(b) — 監査管理:**

- pgAudit が有効 — ✅ 合格
- アプリケーション監査証跡 — ✅ 合格
- 不変ログストレージ — ⚠️ 部分的
- 6 年間の保持 — ✅ パス

**§164.312(c)(1) — 整合性:** ePHI 整合性メカニズム ✅、デジタル署名 ✅

**§164.312(d) — 認証:** ePHI アクセス用の MFA ✅、パスワード ポリシー ✅、証明書ベースの認証 ✅

**§164.312(e)(1) — 送信セキュリティ:** TLS 1.2+ の強制 ✅、mTLS インターサービス ✅、弱い暗号スイートの無効化 ✅

**全体スコア:** 95% 準拠 (部分的な所見が 1 件) | **リスクレベル:** 低 | **次のレビュー:** 2026-Q2

---

## 9. 統合された CI/CD セキュリティ パイプライン

＃＃＃９．１．完全なセキュリティ パイプライン

```yaml
# .github/workflows/healthcare-full-security.yml
name: Healthcare Complete Security Pipeline

on:
  pull_request:
    branches: [main]

jobs:
  security-gate:
    name: Security Quality Gate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # === SAST ===
      - name: Semgrep SAST
        uses: returntocorp/semgrep-action@v1
        with:
          config: .semgrep/healthcare-rules.yaml

      # === SCA ===
      - name: Trivy Dependency Scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: fs
          severity: CRITICAL,HIGH
          exit-code: 1

      # === Secrets Detection ===
      - name: Gitleaks Secret Detection
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      # === Container Scan ===
      - name: Build Container
        run: docker build -t healthcare-app:test .
      
      - name: Scan Container Image
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: healthcare-app:test
          severity: CRITICAL,HIGH
          exit-code: 1

      # === SBOM ===
      - name: Generate SBOM
        run: |
          mvn org.cyclonedx:cyclonedx-maven-plugin:makeBom
          
      - name: Upload SBOM
        uses: actions/upload-artifact@v4
        with:
          name: sbom
          path: target/bom.json

      # === Compliance Check ===
      - name: HIPAA Compliance Scan
        run: |
          mvn test -Dtest=HIPAAComplianceScanner \
            -Dquarkus.profile=security-audit
          
      - name: Summary
        if: always()
        run: |
          echo "## Healthcare Security Gate Results" >> $GITHUB_STEP_SUMMARY
          echo "| Check | Status |" >> $GITHUB_STEP_SUMMARY
          echo "|-------|--------|" >> $GITHUB_STEP_SUMMARY
          echo "| SAST (Semgrep) | ✅ |" >> $GITHUB_STEP_SUMMARY
          echo "| SCA (Trivy) | ✅ |" >> $GITHUB_STEP_SUMMARY
          echo "| Secrets (Gitleaks) | ✅ |" >> $GITHUB_STEP_SUMMARY
          echo "| Container Scan | ✅ |" >> $GITHUB_STEP_SUMMARY
          echo "| SBOM Generated | ✅ |" >> $GITHUB_STEP_SUMMARY
          echo "| HIPAA Compliance | ✅ |" >> $GITHUB_STEP_SUMMARY
```

---

## 10. セキュリティ評価レポートのテンプレート

### 10.1。ヘルスケア向け侵入テスト レポートの構造

```
Healthcare Security Assessment Report
======================================

1. EXECUTIVE SUMMARY
   - Scope & objectives
   - Overall risk rating
   - Key findings summary
   - Compliance status (HIPAA, NĐ 13/2023)

2. METHODOLOGY
   - Testing approach (black/grey/white box)
   - Tools used
   - Testing dates
   - Exclusions

3. FINDINGS
   For each finding:
   ┌─────────────────────────────────────────┐
   │ Finding ID: HC-2026-001                 │
   │ Title: IDOR on Patient Records API      │
   │ Severity: CRITICAL                       │
   │ CVSS: 9.1                               │
   │ CWE: CWE-639                            │
   │ HIPAA: §164.312(a)(1) — Access Control  │
   │ ──────────────────────────────────────── │
   │ Description:                             │
   │   Bác sĩ ngoại khoa có thể truy cập     │
   │   hồ sơ bệnh nhân khoa tâm thần bằng   │
   │   cách thay đổi patient ID trong URL.    │
   │                                          │
   │ Impact:                                  │
   │   Rò rỉ ePHI liên khoa, vi phạm nguyên  │
   │   tắc minimum necessary access.          │
   │                                          │
   │ Evidence:                                │
   │   GET /api/v1/patients/PAT-PSY-003      │
   │   Authorization: Bearer <cardiology_jwt> │
   │   Response: 200 OK (returned PHI)        │
   │                                          │
   │ Remediation:                             │
   │   Implement department-based RLS policy  │
   │   in PostgreSQL + verify department      │
   │   claim in JWT at API layer.             │
   │                                          │
   │ Status: REMEDIATED (2026-03-15)          │
   │ Retest: PASSED (2026-03-20)             │
   └─────────────────────────────────────────┘

4. COMPLIANCE MAPPING
   Map each finding to HIPAA Technical Safeguards

5. RISK REGISTER UPDATE
   Update Risk Register with new findings + remediation

6. APPENDICES
   - Full scan outputs
   - Network topology tested
   - Tool configurations
   - SBOM
```

---

## 11. まとめ

### 医療向けセキュリティテストのチェックリスト

```
┌─────────────────────────────────────────────────────────────┐
│     Healthcare Security Testing Checklist                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SAST (Every Commit):                                        │
│  □ SonarQube with healthcare custom rules                   │
│  □ Semgrep with PHI-specific patterns                       │
│  □ SpotBugs + FindSecBugs                                   │
│                                                              │
│  SCA (Every Commit + Daily):                                │
│  □ Trivy filesystem scan                                    │
│  □ Snyk dependency check                                    │
│  □ SBOM generation (CycloneDX)                              │
│  □ License compliance check                                 │
│                                                              │
│  DAST (Every Release):                                       │
│  □ OWASP ZAP with healthcare scan policy                    │
│  □ Nuclei healthcare templates                              │
│  □ IDOR testing on all patient endpoints                    │
│  □ FHIR API security validation                             │
│                                                              │
│  Infrastructure (Monthly):                                   │
│  □ PostgreSQL security audit script                         │
│  □ Keycloak security assessment                             │
│  □ CIS Kubernetes Benchmark                                 │
│  □ Network segmentation verification                        │
│                                                              │
│  Penetration Testing (Quarterly):                            │
│  □ External pentest by third party                          │
│  □ Internal assessment                                       │
│  □ Social engineering assessment                             │
│  □ Physical security assessment                              │
│                                                              │
│  Compliance (Annual):                                        │
│  □ Full HIPAA Technical Safeguards audit                    │
│  □ Risk Analysis update (§164.308(a)(1))                    │
│  □ Security Assessment Report                                │
│  □ Business Associate Agreement review                       │
└─────────────────────────────────────────────────────────────┘
```

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 22: 医療ワークロードのためのコンテナと Kubernetes のセキュリティ](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-22-container-kubernetes-security-healthcare) | [レッスン 24: Capstone — 安全なヘルスケア マイクロサービス プラットフォームの構築](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-24-capstone-xay-dung-secure-healthcare-platform) |
<!-- SERIES-NAV:END -->
