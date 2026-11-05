/**
 * 种子数据脚本 — 生成首页所需的完整演示数据
 * 运行方式: cd server && npm run seed
 */
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync, existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataFile = join(__dirname, '../data/db.json')

const now = new Date()
const iso = (daysAgo: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString()
}
const dateStr = (daysAgo: number) => iso(daysAgo).slice(0, 10)
const today = dateStr(0)

// =====================================================
// 参考前端 data.ts 的数据结构生成完整种子数据
// =====================================================

const seedData = {
  // ===== 轮播横幅 =====
  banners: [
    { id: 1, title: '红河州消防救援支队开展2026年度实战化演练', description: '赴汤蹈火 竭诚为民', bg: 'linear-gradient(135deg, #0e3a72, #e8541e)', order: 1, created_at: iso(30) },
    { id: 2, title: '消防安全宣传月活动正式启动', description: '关注消防 生命至上', bg: 'linear-gradient(135deg, #16233a, #0e3a72)', order: 2, created_at: iso(25) },
    { id: 3, title: '新装备列装提升救援能力', description: '科技强勤 装备精良', bg: 'linear-gradient(135deg, #e8541e, #ffd66b)', order: 3, created_at: iso(20) },
  ],

  // ===== 通知公告（独立 notices 表）=====
  notices: [
    { id: 1, title: '关于开展全州消防救援队伍车辆装备摸底评估、数据录入会审工作的通知', url: '#', date: dateStr(1), created_at: iso(1) },
    { id: 2, title: '红河州消防救援支队2026年第三季度工作汇报', url: '#', date: dateStr(5), created_at: iso(5) },
    { id: 3, title: '关于组织开展新入职消防员岗前培训的通知', url: '#', date: dateStr(8), created_at: iso(8) },
    { id: 4, title: '红河州119消防宣传月活动方案', url: '#', date: dateStr(12), created_at: iso(12) },
    { id: 5, title: '关于加强冬季火灾防控工作的通知', url: '#', date: dateStr(15), created_at: iso(15) },
  ],

  // ===== 领导批示（独立 leaders 表）=====
  leaders: [
    { id: 1, name: '张政委', position: '红河州消防救援支队政委', content: '要切实做好冬季火灾防控工作，确保全州消防安全形势持续稳定。', color: 'linear-gradient(135deg, #e8541e, #c44412)', date: dateStr(2), created_at: iso(2) },
    { id: 2, name: '李支队长', position: '红河州消防救援支队支队长', content: '加强实战化训练，提升队伍战斗力，随时准备处置各类急难险重任务。', color: 'linear-gradient(135deg, #0e3a72, #1657a8)', date: dateStr(6), created_at: iso(6) },
  ],

  // =====================================================
  // 文章表：涵盖所有 12 个主页模块 + 待审核稿件
  // =====================================================
  articles: [
    // === 消防要闻 (HEADLINE_NEWS) ===
    {
      id: 1, title: '总队法征宇政委赴红河调研指导工作', date: '2026-08-10',
      category: '思想政治', module: '消防要闻', unit: '支队办公室',
      author: '张伟', auditor: '赵国强', auditTime: iso(1),
      status: '已发布', images: ['https://images.unsplash.com/photo-1576707995936-a6cffe26ef7b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80'],
      created_at: iso(30), updated_at: iso(1),
    },
    {
      id: 2, title: '支队主官深入泸西县消防救援大队督导检查工作', date: '2026-09-14', isNew: true,
      category: '作战训练', module: '消防要闻', unit: '作战训练处',
      author: '李明', auditor: '赵国强', auditTime: iso(1),
      status: '已发布', images: ['https://images.unsplash.com/photo-1582139329536-e7284fece509?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80'],
      created_at: iso(2), updated_at: iso(1),
    },
    { id: 3, title: '支队主官深入建水县消防救援大队开展夜间执勤战备拉动检查', date: '2026-09-13', isNew: true, category: '作战训练', module: '消防要闻', unit: '作战训练处', author: '王强', auditor: '赵国强', status: '已发布', created_at: iso(3), updated_at: iso(3) },
    { id: 4, title: '支队党委召开树立和践行正确政绩观学习教育总结会', date: '2026-09-11', category: '思想政治', module: '消防要闻', unit: '政治部', author: '赵敏', auditor: '赵国强', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 5, title: '叶智勇副总队长实地指导养老院场所灭火救援实战化演练', date: '2026-09-11', category: '作战训练', module: '消防要闻', unit: '作战训练处', author: '陈刚', auditor: '赵国强', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 6, title: '"两队"党工委副书记、管委会主任委员来访听取近期消防工作', date: '2026-09-11', category: '火灾防控', module: '消防要闻', unit: '防火监督处', author: '刘洋', auditor: '赵国强', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 7, title: '支队主官深入弥勒市消防救援大队开展督导检查', date: '2026-09-11', category: '作战训练', module: '消防要闻', unit: '弥勒市消防大队', author: '周涛', auditor: '赵国强', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 8, title: '河口县委书记在十四届县委常委会第七次会议上强调消防安全工作', date: '2026-09-11', category: '火灾防控', module: '消防要闻', unit: '河口县消防大队', author: '吴磊', auditor: '赵国强', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 9, title: '蒙自经开区红河综保区党工委第13次会议总结树立教育', date: '2026-09-11', category: '思想政治', module: '消防要闻', unit: '蒙自市消防大队', author: '郑浩', auditor: '周卫东', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 10, title: '开远市市长强调加快推进工业园区消防基础建设', date: '2026-09-11', category: '火灾防控', module: '消防要闻', unit: '开远市消防大队', author: '孙鹏', auditor: '赵国强', status: '已发布', created_at: iso(5), updated_at: iso(5) },

    // === 通知公告 (NOTICES) ===
    { id: 21, title: '关于开展全州消防救援队伍灭火救援车辆装备摸底评估、数据录入会审工作的通知', date: '2026-09-14', category: '战勤保障', module: '通知公告', unit: '支队办公室', author: '张伟', auditor: '张伟（办公室直报）', status: '办公室直报', docNo: '红消办发〔2026〕42号', created_at: iso(2), updated_at: iso(2) },
    { id: 22, title: '关于开展体能教员培训的通知', date: '2026-09-12', category: '作战训练', module: '通知公告', unit: '支队办公室', author: '张伟', auditor: '张伟（办公室直报）', status: '办公室直报', docNo: '红消办发〔2026〕40号', created_at: iso(4), updated_at: iso(4) },
    { id: 23, title: '关于组织增援昆明磨憨洪涝灾害救援人员调休的通知', date: '2026-09-10', category: '战勤保障', module: '通知公告', unit: '支队办公室', author: '张伟', auditor: '张伟（办公室直报）', status: '办公室直报', docNo: '红消政通〔2026〕19号', created_at: iso(6), updated_at: iso(6) },
    { id: 24, title: '关于2026年8月消防救援执勤补贴和现场救援补贴统计核算情况的公示', date: '2026-09-09', category: '战勤保障', module: '通知公告', unit: '支队办公室', author: '张伟', auditor: '张伟（办公室直报）', status: '办公室直报', docNo: '红消保公〔2026〕08号', created_at: iso(7), updated_at: iso(7) },
    { id: 25, title: '关于召开全州消防救援队伍消防一体化工作现场会的通知', date: '2026-09-08', category: '火灾防控', module: '通知公告', unit: '支队办公室', author: '张伟', auditor: '张伟（办公室直报）', status: '办公室直报', docNo: '红消办发〔2026〕37号', created_at: iso(8), updated_at: iso(8) },

    // === 领导批示 (DIRECTIVES) ===
    { id: 31, title: '总队领导对红河支队"夜训夜练"经验做法作出批示肯定', date: '2026-09-13', category: '作战训练', module: '领导批示', unit: '作战训练处', status: '已发布', created_at: iso(3), updated_at: iso(3) },
    { id: 32, title: '州委主要领导批示要求全力做好汛期抢险救援准备', date: '2026-09-11', category: '战勤保障', module: '领导批示', unit: '支队办公室', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 33, title: '支队党委关于加强基层正规化建设的批示要求', date: '2026-09-08', category: '思想政治', module: '领导批示', unit: '政治部', status: '已发布', created_at: iso(8), updated_at: iso(8) },
    { id: 34, title: '州政府领导批示：坚决遏制较大以上火灾事故发生', date: '2026-09-05', category: '火灾防控', module: '领导批示', unit: '防火监督处', status: '已发布', created_at: iso(11), updated_at: iso(11) },

    // === 机关动态 (AGENCY_NEWS) ===
    {
      id: 41, title: '举行2026年新招录消防员分配仪式', date: '2026-09-14', isNew: true,
      category: '战勤保障', module: '机关动态', unit: '政治部', status: '已发布',
      images: ['https://images.unsplash.com/photo-1633092228879-d6a88c22e7bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80'],
      created_at: iso(2), updated_at: iso(2),
    },
    { id: 42, title: '开展"重温伟人诗词、纪念伟大长征"集中授课活动', date: '2026-09-11', category: '思想政治', module: '机关动态', unit: '政治部', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 43, title: '召开全州电动自行车安全隐患全链条整治工作会议', date: '2026-09-10', category: '火灾防控', module: '机关动态', unit: '防火监督处', status: '已发布', created_at: iso(6), updated_at: iso(6) },
    { id: 44, title: '组织工作组到个旧大队开展督导检查和案例复盘', date: '2026-09-10', category: '作战训练', module: '机关动态', unit: '作战训练处', status: '已发布', created_at: iso(6), updated_at: iso(6) },
    { id: 45, title: '支队机关开展9月升旗仪式和队容风纪检查', date: '2026-09-08', category: '思想政治', module: '机关动态', unit: '纪检督察室', status: '已发布', created_at: iso(8), updated_at: iso(8) },
    { id: 46, title: '蒙自—屏边经济合作区向支队致感谢信', date: '2026-09-07', category: '战勤保障', module: '机关动态', unit: '支队办公室', status: '已发布', created_at: iso(9), updated_at: iso(9) },

    // === 通报督导 (SUPERVISION) ===
    { id: 51, title: '第三期、第四期条令纪法应知应会考试成绩的通报', date: '2026-09-12', category: '思想政治', module: '通报督导', unit: '纪检督察室', status: '已发布', created_at: iso(4), updated_at: iso(4) },
    { id: 52, title: '第一次党纪法规应知应会考试成绩登记表', date: '2026-09-10', category: '思想政治', module: '通报督导', unit: '纪检督察室', status: '已发布', created_at: iso(6), updated_at: iso(6) },
    { id: 53, title: '红河州消防救援支队队伍管理督察情况通报（第九期）', date: '2026-09-09', category: '战勤保障', module: '通报督导', unit: '纪检督察室', status: '已发布', created_at: iso(7), updated_at: iso(7) },
    { id: 54, title: '红河州消防救援支队常态化督察通报（第八期）', date: '2026-09-06', category: '战勤保障', module: '通报督导', unit: '纪检督察室', status: '已发布', created_at: iso(10), updated_at: iso(10) },

    // === 基层动态：执勤训练 ===
    { id: 61, title: '【蒙自】迎接3名新消防员下队开展岗前适应性训练', date: '2026-09-15', category: '作战训练', module: '基层动态', grassrootsTab: '执勤训练', unit: '蒙自市消防大队', status: '已发布', created_at: iso(1), updated_at: iso(1) },
    { id: 62, title: '【开远】组织开展高层建筑灭火救援实战拉动演练', date: '2026-09-14', isNew: true, category: '作战训练', module: '基层动态', grassrootsTab: '执勤训练', unit: '开远市消防大队', status: '已发布', created_at: iso(2), updated_at: iso(2) },
    { id: 63, title: '【河口】与县总工会对接2026年消防安全职业技能大赛', date: '2026-09-13', isNew: true, category: '作战训练', module: '基层动态', grassrootsTab: '执勤训练', unit: '河口县消防大队', status: '已发布', created_at: iso(3), updated_at: iso(3) },
    { id: 64, title: '【泸西】开展地下有限空间浓烟搜救专项训练', date: '2026-09-12', category: '作战训练', module: '基层动态', grassrootsTab: '执勤训练', unit: '泸西县消防大队', status: '已发布', created_at: iso(4), updated_at: iso(4) },
    { id: 65, title: '【金平】深入铜矿区共商"一队一站"执勤联勤建设', date: '2026-09-11', category: '作战训练', module: '基层动态', grassrootsTab: '执勤训练', unit: '金平县消防大队', status: '已发布', created_at: iso(5), updated_at: iso(5) },

    // === 基层动态：队伍管理 ===
    { id: 66, title: '【元阳】开展中秋国庆节前队伍安全管理专项排查', date: '2026-09-10', category: '战勤保障', module: '基层动态', grassrootsTab: '队伍管理', unit: '元阳县消防大队', status: '已发布', created_at: iso(6), updated_at: iso(6) },
    { id: 67, title: '【红河】宁客路消防救援站开展夜间查铺查哨与内务规范检查', date: '2026-09-09', category: '思想政治', module: '基层动态', grassrootsTab: '队伍管理', unit: '红河县消防大队', status: '已发布', created_at: iso(7), updated_at: iso(7) },
    { id: 68, title: '【特勤】喜迎9名新消防员下队并开展队规队纪教育', date: '2026-09-08', category: '战勤保障', module: '基层动态', grassrootsTab: '队伍管理', unit: '特勤大队', status: '已发布', created_at: iso(8), updated_at: iso(8) },
    { id: 69, title: '【战保】传达学习国家综合性消防救援队伍正规化建设要求', date: '2026-09-07', category: '思想政治', module: '基层动态', grassrootsTab: '队伍管理', unit: '战勤保障处', status: '已发布', created_at: iso(9), updated_at: iso(9) },

    // === 基层动态：思想政治 ===
    { id: 70, title: '【建水】组织开展"守初心担使命"主题党日活动', date: '2026-09-11', category: '思想政治', module: '基层动态', grassrootsTab: '思想政治', unit: '建水县消防大队', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 71, title: '【弥勒】开展红色教育基地现场教学', date: '2026-09-09', category: '思想政治', module: '基层动态', grassrootsTab: '思想政治', unit: '弥勒市消防大队', status: '已发布', created_at: iso(7), updated_at: iso(7) },

    // === 基层动态：后勤保障 ===
    { id: 72, title: '【绿春】完成秋季被装物资统一发放工作', date: '2026-09-10', category: '战勤保障', module: '基层动态', grassrootsTab: '后勤保障', unit: '绿春县消防大队', status: '已发布', created_at: iso(6), updated_at: iso(6) },
    { id: 73, title: '【石屏】开展营区食品安全专项检查', date: '2026-09-08', category: '战勤保障', module: '基层动态', grassrootsTab: '后勤保障', unit: '石屏县消防大队', status: '已发布', created_at: iso(8), updated_at: iso(8) },

    // === 基层动态：监督执法 ===
    { id: 74, title: '【屏边】联合开展危险物资运输专项检查', date: '2026-09-11', isNew: true, category: '火灾防控', module: '基层动态', grassrootsTab: '监督执法', unit: '屏边县消防大队', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 75, title: '【开远】约谈3家消防安全重点单位主要负责人', date: '2026-09-07', category: '火灾防控', module: '基层动态', grassrootsTab: '监督执法', unit: '开远市消防大队', status: '已发布', created_at: iso(9), updated_at: iso(9) },

    // === 基层动态：宣传教育 ===
    { id: 76, title: '【蒙自】"消防安全进校园"主题活动走进第一小学', date: '2026-09-12', category: '火灾防控', module: '基层动态', grassrootsTab: '宣传教育', unit: '蒙自市消防大队', status: '已发布', created_at: iso(4), updated_at: iso(4) },
    { id: 77, title: '【河口】口岸消防宣传月启动仪式顺利举行', date: '2026-09-06', category: '火灾防控', module: '基层动态', grassrootsTab: '宣传教育', unit: '河口县消防大队', status: '已发布', created_at: iso(10), updated_at: iso(10) },

    // === 基层动态：综合信息 ===
    { id: 78, title: '【支队】9月份基层动态信息报送情况通报', date: '2026-09-13', category: '思想政治', module: '基层动态', grassrootsTab: '综合信息', unit: '支队办公室', status: '已发布', created_at: iso(3), updated_at: iso(3) },
    { id: 79, title: '【机关】完成第三季度政务信息编报工作', date: '2026-09-05', category: '战勤保障', module: '基层动态', grassrootsTab: '综合信息', unit: '支队办公室', status: '已发布', created_at: iso(11), updated_at: iso(11) },

    // === 救援速递 (RESCUE_EXPRESS) ===
    { id: 81, title: '红河建水：居民院内发现大王蛇 消防协助快速抓捕除患', date: '2026-09-14', isNew: true, category: '作战训练', module: '救援速递', unit: '建水县消防大队', status: '已发布', created_at: iso(2), updated_at: iso(2) },
    { id: 82, title: '红河河口：黄牛被卡石缝 消防精细破拆成功解救', date: '2026-09-14', category: '作战训练', module: '救援速递', unit: '河口县消防大队', status: '已发布', created_at: iso(2), updated_at: iso(2) },
    { id: 83, title: '红河泸西：两车相撞一人被困 消防紧急破拆救援', date: '2026-09-11', category: '作战训练', module: '救援速递', unit: '泸西县消防大队', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 84, title: '红河蒙自：群众不慎被困深井 消防架设三脚架快速施救', date: '2026-09-11', category: '作战训练', module: '救援速递', unit: '蒙自市消防大队', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 85, title: '红河河口：眼镜蛇闯入民宅藏匿老旧灶台 消防紧急捕捉除隐患', date: '2026-09-09', category: '战勤保障', module: '救援速递', unit: '河口县消防大队', status: '已发布', created_at: iso(7), updated_at: iso(7) },
    { id: 86, title: '红河蒙自：六旬老人夜间失足坠沟 消防暖心守护紧急救援', date: '2026-09-08', category: '战勤保障', module: '救援速递', unit: '蒙自市消防大队', status: '已发布', created_at: iso(8), updated_at: iso(8) },

    // === 调研专栏 (RESEARCH) ===
    { id: 91, title: '开远大队：参观看守所警示教育心得体会', date: '2026-09-14', isNew: true, category: '思想政治', module: '调研专栏', unit: '开远市消防大队', status: '已发布', created_at: iso(2), updated_at: iso(2) },
    { id: 92, title: '弥勒大队：参观廉政教育基地警示教育心得体会', date: '2026-09-12', category: '思想政治', module: '调研专栏', unit: '弥勒市消防大队', status: '已发布', created_at: iso(4), updated_at: iso(4) },
    { id: 93, title: '金平大队：开展法纪警示教育专题研讨心得体会', date: '2026-09-11', category: '思想政治', module: '调研专栏', unit: '金平县消防大队', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 94, title: '绿春大队：基层消防队伍正规化管理调研报告', date: '2026-09-11', category: '思想政治', module: '调研专栏', unit: '绿春县消防大队', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 95, title: '开远大队：参观拘留所警示教育心得体会汇编', date: '2026-09-10', category: '思想政治', module: '调研专栏', unit: '开远市消防大队', status: '已发布', created_at: iso(6), updated_at: iso(6) },

    // === 推荐阅读 (RECOMMENDED) ===
    { id: 101, title: '蒙自：引入公益"活水"撬动全民消防', date: '2026-07-06', category: '火灾防控', module: '推荐阅读', unit: '蒙自市消防大队', status: '已发布', created_at: iso(60), updated_at: iso(60) },
    { id: 102, title: '蒙自消防宣传推广步步"踩点"', date: '2026-03-26', category: '火灾防控', module: '推荐阅读', unit: '蒙自市消防大队', status: '已发布', created_at: iso(100), updated_at: iso(100) },
    { id: 103, title: '河口大队13个事业编岗位落地', date: '2026-03-02', category: '战勤保障', module: '推荐阅读', unit: '河口县消防大队', status: '已发布', created_at: iso(124), updated_at: iso(124) },
    { id: 104, title: '蒙自：为独居老人免费安装"消防三件套"', date: '2026-02-11', category: '火灾防控', module: '推荐阅读', unit: '蒙自市消防大队', status: '已发布', created_at: iso(143), updated_at: iso(143) },
    { id: 105, title: '河口：大队"一代表、两委员"积极建言献策', date: '2026-01-27', category: '思想政治', module: '推荐阅读', unit: '河口县消防大队', status: '已发布', created_at: iso(158), updated_at: iso(158) },
    { id: 106, title: '蒙自："电消"联动破解老旧小区消防难题', date: '2026-01-23', category: '火灾防控', module: '推荐阅读', unit: '蒙自市消防大队', status: '已发布', created_at: iso(162), updated_at: iso(162) },

    // === 媒体聚焦 (MEDIA_FOCUS) ===
    { id: 111, title: '多家主流媒体刊发红河消防驰援磨憨抗洪一线纪实素材', date: '2026-09-07', category: '战勤保障', module: '媒体聚焦', unit: '新闻宣传处', status: '已发布', created_at: iso(9), updated_at: iso(9) },
    { id: 112, title: '央视网报道泸西消防连夜搜救失联6小时祖孙救援行动', date: '2026-08-05', category: '战勤保障', module: '媒体聚焦', unit: '泸西县消防大队', status: '已发布', created_at: iso(42), updated_at: iso(42) },
    { id: 113, title: '中央媒体报道幼童爬入洗衣机被卡 个旧消防紧急破拆营救', date: '2026-07-03', category: '战勤保障', module: '媒体聚焦', unit: '个旧市消防大队', status: '已发布', created_at: iso(75), updated_at: iso(75) },
    { id: 114, title: '央级、省级新闻媒体纷纷报道蒙自消防营救被困货车司机', date: '2026-05-13', category: '战勤保障', module: '媒体聚焦', unit: '蒙自市消防大队', status: '已发布', created_at: iso(126), updated_at: iso(126) },
    { id: 115, title: '《中国应急管理报》报道蒙自消防"电消联动"机制', date: '2026-04-27', category: '火灾防控', module: '媒体聚焦', unit: '蒙自市消防大队', status: '已发布', created_at: iso(142), updated_at: iso(142) },

    // === 精品文摘 (DIGEST) ===
    { id: 121, title: '接纳不完美 是人生最好的自愈', date: '2026-09-11', category: '思想政治', module: '精品文摘', unit: '政治部', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 122, title: '熬过低谷 自有清风来', date: '2026-09-11', category: '思想政治', module: '精品文摘', unit: '建水县消防大队', status: '已发布', created_at: iso(5), updated_at: iso(5) },
    { id: 123, title: '工地走出的作家 于烟火尘埃中书写人生', date: '2026-09-09', category: '思想政治', module: '精品文摘', unit: '弥勒市消防大队', status: '已发布', created_at: iso(7), updated_at: iso(7) },
    { id: 124, title: '蓝焰背后，巾帼芳华——致消防女文员', date: '2026-03-05', category: '思想政治', module: '精品文摘', unit: '石屏县消防大队', status: '已发布', created_at: iso(121), updated_at: iso(121) },
    { id: 125, title: '允许别人做别人 允许自己做自己', date: '2026-06-19', category: '思想政治', module: '精品文摘', unit: '政治部', status: '已发布', created_at: iso(87), updated_at: iso(87) },

    // === 资料库 (LIBRARY_DOCS) ===
    { id: 201, title: '全国灭火救援技术师资培训教材', date: '2026-03-18', category: '作战训练', module: '资料库', unit: '作战训练处', status: '已发布', created_at: iso(108), updated_at: iso(108) },
    { id: 202, title: '2024版《地震救援行动手册》', date: '2026-03-01', category: '战勤保障', module: '资料库', unit: '战勤保障处', status: '已发布', created_at: iso(125), updated_at: iso(125) },
    { id: 203, title: '2023第二季度作战训练安全通报', date: '2026-07-26', category: '作战训练', module: '资料库', unit: '作战训练处', status: '已发布', created_at: iso(40), updated_at: iso(40) },
    { id: 204, title: '典型灾害事故处置安全管控库', date: '2025-11-24', category: '火灾防控', module: '资料库', unit: '防火监督处', status: '已发布', created_at: iso(346), updated_at: iso(346) },

    // === 待大队审核稿件 (PENDING_ARTICLES) ===
    {
      id: 301, title: '支队组织开展化工灾害事故跨区域实战拉动演练',
      date: '2026-09-15', isNew: true, category: '作战训练', module: '消防要闻',
      unit: '作战训练处', author: '陈志强', status: '待大队审核',
      content: '为全面检验全州消防救援队伍应对石油化工类灾害事故的实战处置能力，9月15日上午，红河州消防救援支队组织开展跨区域化工装置火灾扑救实战拉动演练，调集特勤、蒙自、开远、个旧等大队共16车75人参加。',
      created_at: iso(1), updated_at: iso(1),
    },
    {
      id: 302, title: '支队政治部举办基层政治教导员业务能力提升培训班',
      date: '2026-09-15', isNew: true, category: '思想政治', module: '机关动态',
      unit: '政治部', author: '林晓燕', status: '待大队审核',
      content: '为进一步夯实基层思想政治工作根基，提升政工干部履职能力，支队政治部于近日组织全州各基层大队、消防救援站政治教导员及政工干事开展专题业务培训。',
      created_at: iso(1), updated_at: iso(1),
    },
    {
      id: 303, title: '【个旧】深入老旧居民小区开展电气火灾防范入户宣传',
      date: '2026-09-15', isNew: true, category: '火灾防控', module: '基层动态',
      grassrootsTab: '宣传教育', unit: '个旧市消防大队', author: '杨帆', status: '待大队审核',
      content: '个旧市消防救援大队联合社区网格员、消防志愿者深入辖区老旧小区，重点针对独居老人家庭开展用火用电安全隐患排查及消防宣传培训。',
      created_at: iso(1), updated_at: iso(1),
    },
    {
      id: 304, title: '红河弥勒：暴雨致低洼民房积水 消防连夜疏散转移被困群众12人',
      date: '2026-09-15', isNew: true, category: '战勤保障', module: '救援速递',
      unit: '弥勒市消防大队', author: '罗浩', status: '待大队审核',
      content: '受短时强降雨影响，弥勒市部分低洼地带出现内涝积水。弥勒市消防救援大队闻警即动，携带橡皮艇、救生衣等水域救援装备紧急赶赴现场，成功疏散被困群众12人。',
      created_at: iso(1), updated_at: iso(1),
    },
    {
      id: 305, title: '【石屏】开展秋季车辆装备换季保养及战勤物资清点',
      date: '2026-09-14', isNew: false, category: '战勤保障', module: '基层动态',
      grassrootsTab: '后勤保障', unit: '石屏县消防大队', author: '何俊', status: '已退回',
      rejectReason: '请补充执勤车辆底盘检修及器材压力测试的具体统计数据后再行上报。',
      created_at: iso(2), updated_at: iso(2),
    },
  ],

  // ===== 排名 =====
  rankings: [
    { id: 1, unit: '石屏县消防大队', submitted: 46, count: 39, month: '2026-09', created_at: iso(30) },
    { id: 2, unit: '建水县消防大队', submitted: 45, count: 39, month: '2026-09', created_at: iso(30) },
    { id: 3, unit: '泸西县消防大队', submitted: 44, count: 38, month: '2026-09', created_at: iso(30) },
    { id: 4, unit: '河口县消防大队', submitted: 42, count: 37, month: '2026-09', created_at: iso(30) },
    { id: 5, unit: '蒙自市消防大队', submitted: 40, count: 35, month: '2026-09', created_at: iso(30) },
    { id: 6, unit: '弥勒市消防大队', submitted: 39, count: 34, month: '2026-09', created_at: iso(30) },
    { id: 7, unit: '开远市消防大队', submitted: 37, count: 32, month: '2026-09', created_at: iso(30) },
    { id: 8, unit: '个旧市消防大队', submitted: 35, count: 30, month: '2026-09', created_at: iso(30) },
    { id: 9, unit: '元阳县消防大队', submitted: 33, count: 28, month: '2026-09', created_at: iso(30) },
    { id: 10, unit: '红河县消防大队', submitted: 31, count: 26, month: '2026-09', created_at: iso(30) },
    { id: 11, unit: '绿春县消防大队', submitted: 29, count: 24, month: '2026-09', created_at: iso(30) },
    { id: 12, unit: '金平县消防大队', submitted: 28, count: 23, month: '2026-09', created_at: iso(30) },
    { id: 13, unit: '屏边县消防大队', submitted: 26, count: 21, month: '2026-09', created_at: iso(30) },
  ],

  // ===== users 表（旧认证表，保留兼容）=====
  users: [
    { id: 1, username: 'admin', password: 'admin123', role: '支队级', unit: '支队办公室', created_at: iso(30) },
    { id: 2, username: 'audit_zhao', password: '123456', role: '大队级', unit: '建水县消防大队', created_at: iso(30) },
    { id: 3, username: 'writer_li', password: '123456', role: '支队级', unit: '作战训练处', created_at: iso(30) },
    { id: 4, username: 'office_zhang', password: '123456', role: '支队级', unit: '支队办公室', created_at: iso(30) },
    { id: 5, username: 'mz_writer', password: '123456', role: '支队级', unit: '蒙自市消防大队', created_at: iso(30) },
    { id: 6, username: 'mz_auditor', password: '123456', role: '大队级', unit: '蒙自市消防大队', created_at: iso(30) },
    { id: 7, username: 'admin_hhxf', password: 'admin123', role: '大队级', unit: '支队办公室', created_at: iso(30) },
  ],

  // ===== adminUsers 表（完整后台用户 + 权限）=====
  adminUsers: [
    {
      id: 1, username: 'audit_zhao', name: '赵国强', unit: '建水县消防大队', level: '大队',
      jobTitle: '大队级审核主官（专职审核）', canWrite: false, canAudit: true, canOfficeDirect: false,
      canManageUsers: true, auditScope: 'ALL', allowedModules: 'ALL', active: true, created_at: iso(30),
    },
    {
      id: 2, username: 'writer_li', name: '李明', unit: '作战训练处', level: '支队',
      jobTitle: '支队处室撰稿员（仅编写上报）', canWrite: true, canAudit: false, canOfficeDirect: false,
      canManageUsers: false, auditScope: 'UNIT_ONLY', allowedModules: ['消防要闻', '机关动态', '救援速递', '资料库'], active: true, created_at: iso(30),
    },
    {
      id: 3, username: 'office_zhang', name: '张伟', unit: '支队办公室', level: '支队',
      jobTitle: '办公室公文管理员（编写+公告直报）', canWrite: true, canAudit: false, canOfficeDirect: true,
      canManageUsers: false, auditScope: 'UNIT_ONLY', allowedModules: ['通知公告', '领导批示', '消防要闻', '机关动态'], active: true, created_at: iso(30),
    },
    {
      id: 4, username: 'mz_writer', name: '郑浩', unit: '蒙自市消防大队', level: '支队',
      jobTitle: '基层大队报送员（仅编写上报）', canWrite: true, canAudit: false, canOfficeDirect: false,
      canManageUsers: false, auditScope: 'UNIT_ONLY', allowedModules: ['基层动态', '救援速递', '推荐阅读', '媒体聚焦', '调研专栏'], active: true, created_at: iso(30),
    },
    {
      id: 5, username: 'mz_auditor', name: '周卫东', unit: '蒙自市消防大队', level: '大队',
      jobTitle: '蒙自大队教导员（本大队审核员）', canWrite: true, canAudit: true, canOfficeDirect: false,
      canManageUsers: false, auditScope: 'UNIT_ONLY', allowedModules: ['基层动态', '救援速递', '推荐阅读', '调研专栏'], active: true, created_at: iso(30),
    },
    {
      id: 6, username: 'admin_hhxf', name: '王建国', unit: '支队办公室', level: '大队',
      jobTitle: '系统超级管理员（全权限）', canWrite: true, canAudit: true, canOfficeDirect: true,
      canManageUsers: true, auditScope: 'ALL', allowedModules: 'ALL', active: true, created_at: iso(30),
    },
  ],

  // ===== 外链入口 =====
  externalLinks: [
    { id: 1, name: '火灾统计', href: 'https://fstat.119.gov.cn', desc: '接入应急管理部火灾统计分析系统', position: 'both', requireCrossNet: true, created_at: iso(60) },
    { id: 2, name: '消防员之家', href: 'https://home.119.gov.cn', desc: '跳转消防员之家服务平台', position: 'top', requireCrossNet: true, created_at: iso(60) },
    { id: 3, name: '全国消防网', href: 'https://www.119.gov.cn', desc: '国家消防救援局内网主站', position: 'footer', requireCrossNet: false, created_at: iso(60) },
    { id: 4, name: '省内消防网', href: 'https://yn.119.gov.cn', desc: '云南省消防救援总队门户网站', position: 'footer', requireCrossNet: false, created_at: iso(60) },
    { id: 5, name: '总队相关链接', href: 'https://yn.119.gov.cn/links', desc: '总队机关业务处室与专题系统导航', position: 'footer', requireCrossNet: false, created_at: iso(60) },
    { id: 6, name: '实用办公工具', href: 'https://oa.hh119.internal/tools', desc: '公文排版、值班排班及常用软件下载', position: 'footer', requireCrossNet: false, created_at: iso(60) },
    { id: 7, name: '州内链接', href: 'https://hh.119.internal/brigades', desc: '全州13县市消防救援大队站点导航', position: 'footer', requireCrossNet: false, created_at: iso(60) },
  ],

  // ===== 要事日记 =====
  diaryEvents: [
    { id: 1, date: '2026-09-14', text: '举行 2026 年新招录消防员分配仪式，43 名新消防员奔赴基层一线。', tag: '战勤保障', unit: '政治部', created_at: iso(2) },
    { id: 2, date: '2026-09-11', text: '支队党委召开树立和践行正确政绩观学习教育总结会。', tag: '思想政治', unit: '政治部', created_at: iso(5) },
    { id: 3, date: '2026-09-10', text: '召开全州电动自行车安全隐患全链条整治工作会议。', tag: '火灾防控', unit: '防火监督处', created_at: iso(6) },
    { id: 4, date: '2026-08-10', text: '总队法征宇政委赴红河调研指导队伍正规化建设工作。', tag: '思想政治', unit: '支队办公室', created_at: iso(37) },
    { id: 5, date: '2026-08-05', text: '泸西消防连夜搜救失联 6 小时祖孙，成功营救，央视网报道。', tag: '战勤保障', unit: '泸西县消防大队', created_at: iso(42) },
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
  console.log(`   - adminUsers: ${seedData.adminUsers.length}`)
  console.log(`   - externalLinks: ${seedData.externalLinks.length}`)
  console.log(`   - diaryEvents: ${seedData.diaryEvents.length}`)
  console.log('   可用账号:')
  console.log('     admin_hhxf / admin123  (超级管理员，全权限)')
  console.log('     audit_zhao / 123456    (大队级审核主官)')
  console.log('     writer_li / 123456     (支队撰稿员)')
  console.log('     office_zhang / 123456  (办公室直报员)')
  console.log('     mz_writer / 123456     (蒙自大队报送员)')
  console.log('     mz_auditor / 123456    (蒙自大队审核员)')
}

export { seedData }
