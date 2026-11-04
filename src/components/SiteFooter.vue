<template>
  <footer class="site-footer">
    <!-- 辅助区域 -->
    <div class="muted-section">
      <div class="footer-actions">
        <a href="#" class="action-card">
          <div class="action-icon"><el-icon :size="28"><DataAnalysis /></el-icon></div>
          <div class="action-info">
            <h4>火灾统计</h4>
            <p>接入应急管理部火灾统计分析系统</p>
          </div>
        </a>
        <a href="#" class="action-card">
          <div class="action-icon"><el-icon :size="28"><User /></el-icon></div>
          <div class="action-info">
            <h4>消防员之家</h4>
            <p>跳转消防员之家服务平台</p>
          </div>
        </a>
      </div>
    </div>

    <!-- 主 Footer -->
    <div class="footer-main">
      <div class="footer-inner">
        <div class="footer-brand">
          <svg viewBox="0 0 100 100" width="56" height="56">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#ffd66b" stroke-width="2"/>
            <path d="M50 18 C50 18 38 35 38 50 C38 62 44 70 50 70 C46 62 48 55 50 50 C52 55 54 62 50 70 C56 70 62 62 62 50 C62 35 50 18 50 18 Z"
                  fill="#e8541e"/>
            <polygon points="50,30 53,37 60,37 54,42 56,49 50,45 44,49 46,42 40,37 47,37" fill="#ffd66b"/>
          </svg>
          <div class="footer-brand-text">
            <div class="footer-cn">红河消防救援</div>
            <div class="footer-en">Honghe Fire Rescue</div>
          </div>
        </div>

        <div class="footer-copyright">
          <p>版权所有 &copy; 2026 红河州消防救援支队</p>
          <p class="tips">建议使用 1280×800 以上分辨率浏览</p>
        </div>

        <div class="footer-links">
          <a href="#" class="footer-link">
            <el-icon><DataAnalysis /></el-icon> 火灾统计
          </a>
          <a href="#" class="footer-link">
            <el-icon><Link /></el-icon> 全国消防网
          </a>
          <a href="#" class="footer-link">
            <el-icon><Link /></el-icon> 省内消防网
          </a>
          <a href="#" class="footer-link">
            <el-icon><Link /></el-icon> 总队相关链接
          </a>
          <a href="#" class="footer-link">
            <el-icon><OfficeBuilding /></el-icon> 实用办公工具
          </a>
          <a href="#" class="footer-link">
            <el-icon><Location /></el-icon> 州内链接
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.site-footer { margin-top: 24px; }

/* 辅助区域 */
.muted-section {
  background: #eaeff5;
  padding: 24px 0;
}

.footer-actions {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border: 1px solid var(--card-border);
  border-radius: 6px;
  transition: all 0.2s;
}

.action-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(232, 84, 30, 0.15);
}

.action-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-700) 100%);
  color: #ffd66b;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-info h4 {
  font-family: var(--font-serif);
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.action-info p {
  font-size: 13px;
  color: var(--text-muted);
}

/* 主 Footer */
.footer-main {
  background: var(--navy);
  padding: 40px 0;
}

.footer-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-brand-text { display: flex; flex-direction: column; }

.footer-cn {
  font-size: 18px;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 2px;
}

.footer-en {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
}

.footer-copyright {
  text-align: center;
}

.footer-copyright p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
}

.footer-copyright .tips {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  padding: 6px 0;
}

.footer-link:hover { color: var(--accent); }

@media (max-width: 1024px) {
  .footer-actions { grid-template-columns: 1fr; }
}
</style>
