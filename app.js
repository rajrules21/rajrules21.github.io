// JavaScript Module for SRE Portfolio Web Application

document.addEventListener('DOMContentLoaded', () => {
  initGitHubIntegration();
  initArchitectureModal();
  initCVDropdown();
  initFloatingAIAssistant();
});

// 1. Live GitHub API Integration
async function initGitHubIntegration() {
  const container = document.getElementById('github-repos-container');
  if (!container) return;

  try {
    const response = await fetch('https://api.github.com/users/rajrules21/repos?per_page=20&sort=updated');
    if (!response.ok) throw new Error('GitHub API HTTP Error');

    const repos = await response.json();
    const excludedRepos = new Set([
      'rajrules21',
      'rajrules21.github.io',
      'sre-platform-engineering-projects'
    ]);
    const publicRepos = repos.filter(
      r => !r.private && !r.fork && !excludedRepos.has(r.name)
    );

    if (publicRepos.length === 0) {
      container.innerHTML = `<div style="color:var(--text-muted);">No public repositories found.</div>`;
      return;
    }

    container.innerHTML = publicRepos.slice(0, 6).map(repo => `
      <div class="glass-panel" style="padding:16px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <h4 style="font-size:14px; font-weight:800; color:var(--text-main); word-break:break-word;">${repo.name}</h4>
            <span style="font-size:11px; padding:2px 8px; border-radius:10px; background:var(--badge-bg); color:var(--accent-cyan); font-weight:700;">
              ★ ${repo.stargazers_count}
            </span>
          </div>
          <p style="font-size:12px; color:var(--text-muted); line-height:1.4; margin-bottom:12px;">
            ${repo.description || 'Cloud & DevOps repository.'}
          </p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-sub); border-top:1px solid var(--card-border); padding-top:8px;">
          <span>${repo.language || 'Multi-Language'}</span>
          <a href="${repo.html_url}" target="_blank" style="color:var(--accent-cyan); text-decoration:none; font-weight:700;">View Repo →</a>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.error('GitHub API error:', err);
    container.innerHTML = `
      <div style="color:var(--text-muted); font-size:13px;">
        Featured Repositories: <strong><a href="https://github.com/rajrules21/cloud-security-audit" target="_blank" style="color:var(--accent-cyan);">cloud-security-audit</a></strong>, <strong><a href="https://github.com/rajrules21/cloud-cost-audit" target="_blank" style="color:var(--accent-cyan);">cloud-cost-audit</a></strong>, <strong><a href="https://github.com/rajrules21/terraform-scripts-quiz-project" target="_blank" style="color:var(--accent-cyan);">terraform-scripts-quiz-project</a></strong>, <strong><a href="https://github.com/rajrules21/Jenkins-Projects" target="_blank" style="color:var(--accent-cyan);">Jenkins-Projects</a></strong>.
      </div>
    `;
  }
}

// 2. CV Dropdown Handler
function initCVDropdown() {
  const btn = document.getElementById('cv-dropdown-btn');
  const menu = document.getElementById('cv-dropdown-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    menu.classList.remove('show');
  });
}

// 3. Floating AI SRE Assistant Chat Widget Handler
function initFloatingAIAssistant() {
  const trigger = document.getElementById('ai-widget-trigger');
  const windowEl = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('ai-chat-close-btn');
  const body = document.getElementById('ai-chat-body');
  const input = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-chat-send-btn');

  if (!trigger || !windowEl) return;

  trigger.addEventListener('click', () => {
    windowEl.classList.toggle('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      windowEl.classList.remove('active');
    });
  }

  // Pre-programmed Intelligent AI Assistant Q&A Responses
  const responses = {
    'projects': `🚀 <strong>Rajeev's Key Production &amp; Open-Source Projects:</strong><br/>
      1. <strong>Azure CIEM/CSPM Security Auditor:</strong> Read-only Entra ID &amp; Azure posture correlation (<a href="https://github.com/rajrules21/cloud-security-audit" target="_blank" style="color:var(--accent-cyan);">GitHub Repo</a>)<br/>
      2. <strong>Azure Cost &amp; FinOps Auditor:</strong> AmortizedCost, 14-day CPU P95 &amp; Advisor waste audit (<a href="https://github.com/rajrules21/cloud-cost-audit" target="_blank" style="color:var(--accent-cyan);">GitHub Repo</a>)<br/>
      3. <strong>AWS ECS Fargate &amp; Terraform:</strong> Modular serverless container CI/CD (<a href="https://github.com/rajrules21/terraform-scripts-quiz-project" target="_blank" style="color:var(--accent-cyan);">GitHub Repo</a>)<br/>
      4. <strong>Jenkins DevSecOps &amp; Trivy:</strong> Container vulnerability gating &amp; Boto3 ECS deployment (<a href="https://github.com/rajrules21/Jenkins-Projects" target="_blank" style="color:var(--accent-cyan);">GitHub Repo</a>)`,
    
    'resume': `📄 You can view or download Rajeev's 1-Page Executive Resume directly:<br/>
      👉 <a href="./Rajeev_Mishra_Cloud_DevOps_Resume.pdf" target="_blank" style="color:var(--accent-cyan); font-weight:700;">Download Executive PDF Resume</a><br/>
      👉 <a href="./resume.html" target="_blank" style="color:var(--accent-cyan); font-weight:700;">Open Interactive HTML Resume</a>`,
    
    'skills': `☁️ <strong>Rajeev's Core Technical Stack:</strong><br/>
      • <strong>Cloud:</strong> Azure & AWS (EC2, S3, EKS, VPC, RDS)<br/>
      • <strong>IaC:</strong> Terraform (Modular HCL), Ansible, Python<br/>
      • <strong>Containers:</strong> Docker, Kubernetes (AWS EKS)<br/>
      • <strong>Observability:</strong> ELK Stack, Azure Monitor (AI Anomaly Detection), Zabbix, Nagios`,

    'contact': `✉️ <strong>Contact Information:</strong><br/>
      • <strong>Email:</strong> <a href="mailto:princealexster@gmail.com" style="color:var(--accent-cyan);">princealexster@gmail.com</a><br/>
      • <strong>Phone:</strong> +91-8355956846<br/>
      • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/rajeev-mishra-84781818/" target="_blank" style="color:var(--accent-cyan);">rajeev-mishra-84781818</a><br/>
      • <strong>GitHub:</strong> <a href="https://github.com/rajrules21" target="_blank" style="color:var(--accent-cyan);">@rajrules21</a>`
  };

  function appendUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg-user';
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function appendBotMessage(html) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg-bot';
    msg.innerHTML = html;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function handleQuery(query) {
    const cleanQuery = query.toLowerCase().trim();
    appendUserMessage(query);

    setTimeout(() => {
      if (cleanQuery.includes('project') || cleanQuery.includes('repo')) {
        appendBotMessage(responses['projects']);
      } else if (cleanQuery.includes('resume') || cleanQuery.includes('cv')) {
        appendBotMessage(responses['resume']);
      } else if (cleanQuery.includes('skill') || cleanQuery.includes('azure') || cleanQuery.includes('aws') || cleanQuery.includes('terraform') || cleanQuery.includes('k8s') || cleanQuery.includes('kubernetes')) {
        appendBotMessage(responses['skills']);
      } else if (cleanQuery.includes('contact') || cleanQuery.includes('email') || cleanQuery.includes('phone') || cleanQuery.includes('linkedin')) {
        appendBotMessage(responses['contact']);
      } else {
        appendBotMessage(`I'd be glad to tell you more! Rajeev has 8+ years of hands-on experience in Azure, AWS, Terraform, Docker, and Kubernetes. Try clicking one of the quick options below or asking about his <strong>projects</strong>, <strong>resume</strong>, or <strong>skills</strong>.`);
      }
    }, 400);
  }

  // Handle Quick Action Chips
  document.querySelectorAll('.chat-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const q = e.target.getAttribute('data-query');
      handleQuery(e.target.textContent);
    });
  });

  // Handle Input Send
  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => {
      if (input.value.trim()) {
        handleQuery(input.value);
        input.value = '';
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        handleQuery(input.value);
        input.value = '';
      }
    });
  }
}

// 4. Interactive Architecture Diagrams Modal
function initArchitectureModal() {
  const modal = document.getElementById('arch-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const diagramContent = document.getElementById('diagram-content');

  const architectures = {
    'azure-ciem': {
      title: 'Azure & Entra ID CIEM / CSPM Security Auditor Architecture',
      desc: 'Decoupled dual-account read-only collectors correlating Entra ID identity state with Azure RBAC, Activity Logs & resource posture',
      svg: `
        <svg viewBox="0 0 800 320" width="100%" height="260" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="320" fill="#090d16" rx="8"/>

          <rect x="40" y="55" width="185" height="75" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
          <text x="132" y="88" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">audit_azure.py</text>
          <text x="132" y="106" fill="#cbd5e1" font-size="10" text-anchor="middle">RBAC, 90d Logs &amp; Posture</text>

          <rect x="40" y="175" width="185" height="75" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
          <text x="132" y="208" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">audit_entra.py</text>
          <text x="132" y="226" fill="#cbd5e1" font-size="10" text-anchor="middle">Users, MFA, CA &amp; Apps</text>

          <rect x="295" y="110" width="210" height="85" rx="8" fill="#0284c7" stroke="#06b6d4" stroke-width="2"/>
          <text x="400" y="145" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Cross-Reference Engine</text>
          <text x="400" y="164" fill="#e0f2fe" font-size="10" text-anchor="middle">Orphaned Roles &amp; Unused Access</text>
          <text x="400" y="180" fill="#e0f2fe" font-size="9" text-anchor="middle">429/503 Backoff + Token Cache</text>

          <rect x="575" y="110" width="185" height="85" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
          <text x="667" y="145" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">AUDIT_REPORT.md</text>
          <text x="667" y="165" fill="#cbd5e1" font-size="10" text-anchor="middle">+ 10 Normalized CSVs</text>

          <line x1="225" y1="92" x2="295" y2="140" stroke="#06b6d4" stroke-width="2"/>
          <line x1="225" y1="212" x2="295" y2="165" stroke="#06b6d4" stroke-width="2"/>
          <line x1="505" y1="152" x2="575" y2="152" stroke="#06b6d4" stroke-width="2"/>

          <text x="400" y="285" fill="#94a3b8" font-size="11" text-anchor="middle">Read-only Reader / Security Reader / Global Reader scopes — zero JSON state mutation</text>
        </svg>
      `
    },
    'azure-finops': {
      title: 'Azure Cost Optimization & FinOps Auditor Architecture',
      desc: 'Strictly read-only Cost Management, Resource Graph, Monitor 14-day CPU Avg/P95 & Advisor audit pipeline',
      svg: `
        <svg viewBox="0 0 800 320" width="100%" height="260" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="320" fill="#090d16" rx="8"/>

          <rect x="40" y="55" width="180" height="70" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
          <text x="130" y="88" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">billing_client.py</text>
          <text x="130" y="105" fill="#cbd5e1" font-size="10" text-anchor="middle">AmortizedCost &amp; Budgets</text>

          <rect x="40" y="175" width="180" height="70" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
          <text x="130" y="208" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Resource &amp; Monitor</text>
          <text x="130" y="225" fill="#cbd5e1" font-size="10" text-anchor="middle">14d CPU P95 &amp; Advisor</text>

          <rect x="295" y="110" width="210" height="85" rx="8" fill="#0284c7" stroke="#06b6d4" stroke-width="2"/>
          <text x="400" y="145" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">audit_azure_cost.py</text>
          <text x="400" y="164" fill="#e0f2fe" font-size="10" text-anchor="middle">Idle Disks, VMs, LBs &amp; Tags</text>
          <text x="400" y="180" fill="#e0f2fe" font-size="9" text-anchor="middle">AHB &amp; Log Analytics Checks</text>

          <rect x="575" y="110" width="185" height="85" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
          <text x="667" y="145" fill="#ffffff" font-size="11.5" font-weight="bold" text-anchor="middle">COST_AUDIT_REPORT.md</text>
          <text x="667" y="165" fill="#cbd5e1" font-size="10" text-anchor="middle">+ 6 FinOps CSV Datasets</text>

          <line x1="220" y1="90" x2="295" y2="140" stroke="#06b6d4" stroke-width="2"/>
          <line x1="220" y1="210" x2="295" y2="165" stroke="#06b6d4" stroke-width="2"/>
          <line x1="505" y1="152" x2="575" y2="152" stroke="#06b6d4" stroke-width="2"/>

          <text x="400" y="285" fill="#94a3b8" font-size="11" text-anchor="middle">Uses Reader, Monitoring Reader &amp; Cost Management Reader roles with interactive auth</text>
        </svg>
      `
    },
    'aws-ecs': {
      title: 'AWS ECS Fargate CI/CD & Terraform IaC Architecture',
      desc: 'Serverless container deployment pipeline: GitHub -> CodePipeline -> CodeBuild -> ECR -> ECS Fargate -> ALB -> CloudWatch',
      svg: `
        <svg viewBox="0 0 800 350" width="100%" height="280" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="350" fill="#090d16" rx="8"/>

          <rect x="30" y="130" width="110" height="70" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
          <text x="85" y="165" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">GitHub</text>
          <text x="85" y="182" fill="#cbd5e1" font-size="10" text-anchor="middle">Source Repo</text>

          <line x1="140" y1="165" x2="185" y2="165" stroke="#06b6d4" stroke-width="2"/>

          <rect x="185" y="130" width="125" height="70" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
          <text x="247" y="160" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">AWS CodePipeline</text>
          <text x="247" y="177" fill="#cbd5e1" font-size="10" text-anchor="middle">Orchestration</text>

          <line x1="310" y1="165" x2="355" y2="165" stroke="#06b6d4" stroke-width="2"/>

          <rect x="355" y="130" width="120" height="70" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
          <text x="415" y="160" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">AWS CodeBuild</text>
          <text x="415" y="177" fill="#cbd5e1" font-size="10" text-anchor="middle">Docker & ECR</text>

          <rect x="520" y="60" width="110" height="60" rx="8" fill="#0284c7"/>
          <text x="575" y="90" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Amazon ECR</text>
          <text x="575" y="105" fill="#ffffff" font-size="9" text-anchor="middle">Image Registry</text>

          <rect x="520" y="190" width="110" height="60" rx="8" fill="#0284c7"/>
          <text x="575" y="220" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">ECS Fargate</text>
          <text x="575" y="235" fill="#ffffff" font-size="9" text-anchor="middle">Serverless Task</text>

          <line x1="475" y1="165" x2="520" y2="90" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4"/>
          <line x1="575" y1="120" x2="575" y2="190" stroke="#06b6d4" stroke-width="2"/>

          <rect x="670" y="130" width="105" height="70" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
          <text x="722" y="160" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">AWS ALB</text>
          <text x="722" y="177" fill="#cbd5e1" font-size="10" text-anchor="middle">Public Traffic</text>

          <line x1="630" y1="220" x2="670" y2="165" stroke="#06b6d4" stroke-width="2"/>

          <rect x="30" y="275" width="745" height="45" rx="6" fill="#0f172a" stroke="#1e293b"/>
          <text x="400" y="302" fill="#94a3b8" font-size="11" text-anchor="middle">Provisions VPC, ALB, ECR, ECS Fargate, IAM Roles, CloudWatch Alarms & SNS Topics automatically via Terraform</text>
        </svg>
      `
    },
    'azure-devsecops': {
      title: 'Jenkins DevSecOps Pipeline with Trivy Gate & Boto3 ECS Architecture',
      desc: 'Declarative Jenkinsfile pipeline enforcing aquasec/trivy image scanning prior to ECR push and Boto3 ECS deployment',
      svg: `
        <svg viewBox="0 0 800 320" width="100%" height="260" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="320" fill="#090d16" rx="8"/>
          
          <rect x="40" y="120" width="120" height="70" rx="8" fill="#1e3a8a" stroke="#2563eb" stroke-width="2"/>
          <text x="100" y="152" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Git Checkout</text>

          <rect x="190" y="120" width="130" height="70" rx="8" fill="#1e3a8a" stroke="#2563eb" stroke-width="2"/>
          <text x="255" y="152" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Docker Build</text>

          <rect x="350" y="120" width="140" height="70" rx="8" fill="#0284c7" stroke="#06b6d4" stroke-width="2"/>
          <text x="420" y="148" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Trivy Security</text>
          <text x="420" y="165" fill="#e0f2fe" font-size="10" text-anchor="middle">Container Scan</text>

          <rect x="520" y="120" width="120" height="70" rx="8" fill="#1e3a8a" stroke="#2563eb" stroke-width="2"/>
          <text x="580" y="152" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Push to ECR</text>

          <rect x="670" y="120" width="100" height="70" rx="8" fill="#1e3a8a" stroke="#2563eb" stroke-width="2"/>
          <text x="720" y="152" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">ECS Deploy</text>

          <line x1="160" y1="155" x2="190" y2="155" stroke="#06b6d4" stroke-width="2"/>
          <line x1="320" y1="155" x2="350" y2="155" stroke="#06b6d4" stroke-width="2"/>
          <line x1="490" y1="155" x2="520" y2="155" stroke="#06b6d4" stroke-width="2"/>
          <line x1="640" y1="155" x2="670" y2="155" stroke="#06b6d4" stroke-width="2"/>

          <text x="400" y="250" fill="#94a3b8" font-size="12" text-anchor="middle">Integrates Trivy vulnerability gate to reject unsafe images prior to AWS / Azure deployment</text>
        </svg>
      `
    },
    'gcp-gitops': {
      title: 'GCP GKE GitOps Roadmap Architecture (ArgoCD & FluxCD)',
      desc: 'Future GitOps roadmap featuring FluxCD for infrastructure add-ons and ArgoCD for application delivery',
      svg: `
        <svg viewBox="0 0 800 320" width="100%" height="260" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="320" fill="#090d16" rx="8"/>
          
          <rect x="60" y="110" width="160" height="80" rx="8" fill="#1e3a8a" stroke="#2563eb" stroke-width="2"/>
          <text x="140" y="145" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">Git Manifest Repos</text>
          <text x="140" y="165" fill="#94a3b8" font-size="10" text-anchor="middle">Single Source of Truth</text>

          <rect x="300" y="60" width="180" height="70" rx="8" fill="#0284c7"/>
          <text x="390" y="95" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">FluxCD Controller</text>
          <text x="390" y="112" fill="#e0f2fe" font-size="10" text-anchor="middle">Cluster Infra Add-ons</text>

          <rect x="300" y="170" width="180" height="70" rx="8" fill="#0284c7"/>
          <text x="390" y="205" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">ArgoCD Controller</text>
          <text x="390" y="222" fill="#e0f2fe" font-size="10" text-anchor="middle">App GitOps Sync</text>

          <rect x="560" y="110" width="180" height="80" rx="8" fill="#1e3a8a" stroke="#2563eb" stroke-width="2"/>
          <text x="650" y="145" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">GCP GKE Cluster</text>
          <text x="650" y="165" fill="#94a3b8" font-size="10" text-anchor="middle">Prometheus + Grafana</text>

          <line x1="220" y1="135" x2="300" y2="95" stroke="#06b6d4" stroke-width="2"/>
          <line x1="220" y1="165" x2="300" y2="205" stroke="#06b6d4" stroke-width="2"/>
          <line x1="480" y1="95" x2="560" y2="135" stroke="#06b6d4" stroke-width="2"/>
          <line x1="480" y1="205" x2="560" y2="165" stroke="#06b6d4" stroke-width="2"/>
        </svg>
      `
    }
  };

  function openModal(key) {
    const data = architectures[key] || architectures['aws-ecs'];
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    diagramContent.innerHTML = data.svg;
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  const openArchBtn = document.getElementById('open-arch-btn');
  if (openArchBtn) {
    openArchBtn.addEventListener('click', () => openModal('aws-ecs'));
  }

  document.querySelectorAll('.arch-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const archKey = e.target.getAttribute('data-arch');
      openModal(archKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
