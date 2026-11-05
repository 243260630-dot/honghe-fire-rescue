/**
 * 种子数据脚本 — 生成首页所需的完整演示数据
 * 运行方式: cd server && npm run seed
 */
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync, existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataFile = join(__dirname, '../../data/db.json')

const now = new Date()
const iso = (daysAgo: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString()
}
const dateStr = (daysAgo: number) => iso(daysAgo).slice(0, 10)

export const seedData = {
  banners: [
    { id: 1, title: '红河州消防救援支队开展2026年度实战化演练', description: '赴汤蹈火 竭诚为民', bg: 'linear-gradient(135deg, #0e3a72, #e8541e)', order: 1, created_at: iso(30) },
    { id: 2, title: '消防安全宣传月活动正式启动', description: '关注消防 生命至上', bg: 'linear-gradient(135deg, #16233a, #0e3a72)', order: 2, created_at: iso(25) },
    { id: 3, title: '新装备列装提升救援能力', description: '科技强勤 装备精良', bg: 'linear-gradient(135deg, #e8541e, #ffd66b)', order: 3, created_at: iso(20) },
  ],

  notices: [
    { id: 1, title: '关于开展2026年度消防安全重点单位检查工作的通知', url: '#', date: dateStr(1), created_at: iso(1) },
    { id: 2, title: '红河州消防救援支队2026年第三季度工作汇报', url: '#', date: dateStr(5), created_at: iso(5) },
    { id: 3, title: '关于组织开展新入职消防员岗前培训的通知', url: '#', date: dateStr(8), created_at: iso(8) },
    { id: 4, title: '红河州119消防宣传月活动方案', url: '#', date: dateStr(12), created_at: iso(12) },
    { id: 5, title: '关于加强冬季火灾防控工作的通知', url: '#', date: dateStr(15), created_at: iso(15) },
  ],

  articles: [
    // === news (消防要闻) ===
    { id: 1, category: 'news', title: '红河州召开2026年消防工作联席会议', date: dateStr(1), created_at: iso(1), updated_at: iso(1) },
    { id: 2, category: 'news', title: '支队组织开展高层建筑灭火救援演练', date: dateStr(2), created_at: iso(2), updated_at: iso(2) },
    { id: 3, category: 'news', title: '蒙自市消防救援大队开展企业消防安全检查', date: dateStr(2), created_at: iso(2), updated_at: iso(2) },
    { id: 4, category: 'news', title: '消防员张某某荣获"最美逆行者"称号', date: dateStr(3), created_at: iso(3), updated_at: iso(3) },
    { id: 5, category: 'news', title: '关于加强冬季火灾防控工作的通知', date: dateStr(4), created_at: iso(4), updated_at: iso(4) },
    { id: 6, category: 'news', title: '建水县消防救援大队举行新装备授装仪式', date: dateStr(5), created_at: iso(5), updated_at: iso(5) },
    { id: 7, category: 'news', title: '泸西县开展119消防宣传月系列活动', date: dateStr(6), created_at: iso(6), updated_at: iso(6) },
    { id: 8, category: 'news', title: '河口县消防救援大队完成边境救援任务', date: dateStr(7), created_at: iso(7), updated_at: iso(7) },

    // === org (机关动态) ===
    { id: 10, category: 'org', title: '支队召开党委扩大会研究部署四季度工作', date: dateStr(1), created_at: iso(1), updated_at: iso(1) },
    { id: 11, category: 'org', title: '机关组织开展主题教育专题学习研讨', date: dateStr(2), created_at: iso(2), updated_at: iso(2) },
    { id: 12, category: 'org', title: '支队机关工会组织开展文体活动', date: dateStr(4), created_at: iso(4), updated_at: iso(4) },
    { id: 13, category: 'org', title: '政治部组织干部选拔任用公示', date: dateStr(6), created_at: iso(6), updated_at: iso(6) },
    { id: 14, category: 'org', title: '后勤装备科完成年度物资采购任务', date: dateStr(8), created_at: iso(8), updated_at: iso(8) },
    { id: 15, category: 'org', title: '司令部组织开展战训参谋业务培训', date: dateStr(10), created_at: iso(10), updated_at: iso(10) },

    // === supervision (通报督导) ===
    { id: 20, category: 'supervision', title: '关于第三季度消防安全检查情况的通报', date: dateStr(2), created_at: iso(2), updated_at: iso(2) },
    { id: 21, category: 'supervision', title: '关于对蒙自市消防工作的督导意见', date: dateStr(5), created_at: iso(5), updated_at: iso(5) },
    { id: 22, category: 'supervision', title: '支队督察组对基层单位进行暗访督察', date: dateStr(7), created_at: iso(7), updated_at: iso(7) },
    { id: 23, category: 'supervision', title: '关于10月份消防执法质量的通报', date: dateStr(10), created_at: iso(10), updated_at: iso(10) },
    { id: 24, category: 'supervision', title: '关于加强作战训练安全工作的督导通知', date: dateStr(13), created_at: iso(13), updated_at: iso(13) },
    { id: 25, category: 'supervision', title: '督察通报：个别单位存在安全隐患', date: dateStr(16), created_at: iso(16), updated_at: iso(16) },

    // === recommend (推荐阅读) ===
    { id: 30, category: 'recommend', title: '习近平总书记关于应急管理重要论述摘编', date: dateStr(1), created_at: iso(1), updated_at: iso(1) },
    { id: 31, category: 'recommend', title: '新时代消防救援队伍建设的根本遵循', date: dateStr(3), created_at: iso(3), updated_at: iso(3) },
    { id: 32, category: 'recommend', title: '消防指战员心理健康维护指南', date: dateStr(6), created_at: iso(6), updated_at: iso(6) },
    { id: 33, category: 'recommend', title: '国内外典型火灾案例分析汇编', date: dateStr(9), created_at: iso(9), updated_at: iso(9) },
    { id: 34, category: 'recommend', title: '应急救援战术与技术研究', date: dateStr(14), created_at: iso(14), updated_at: iso(14) },

    // === rescue (救援速递) ===
    { id: 40, category: 'rescue', title: '红河州建水县发生山体滑坡 消防紧急救援', summary: '出动3车18人，已成功救出3名被困人员', location: '建水县坡头乡', status: 'ongoing', date: dateStr(0), created_at: iso(0), updated_at: iso(0) },
    { id: 41, category: 'rescue', title: '蒙自市一民房失火 消防成功扑救', location: '蒙自市文澜街道', date: dateStr(0), created_at: iso(0), updated_at: iso(0) },
    { id: 42, category: 'rescue', title: '泸西县消防开展森林灭火行动', location: '泸西县三塘乡', date: dateStr(1), created_at: iso(1), updated_at: iso(1) },
    { id: 43, category: 'rescue', title: '弥勒市一车辆侧翻 消防紧急施救', location: '弥勒市东风农场', date: dateStr(1), created_at: iso(1), updated_at: iso(1) },

    // === research (调研专栏) ===
    { id: 50, category: 'research', title: '关于红河州高层建筑消防安全管理的调研报告', date: dateStr(2), created_at: iso(2), updated_at: iso(2) },
    { id: 51, category: 'research', title: '边疆少数民族地区消防宣传工作思考', date: dateStr(6), created_at: iso(6), updated_at: iso(6) },
    { id: 52, category: 'research', title: '消防救援队伍职业化建设路径探索', date: dateStr(9), created_at: iso(9), updated_at: iso(9) },
    { id: 53, category: 'research', title: '乡村振兴背景下农村消防工作研究', date: dateStr(12), created_at: iso(12), updated_at: iso(12) },
    { id: 54, category: 'research', title: '智慧消防建设在红河州的实践与思考', date: dateStr(16), created_at: iso(16), updated_at: iso(16) },

    // === library (资料库) ===
    { id: 60, category: 'library', title: '消防法律法规汇编2026版', date: dateStr(30), created_at: iso(30), updated_at: iso(30) },
    { id: 61, category: 'library', title: '灭火救援战术手册', date: dateStr(30), created_at: iso(30), updated_at: iso(30) },
    { id: 62, category: 'library', title: '消防安全检查指南', date: dateStr(30), created_at: iso(30), updated_at: iso(30) },
    { id: 63, category: 'library', title: '应急救援装备操作手册', date: dateStr(30), created_at: iso(30), updated_at: iso(30) },
    { id: 64, category: 'library', title: '消防知识科普资料包', date: dateStr(30), created_at: iso(30), updated_at: iso(30) },

    // === media (媒体聚焦) ===
    { id: 70, category: 'media', title: '红河消防：守护边境安全的逆行者', source: '央视', date: dateStr(2), created_at: iso(2), updated_at: iso(2) },
    { id: 71, category: 'media', title: '红河州构建多元消防宣传格局', source: '云南日报', date: dateStr(5), created_at: iso(5), updated_at: iso(5) },
    { id: 72, category: 'media', title: '消防指战员的一天：赴汤蹈火为人民', source: '人民网', date: dateStr(8), created_at: iso(8), updated_at: iso(8) },
    { id: 73, category: 'media', title: '红河消防数字化建设成效显著', source: '新华网', date: dateStr(11), created_at: iso(11), updated_at: iso(11) },

    // === excerpt (精品文摘) ===
    { id: 80, category: 'excerpt', title: '《火焰蓝》——写给每一位消防指战员的诗', summary: '献给默默守护的逆行者们', author: '政治部', date: dateStr(1), created_at: iso(1), updated_at: iso(1) },
    { id: 81, category: 'excerpt', title: '平凡岗位上的不平凡', summary: '记蒙自大队后勤班班长王某某的一天', author: '通讯员', date: dateStr(5), created_at: iso(5), updated_at: iso(5) },
    { id: 82, category: 'excerpt', title: '我的消防梦', summary: '一名新消防员的成长心路历程', author: '新训大队', date: dateStr(10), created_at: iso(10), updated_at: iso(10) },
    { id: 83, category: 'excerpt', title: '那一抹火焰蓝', summary: '献给边境线上的消防守护者', author: '宣传科', date: dateStr(15), created_at: iso(15), updated_at: iso(15) },

    // === grassroots (基层动态 7个子分类) ===
    { id: 100, category: 'grassroots', subCategory: 'training', title: '蒙自大队开展高层建筑灭火救援训练', date: dateStr(1), created_at: iso(1), updated_at: iso(1) },
    { id: 101, category: 'grassroots', subCategory: 'training', title: '建水大队组织水域救援实战演练', date: dateStr(2), created_at: iso(2), updated_at: iso(2) },
    { id: 102, category: 'grassroots', subCategory: 'training', title: '泸西大队开展绳索救援技术考核', date: dateStr(4), created_at: iso(4), updated_at: iso(4) },
    { id: 103, category: 'grassroots', subCategory: 'training', title: '弥勒大队组织重型化工灾害处置训练', date: dateStr(5), created_at: iso(5), updated_at: iso(5) },
    { id: 104, category: 'grassroots', subCategory: 'training', title: '石屏大队开展森林草原火灾扑救训练', date: dateStr(7), created_at: iso(7), updated_at: iso(7) },
    { id: 105, category: 'grassroots', subCategory: 'training', title: '河口大队组织边境地区应急救援演练', date: dateStr(9), created_at: iso(9), updated_at: iso(9) },

    { id: 110, category: 'grassroots', subCategory: 'management', title: '各大队开展条令条例学习月活动', date: dateStr(2), created_at: iso(2), updated_at: iso(2) },
    { id: 111, category: 'grassroots', subCategory: 'management', title: '蒙自大队完成新消防员考核工作', date: dateStr(4), created_at: iso(4), updated_at: iso(4) },
    { id: 112, category: 'grassroots', subCategory: 'management', title: '建水大队开展安全隐患自查自纠', date: dateStr(6), created_at: iso(6), updated_at: iso(6) },
    { id: 113, category: 'grassroots', subCategory: 'management', title: '弥勒大队组织驾驶员安全教育培训', date: dateStr(8), created_at: iso(8), updated_at: iso(8) },
    { id: 114, category: 'grassroots', subCategory: 'management', title: '泸西大队开展正规化建设检查', date: dateStr(10), created_at: iso(10), updated_at: iso(10) },
    { id: 115, category: 'grassroots', subCategory: 'management', title: '元阳大队组织开展内务卫生大检查', date: dateStr(12), created_at: iso(12), updated_at: iso(12) },

    { id: 120, category: 'grassroots', subCategory: 'politics', title: '各大队组织开展主题教育专题党课', date: dateStr(1), created_at: iso(1), updated_at: iso(1) },
    { id: 121, category: 'grassroots', subCategory: 'politics', title: '蒙自大队组织开展党史学习教育', date: dateStr(3), created_at: iso(3), updated_at: iso(3) },
    { id: 122, category: 'grassroots', subCategory: 'politics', title: '建水大队开展谈心谈话活动', date: dateStr(5), created_at: iso(5), updated_at: iso(5) },
    { id: 123, category: 'grassroots', subCategory: 'politics', title: '石屏大队组织参观红色教育基地', date: dateStr(7), created_at: iso(7), updated_at: iso(7) },
    { id: 124, category: 'grassroots', subCategory: 'politics', title: '弥勒大队开展"最美消防员"评选活动', date: dateStr(9), created_at: iso(9), updated_at: iso(9) },
    { id: 125, category: 'grassroots', subCategory: 'politics', title: '红河大队组织开展意识形态工作培训', date: dateStr(11), created_at: iso(11), updated_at: iso(11) },

    { id: 130, category: 'grassroots', subCategory: 'logistics', title: '各大队完成冬季物资储备工作', date: dateStr(2), created_at: iso(2), updated_at: iso(2) },
    { id: 131, category: 'grassroots', subCategory: 'logistics', title: '蒙自大队完成营房设施维修改造', date: dateStr(4), created_at: iso(4), updated_at: iso(4) },
    { id: 132, category: 'grassroots', subCategory: 'logistics', title: '建水大队购置配备新个人防护装备', date: dateStr(6), created_at: iso(6), updated_at: iso(6) },
    { id: 133, category: 'grassroots', subCategory: 'logistics', title: '泸西大队开展车辆安全检查保养', date: dateStr(8), created_at: iso(8), updated_at: iso(8) },
    { id: 134, category: 'grassroots', subCategory: 'logistics', title: '弥勒大队推进智慧营区建设', date: dateStr(10), created_at: iso(10), updated_at: iso(10) },
    { id: 135, category: 'grassroots', subCategory: 'logistics', title: '河口大队完成边境营房配套建设', date: dateStr(12), created_at: iso(12), updated_at: iso(12) },

    { id: 140, category: 'grassroots', subCategory: 'law', title: '蒙自大队开展"双随机、一公开"检查', date: dateStr(1), created_at: iso(1), updated_at: iso(1) },
    { id: 141, category: 'grassroots', subCategory: 'law', title: '建水大队查处一起消防通道堵塞违法行为', date: dateStr(3), created_at: iso(3), updated_at: iso(3) },
    { id: 142, category: 'grassroots', subCategory: 'law', title: '石屏大队开展重点单位消防检查', date: dateStr(5), created_at: iso(5), updated_at: iso(5) },
    { id: 143, category: 'grassroots', subCategory: 'law', title: '泸西大队依法查封一家火灾隐患单位', date: dateStr(7), created_at: iso(7), updated_at: iso(7) },
    { id: 144, category: 'grassroots', subCategory: 'law', title: '弥勒大队开展消防产品专项检查', date: dateStr(9), created_at: iso(9), updated_at: iso(9) },
    { id: 145, category: 'grassroots', subCategory: 'law', title: '各大队完成第三季度执法数据上报', date: dateStr(11), created_at: iso(11), updated_at: iso(11) },

    { id: 150, category: 'grassroots', subCategory: 'education', title: '蒙自大队开展消防知识进学校活动', date: dateStr(1), created_at: iso(1), updated_at: iso(1) },
    { id: 151, category: 'grassroots', subCategory: 'education', title: '建水大队走进社区开展消防宣传', date: dateStr(3), created_at: iso(3), updated_at: iso(3) },
    { id: 152, category: 'grassroots', subCategory: 'education', title: '石屏大队利用新媒体开展消防科普', date: dateStr(5), created_at: iso(5), updated_at: iso(5) },
    { id: 153, category: 'grassroots', subCategory: 'education', title: '泸西大队组织开展消防演练进企业', date: dateStr(7), created_at: iso(7), updated_at: iso(7) },
    { id: 154, category: 'grassroots', subCategory: 'education', title: '弥勒大队制作消防安全宣传片', date: dateStr(9), created_at: iso(9), updated_at: iso(9) },
    { id: 155, category: 'grassroots', subCategory: 'education', title: '河口大队开展边境村寨消防宣传', date: dateStr(11), created_at: iso(11), updated_at: iso(11) },

    { id: 160, category: 'grassroots', subCategory: 'info', title: '支队信息中心完成系统升级改造', date: dateStr(2), created_at: iso(2), updated_at: iso(2) },
    { id: 161, category: 'grassroots', subCategory: 'info', title: '蒙自大队信息化建设取得新进展', date: dateStr(4), created_at: iso(4), updated_at: iso(4) },
    { id: 162, category: 'grassroots', subCategory: 'info', title: '建水大队完成消防大数据平台接入', date: dateStr(6), created_at: iso(6), updated_at: iso(6) },
    { id: 163, category: 'grassroots', subCategory: 'info', title: '泸西大队开展信息化应用培训', date: dateStr(8), created_at: iso(8), updated_at: iso(8) },
    { id: 164, category: 'grassroots', subCategory: 'info', title: '弥勒大队推进智慧消防建设', date: dateStr(10), created_at: iso(10), updated_at: iso(10) },
    { id: 165, category: 'grassroots', subCategory: 'info', title: '各大队完成年度信息安全检查', date: dateStr(12), created_at: iso(12), updated_at: iso(12) },
  ],

  leaders: [
    { id: 1, name: '张政委', position: '红河州消防救援支队政委', content: '要切实做好冬季火灾防控工作，确保全州消防安全形势持续稳定。', color: 'linear-gradient(135deg, #e8541e, #c44412)', date: dateStr(2), created_at: iso(2) },
    { id: 2, name: '李支队长', position: '红河州消防救援支队支队长', content: '加强实战化训练，提升队伍战斗力，随时准备处置各类急难险重任务。', color: 'linear-gradient(135deg, #0e3a72, #1657a8)', date: dateStr(6), created_at: iso(6) },
  ],

  rankings: [
    { id: 1, unit: '石屏县消防救援大队', count: 39, month: '2026-10', created_at: iso(30) },
    { id: 2, unit: '建水县消防救援大队', count: 39, month: '2026-10', created_at: iso(30) },
    { id: 3, unit: '泸西县消防救援大队', count: 38, month: '2026-10', created_at: iso(30) },
    { id: 4, unit: '河口县消防救援大队', count: 37, month: '2026-10', created_at: iso(30) },
    { id: 5, unit: '蒙自市消防救援大队', count: 35, month: '2026-10', created_at: iso(30) },
    { id: 6, unit: '弥勒市消防救援大队', count: 34, month: '2026-10', created_at: iso(30) },
    { id: 7, unit: '元阳县消防救援大队', count: 32, month: '2026-10', created_at: iso(30) },
    { id: 8, unit: '红河县消防救援大队', count: 30, month: '2026-10', created_at: iso(30) },
  ],

  users: [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', created_at: iso(30) },
  ],
}

// 仅当直接运行本脚本时才写入文件（被 import 时只导出数据）
const isMain = !!process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]

if (isMain) {
  if (existsSync(dataFile)) {
    console.log('⚠️  db.json 已存在，将覆盖写入种子数据')
  }

  writeFileSync(dataFile, JSON.stringify(seedData, null, 2), 'utf-8')
  console.log(`✅ 种子数据已写入 ${dataFile}`)
  console.log(`   - articles: ${seedData.articles.length}`)
  console.log(`   - banners: ${seedData.banners.length}`)
  console.log(`   - notices: ${seedData.notices.length}`)
  console.log(`   - leaders: ${seedData.leaders.length}`)
  console.log(`   - rankings: ${seedData.rankings.length}`)
  console.log(`   - users: ${seedData.users.length}`)
  console.log('   管理员账号: admin / admin123')
}
