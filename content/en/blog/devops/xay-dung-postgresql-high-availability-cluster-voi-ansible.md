---
id: 019c9617-fd06-7322-b055-2e68380e39b2
title: Building PostgreSQL High Availability Cluster with Ansible
slug: xay-dung-postgresql-high-availability-cluster-voi-ansible
excerpt: >-
  Share experience in deploying and open-source fully automated PostgreSQL HA
  cluster solution
featured_image: /images/blog/postgresql-ha-featured.webp
type: blog
reading_time: 14
view_count: 1
meta: null
published_at: '2025-11-25T16:47:20.000000Z'
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
  - name: postgresql
    slug: postgresql
  - name: patroni
    slug: patroni
  - name: etcd
    slug: etcd
  - name: devops
    slug: devops
  - name: cicd
    slug: cicd
  - name: highavailability
    slug: highavailability
  - name: ansible
    slug: ansible
  - name: infrastructure-as-code
    slug: infrastructure-as-code
comments: []
locale: en
---
<h2 id="gi%E1%BB%9Bi-thi%E1%BB%87u">Introduction</h2><p>High Availability (HA) is an essential requirement for any database system in a production environment. However, deploying a PostgreSQL HA cluster from scratch often requires a lot of research time, is prone to errors during manual configuration, and is difficult to maintain consistency across environments.</p><p>This article shares our experience in developing a complete automation solution using Ansible that helps deploy PostgreSQL HA clusters quickly and reliably. After successful use in production, we decided to open-source this solution to the community.</p><p><strong>Repository</strong>: <a href="https://github.com/xdev-asia-labs/postgres-patroni-etcd-install">postgres-patroni-etcd-install</a></p><h3 id="c%C3%A1c-t%C3%ADnh-n%C4%83ng-ch%C3%ADnh">Key Features</h3><p><strong>Automation & Deployment</strong></p><ul><li>Automatically deploy an entire cluster with a single command</li><li>Configuration as Code with over 70 centrally managed environment variables</li><li>Multi-environment support (development, staging, production)</li></ul><p><strong>High Availability</strong></p><ul><li>Auto-failover with Patroni (conversion time 30-45 seconds)</li><li>Streaming replication with PostgreSQL 18.1</li><li>Automatically restore failed nodes with pg_rewind</li></ul><p><strong>Performance & Scalability</strong></p><ul><li>Connection pooling with PgBouncer (multiplexing ratio 13:1)</li><li>Supports load balancing for read queries</li><li>Optimized for systems with RAM from 16GB to 64GB+</li></ul><p><strong>DevOps Integration</strong></p><ul><li>CI/CD pipeline with GitHub Actions</li><li>Automated testing and validation</li><li>Integrated security scanning</li></ul><h2 id="b%E1%BB%91i-c%E1%BA%A3nh-v%C3%A0-%C4%91%E1%BB%99ng-l%E1%BB%B1c-ph%C3%A1t-tri%E1%BB%83n">Context and Development Dynamics</h2><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-th%E1%BB%B1c-t%E1%BA%BF">Practical Issues</h3><p>During production operations, we experienced a serious incident when the PostgreSQL server experienced a hardware error at 2 am. As a result, the entire application stopped working, and it took 45 minutes to restore from backup. This incident not only caused loss in revenue but also affected reputation and customer trust.</p><h3 id="th%C3%A1ch-th%E1%BB%A9c-khi-tri%E1%BB%83n-khai-ha">Challenges When Implementing HA</h3><p>After the incident, we decided to implement a High Availability solution. However, manual configuration faces many difficulties:</p><p><strong>High complexity</strong>: Need a deep understanding of PostgreSQL replication, Patroni, etcd, and the interactions between them. The research and configuration process takes 2-3 days for an experienced engineer.</p><p><strong>Risk of errors</strong>: Manual configuration easily leads to inconsistency between nodes, causing problems that are difficult to debug. A small mistake in the config file can cause the entire cluster to not function properly.</p><p><strong>Difficult to maintain</strong>: When needing to update configuration or scale cluster, it must be done manually on each node, which is time-consuming and error-prone.</p><p><strong>Lack of documentation</strong>: There is no detailed documentation about the setup process, making it difficult for new onboard engineers to join the project.</p><h3 id="gi%E1%BA%A3i-ph%C3%A1p">Solution</h3><p>We have developed a set of Ansible playbooks to solve the above problems:</p><p><strong>Infrastructure as Code</strong>: All configurations are version controlled, easy to review and rollback when needed.</p><p><strong>Repeatable Deployment</strong>: Can deploy identical cluster on many different environments (dev, staging, production) just by changing files <code>.env</code>.</p><p><strong>Self-documenting</strong>: Ansible code is clear, accompanied by a detailed README, making it easy for new teams to understand and use.</p><p><strong>CI/CD Integration</strong>: Automatically validate configuration before deploying, minimizing the risk of errors.</p><p>After successfully using it in production for over 6 months, we decided to open-source this solution to share with the community.</p><h2 id="ki%E1%BA%BFn-tr%C3%BAc-h%E1%BB%87-th%E1%BB%91ng">System Architecture</h2><h3 id="tech-stack">Tech Stack</h3><p>The solution uses proven technologies in the community:</p>
<!--kg-card-begin: html-->
<table class="sc-jTzLTM pLVjq" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word; font-size: 14px; line-height: 1.6; border-collapse: collapse; color: rgb(212, 212, 212); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(30, 30, 30); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><thead><tr><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">Component</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">Version</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">Role</th></tr></thead><tbody><tr><td style="padding: 5px 10px;">PostgreSQL</td><td style="padding: 5px 10px;">18.1</td><td style="padding: 5px 10px;">Main database engine</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Patroni</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">4.1.0</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">HA orchestration and automatic failover</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">etcd</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">3.5.25</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Distributed configuration store</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">PgBouncer</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">1.25.0</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Connection pooling layer</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Ansible</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">2.12+</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Infrastructure automation</td></tr></tbody></table>
<!--kg-card-end: html-->
<h3 id="ki%E1%BA%BFn-tr%C3%BAc-t%E1%BB%95ng-quan">General Architecture</h3><pre><code class="language-text">┌─────────────────────────────────────┐
│       Application Layer             │
│  (Spring Boot / Django / Node.js)   │
└──────────────┬──────────────────────┘
               │ Port 6432 (PgBouncer)
        ┌──────┴──────┬──────────┐
        ▼             ▼          ▼
   ┌────────┐    ┌────────┐   ┌────────┐
   │PgBouncer│   │PgBouncer│  │PgBouncer│
   │Node 1   │   │Node 2   │  │Node 3   │
   └────┬───┘    └────┬───┘   └────┬───┘
        │ Port 5432   │             │
   ┌────▼────┐   ┌───▼────┐   ┌────▼────┐
   │PostgreSQL│  │PostgreSQL│ │PostgreSQL│
   │ PRIMARY │  │ REPLICA  │ │ REPLICA  │
   │Read/Write│  │Read Only│ │Read Only │
   └────┬────┘   └────┬────┘  └────┬────┘
        │ Port 8008   │             │
   ┌────▼────┐   ┌────▼────┐  ┌────▼────┐
   │ Patroni │   │ Patroni │  │ Patroni │
   │HA Mgr   │   │HA Mgr   │  │ HA Mgr  │
   └────┬────┘   └────┬────┘  └────┬────┘
        │ Port 2379   │             │
        └──────┬──────┴─────────────┘
               ▼
        ┌──────────────────┐
        │   etcd Cluster   │
        │ (Leader Election)│
        └──────────────────┘
</code></pre><h3 id="gi%E1%BA%A3i-th%C3%ADch-c%C3%A1c-th%C3%A0nh-ph%E1%BA%A7n">Explanation of Ingredients</h3><p><strong>PgBouncer Layer</strong>: Deployed on each node to provide connection pooling. Applications can connect to any node, reducing single point of failure and network latency.</p><p><strong>PostgreSQL Cluster</strong>: Use streaming replication with one primary node (read/write) and two replica nodes (read-only). Patroni manages the entire lifecycle of the cluster.</p><p><strong>Patroni</strong>: Act as HA orchestrator, perform continuous health checks, automatically failover when the primary fails, and ensure data consistency through distributed consensus.</p><p><strong>etcd Cluster</strong>: Store cluster configuration and perform leader election. Ensure there is only one primary node at a time, avoiding split-brain scenarios.</p><h3 id="t%E1%BA%A1i-sao-3-nodes">Why 3 Nodes?</h3><p>The number of 3 nodes is the minimum for an HA cluster due to:</p><ul><li><strong>Quorum</strong>: etcd needs at least 3 nodes to achieve quorum (2/3) and tolerates 1 node failure</li><li><strong>Cost effective</strong>: Enough to ensure HA without spending too much on infrastructure</li><li><strong>Proven patterns</strong>: Is the number of standards recommended by the PostgreSQL and etcd community</li></ul><h2 id="h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-tri%E1%BB%83n-khai">Implementation Guide</h2><h3 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">System Requirements</h3><p><strong>Hardware (per node)</strong></p><p>Minimum for lab/development environment:</p><ul><li>CPU: 2 cores</li><li>RAM: 4 GB</li><li>Disk: 20 GB (OS) + 20 GB (Data)</li><li>Network: 1 Gbps</li></ul><p>Recommended for production:</p><ul><li>CPU: 4-8 cores</li><li>RAM: 16-32 GB</li><li>Disk: 50 GB SSD (OS) + 100+ GB NVMe SSD (Data)</li><li>Network: 10 Gbps</li></ul><p><strong>Software</strong></p><p>Control node (machine running Ansible):</p><ul><li>Ansible >= 2.12</li><li>Python >= 3.9</li></ul><p>Target nodes:</p><ul><li>Ubuntu 22.04 LTS / Debian 12 / Rocky Linux 9</li><li>SSH access with root or sudo privileges</li><li>Python 3.x installed</li></ul><h3 id="c%C3%A1c-b%C6%B0%E1%BB%9Bc-tri%E1%BB%83n-khai">Implementation Steps</h3><p><strong>Step 1: Prepare Repository</strong></p><pre><code class="language-bash">git clone https://github.com/xdev-asia-labs/postgres-patroni-etcd-install.git
cd postgres-patroni-etcd-install
</code></pre><p><strong>Step 2: Configure Environment</strong></p><p>Create configuration file from template:</p><pre><code class="language-bash">cp .env.example .env
</code></pre><p>Edit important parameters:</p><pre><code class="language-bash"># Địa chỉ IP của các nodes
NODE1_IP=10.0.0.11
NODE2_IP=10.0.0.12
NODE3_IP=10.0.0.13

# Mật khẩu PostgreSQL (bắt buộc phải thay đổi)
POSTGRESQL_SUPERUSER_PASSWORD=your_strong_password_here
POSTGRESQL_REPLICATION_PASSWORD=your_replication_password_here

# Performance tuning (ví dụ cho server 16GB RAM)
POSTGRESQL_SHARED_BUFFERS=4GB
POSTGRESQL_EFFECTIVE_CACHE_SIZE=12GB
POSTGRESQL_MAX_CONNECTIONS=100
PGBOUNCER_MAX_CLIENT_CONN=1000
</code></pre><p><strong>Step 3: Configure Inventory</strong></p><p>Edit <code>inventory/hosts.yml</code>:</p><pre><code class="language-yaml">all:
  children:
    postgres:
      hosts:
        pg-node1:
          ansible_host: 10.0.0.11
          patroni_name: node1
</code></pre><p><strong>Step 4: Deploy Cluster</strong></p><pre><code class="language-bash"># Load environment variables
set -a &amp;&amp; source .env &amp;&amp; set +a

# Deploy cluster
ansible-playbook playbooks/site.yml -i inventory/hosts.yml
</code></pre><p><strong>Step 5: Verify</strong></p><pre><code class="language-bash">ssh root@10.0.0.11 "patronictl -c /etc/patroni/patroni.yml list"
</code></pre><h2 id="t%C3%ADnh-n%C4%83ng-n%E1%BB%95i-b%E1%BA%ADt">Outstanding Features</h2><h3 id="configuration-as-code">Configuration as Code</h3><p>All configuration is managed in file <code>.env</code> with over 70 variables, helps:</p><ul><li>Easily manage and audit configuration</li><li>Switch between environments simply by swapping files <code>.env</code></li><li>Better security with <code>.gitignore</code> for sensitive data</li><li>Developer-friendly, no need to deeply understand Ansible</li></ul><h3 id="connection-pooling">Connection Pooling</h3><p>PgBouncer is configured to optimize connections:</p><ul><li>13:1 multiplexing ratio (3000 clients → 225 backend connections)</li><li>Automatic failover with multi-host support</li><li>Reduce memory and CPU overhead on PostgreSQL</li></ul><h3 id="zero-downtime-operations">Zero-Downtime Operations</h3><p><strong>Planned Switchover</strong>: Planned primary node migration with downtime of only 2-5 seconds.</p><p><strong>Automatic Failover</strong>: Automatic failover in 30-45 seconds when primary fails.</p><p><strong>Rolling Updates</strong>: Update configuration or version without affecting service availability.</p><h2 id="cicd-pipeline">CI/CD Pipeline</h2><h3 id="automated-validation">Automated Validation</h3><p>GitHub Actions automatically validates each change:</p><ul><li>YAML syntax checking</li><li>Ansible playbooks validation</li><li>Security scanning (Trivy, TruffleHog)</li><li>Code quality checks</li></ul><h3 id="release-automation">Release Automation</h3><p>When creating a new tag (v1.0.0), GitHub Actions automatically:</p><ul><li>Generate changelog from git history</li><li>Create release archive</li><li>Publish GitHub Release with documentation</li></ul><h2 id="performance">Performance</h2><p>In a test environment with 3 nodes (16GB RAM, 5 cores per node):</p><ul><li>Read QPS: 50,000-100,000</li><li>Write QPS: 10,000-20,000</li><li>Failover time: 30-45 seconds</li><li>Connection capacity: 3,000 clients</li><li>Query latency: <5ms (simple queries)</li></ul><h2 id="b%C3%A0i-h%E1%BB%8Dc-kinh-nghi%E1%BB%87m">Lessons Learned</h2><h3 id="1-s%E1%BB%AD-d%E1%BB%A5ng-proven-tools">1. Use Proven Tools</h3><p>Instead of developing our own, we use proven technologies such as Patroni, etcd, and PgBouncer. This helps focus on automation instead of reinventing the wheel.</p><h3 id="2-configuration-as-code">2. Configuration as Code</h3><p>Externalize configuration out <code>.env</code> files instead of hardcode in playbooks makes it easy to customize and maintain for different environments.</p><h3 id="3-security-first">3. Security First</h3><p>Always prioritize security from the beginning:</p><ul><li>Use <code>.gitignore</code> for sensitive files</li><li>Generate strong passwords</li><li>Automatically configure firewall rules</li><li>Integrate security scanning in CI</li></ul><h3 id="4-documentation-matters">4. Documentation Matters</h3><p>Good documentation reduces onboarding time and demonstrates the professionalism of the project. We maintain full documentation in both English and Vietnamese.</p><h2 id="roadmap">Roadmap</h2><p>Features in development:</p><ul><li>Integrated Prometheus/Grafana monitoring</li><li>Automated backups with pgBackRest</li><li>Terraform support for cloud deployment</li><li>Docker/Kubernetes deployment option</li><li>Multi-region replication</li></ul><h2 id="khi-n%C3%A0o-n%C3%AAn-s%E1%BB%AD-d%E1%BB%A5ng">When Should You Use It?</h2><p><strong>Suitable for:</strong></p><ul><li>Applications require high availability (uptime > 99.9%)</li><li>The system cannot tolerate extended downtime</li><li>Multi-tenant applications with multiple concurrent connections</li><li>Teams applies Infrastructure as Code</li></ul><p><strong>Not necessary when:</strong></p><ul><li>Development/testing environments are simple</li><li>Low-traffic applications</li><li>Applications may accept occasional downtime</li><li>Budget constraints (need at least 3 servers)</li></ul><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">Conclusion</h2><p>Building a PostgreSQL High Availability cluster is no longer a big challenge with the right tools and approach. This solution has been proven in production and helps ensure uptime for many important systems.</p><p>With this set of Ansible playbooks, you can deploy a production-ready cluster in 10 minutes, achieve uptime over 99.9%, and manage infrastructure according to the Infrastructure as Code method.</p><h3 id="%C4%91%C3%B3ng-g%C3%B3p">Contribute</h3><p>If you find the project useful:</p><ul><li>⭐ Star repository</li><li>🐛 Report issues</li><li>💬 Share feedback</li><li>🤝 Contribute code</li><li>📢 Share with the community</li></ul>
