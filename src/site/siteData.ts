/**
 * 前台首页静态数据（迁移自设计稿 src/data.ts）
 * API 数据缺失时由 SitePage 回退到本文件
 */
import type { ModuleName } from '../types'

export type SiteArticle = {
  id: number
  title: string
  date: string
  unit?: string
  author?: string
  auditor?: string
  isNew?: boolean
  category: string
  module: ModuleName
  grassrootsTab?: GrassrootsTab
  status?: '已发布' | '待大队审核' | '办公室直报' | '已退回'
  content?: string
  docNo?: string
  images?: string[]
}

export const CATEGORIES = ['作战训练', '思想政治', '战勤保障', '火灾防控'] as const
export type Category = (typeof CATEGORIES)[number]

export const MODULE_NAMES: ModuleName[] = [
  '消防要闻',
  '通知公告',
  '领导批示',
  '机关动态',
  '通报督导',
  '基层动态',
  '推荐阅读',
  '救援速递',
  '调研专栏',
  '资料库',
  '媒体聚焦',
  '精品文摘',
]

export const GRASSROOTS_TABS = [
  '执勤训练',
  '队伍管理',
  '思想政治',
  '后勤保障',
  '监督执法',
  '宣传教育',
  '综合信息',
] as const
export type GrassrootsTab = (typeof GRASSROOTS_TABS)[number]

/** 后端 grassrootsNews 键名 → 前台 7 子栏名称 */
export const GRASSROOTS_KEYS: Record<GrassrootsTab, string> = {
  执勤训练: 'training',
  队伍管理: 'management',
  思想政治: 'politics',
  后勤保障: 'logistics',
  监督执法: 'law',
  宣传教育: 'education',
  综合信息: 'info',
}

export type NavItem = {
  name: string
  type: 'home' | 'category' | 'link' | 'page'
}

export const NAV: NavItem[] = [
  { name: '首页', type: 'home' },
  { name: '作战训练', type: 'category' },
  { name: '思想政治', type: 'category' },
  { name: '战勤保障', type: 'category' },
  { name: '火灾防控', type: 'category' },
  { name: '火灾统计', type: 'link' },
  { name: '消防员之家', type: 'link' },
  { name: '要事日记', type: 'page' },
  { name: '办公自动化', type: 'page' },
]

export type ExternalLinkItem = {
  id: string
  name: string
  href: string
  desc: string
  position: 'top' | 'footer' | 'both'
  requireCrossNet: boolean
}

export const INITIAL_EXTERNAL_LINKS: ExternalLinkItem[] = [
  { id: 'ext-1', name: '火灾统计', href: 'https://fstat.119.gov.cn', desc: '接入应急管理部火灾统计分析系统', position: 'both', requireCrossNet: true },
  { id: 'ext-2', name: '消防员之家', href: 'https://home.119.gov.cn', desc: '跳转消防员之家服务平台', position: 'top', requireCrossNet: true },
  { id: 'ext-3', name: '全国消防网', href: 'https://www.119.gov.cn', desc: '国家消防救援局内网主站', position: 'footer', requireCrossNet: false },
  { id: 'ext-4', name: '省内消防网', href: 'https://yn.119.gov.cn', desc: '云南省消防救援总队门户网站', position: 'footer', requireCrossNet: false },
  { id: 'ext-5', name: '总队相关链接', href: 'https://yn.119.gov.cn/links', desc: '总队机关业务处室与专题系统导航', position: 'footer', requireCrossNet: false },
  { id: 'ext-6', name: '实用办公工具', href: 'https://oa.hh119.internal/tools', desc: '公文排版、值班排班及常用软件下载', position: 'footer', requireCrossNet: false },
  { id: 'ext-7', name: '州内链接', href: 'https://hh.119.internal/brigades', desc: '全州13县市消防救援大队站点导航', position: 'footer', requireCrossNet: false },
]

export type AnnouncementItem = {
  id: number
  text: string
  date: string
  active: boolean
  issuer: string
}

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  { id: 1, text: '《国家电子政务外网网络与信息安全管理暂行办法》正式印发施行', date: '2026-09-14', active: true, issuer: '支队办公室' },
  { id: 2, text: '关于开展全州消防救援队伍车辆装备摸底评估、数据录入会审工作的通知', date: '2026-09-14', active: true, issuer: '支队办公室' },
  { id: 3, text: '红河州消防救援支队常态化督察通报（第九期）已发布', date: '2026-09-09', active: true, issuer: '纪检督察室' },
]

export type HeroBannerConfig = {
  id: 'headline' | 'agency'
  label: string
  img: string
  caption: string
  articleId: number
}

export const INITIAL_HERO_BANNERS: HeroBannerConfig[] = [
  {
    id: 'headline',
    label: '头条区左侧焦点图',
    img: 'https://images.unsplash.com/photo-1576707995936-a6cffe26ef7b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80',
    caption: '总队法征宇政委赴红河调研指导工作',
    articleId: 1,
  },
  {
    id: 'agency',
    label: '机关动态右侧展示图',
    img: 'https://images.unsplash.com/photo-1633092228879-d6a88c22e7bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80',
    caption: '组织开展体能教员培训',
    articleId: 41,
  },
]

export type DiaryEvent = {
  id: number
  date: string
  text: string
  tag: Category
  unit?: string
}

export const INITIAL_DIARY_EVENTS: DiaryEvent[] = [
  { id: 1, date: '2026-09-14', text: '举行 2026 年新招录消防员分配仪式，43 名新消防员奔赴基层一线。', tag: '战勤保障', unit: '政治部' },
  { id: 2, date: '2026-09-11', text: '支队党委召开树立和践行正确政绩观学习教育总结会。', tag: '思想政治', unit: '政治部' },
  { id: 3, date: '2026-09-10', text: '召开全州电动自行车安全隐患全链条整治工作会议。', tag: '火灾防控', unit: '防火监督处' },
  { id: 4, date: '2026-08-10', text: '总队法征宇政委赴红河调研指导队伍正规化建设工作。', tag: '思想政治', unit: '支队办公室' },
  { id: 5, date: '2026-08-05', text: '泸西消防连夜搜救失联 6 小时祖孙，成功营救，央视网报道。', tag: '战勤保障', unit: '泸西县消防大队' },
]

export const HEADLINE_NEWS: SiteArticle[] = [
  {
    id: 1,
    title: '总队法征宇政委赴红河调研指导工作',
    date: '2026-08-10',
    category: '思想政治',
    module: '消防要闻',
    unit: '支队办公室',
    author: '张伟',
    auditor: '赵国强',
    status: '已发布',
    images: [
      'https://images.unsplash.com/photo-1576707995936-a6cffe26ef7b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80',
    ],
  },
  {
    id: 2,
    title: '支队主官深入泸西县消防救援大队督导检查工作',
    date: '2026-09-14',
    isNew: true,
    category: '作战训练',
    module: '消防要闻',
    unit: '作战训练处',
    author: '李明',
    auditor: '赵国强',
    status: '已发布',
    images: [
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80',
    ],
  },
  { id: 3, title: '支队主官深入建水县消防救援大队开展夜间执勤战备拉动检查', date: '2026-09-13', isNew: true, category: '作战训练', module: '消防要闻', unit: '作战训练处', author: '王强', auditor: '赵国强', status: '已发布' },
  { id: 4, title: '支队党委召开树立和践行正确政绩观学习教育总结会', date: '2026-09-11', category: '思想政治', module: '消防要闻', unit: '政治部', author: '赵敏', auditor: '赵国强', status: '已发布' },
  { id: 5, title: '叶智勇副总队长实地指导养老院场所灭火救援实战化演练', date: '2026-09-11', category: '作战训练', module: '消防要闻', unit: '作战训练处', author: '陈刚', auditor: '赵国强', status: '已发布' },
  { id: 6, title: '"两队"党工委副书记、管委会主任委员来访听取近期消防工作', date: '2026-09-11', category: '火灾防控', module: '消防要闻', unit: '防火监督处', author: '刘洋', auditor: '赵国强', status: '已发布' },
  { id: 7, title: '支队主官深入弥勒市消防救援大队开展督导检查', date: '2026-09-11', category: '作战训练', module: '消防要闻', unit: '弥勒市消防大队', author: '周涛', auditor: '赵国强', status: '已发布' },
  { id: 8, title: '河口县委书记在十四届县委常委会第七次会议上强调消防安全工作', date: '2026-09-11', category: '火灾防控', module: '消防要闻', unit: '河口县消防大队', author: '吴磊', auditor: '赵国强', status: '已发布' },
  { id: 9, title: '蒙自经开区红河综保区党工委第13次会议总结树立教育', date: '2026-09-11', category: '思想政治', module: '消防要闻', unit: '蒙自市消防大队', author: '郑浩', auditor: '周卫东', status: '已发布' },
  { id: 10, title: '开远市市长强调加快推进工业园区消防基础建设', date: '2026-09-11', category: '火灾防控', module: '消防要闻', unit: '开远市消防大队', author: '孙鹏', auditor: '赵国强', status: '已发布' },
]

export const NOTICES: SiteArticle[] = [
  { id: 21, title: '关于开展全州消防救援队伍灭火救援车辆装备摸底评估、数据录入会审工作的通知', date: '2026-09-14', category: '战勤保障', module: '通知公告', unit: '支队办公室', author: '张伟', auditor: '张伟（办公室直报）', status: '办公室直报', docNo: '红消办发〔2026〕42号' },
  { id: 22, title: '关于开展体能教员培训的通知', date: '2026-09-12', category: '作战训练', module: '通知公告', unit: '支队办公室', author: '张伟', auditor: '张伟（办公室直报）', status: '办公室直报', docNo: '红消办发〔2026〕40号' },
  { id: 23, title: '关于组织增援昆明磨憨洪涝灾害救援人员调休的通知', date: '2026-09-10', category: '战勤保障', module: '通知公告', unit: '支队办公室', author: '张伟', auditor: '张伟（办公室直报）', status: '办公室直报', docNo: '红消政通〔2026〕19号' },
  { id: 24, title: '关于2026年8月消防救援执勤补贴和现场救援补贴统计核算情况的公示', date: '2026-09-09', category: '战勤保障', module: '通知公告', unit: '支队办公室', author: '张伟', auditor: '张伟（办公室直报）', status: '办公室直报', docNo: '红消保公〔2026〕08号' },
  { id: 25, title: '关于召开全州消防救援队伍消防一体化工作现场会的通知', date: '2026-09-08', category: '火灾防控', module: '通知公告', unit: '支队办公室', author: '张伟', auditor: '张伟（办公室直报）', status: '办公室直报', docNo: '红消办发〔2026〕37号' },
]

export const DIRECTIVES: SiteArticle[] = [
  { id: 31, title: '总队领导对红河支队"夜训夜练"经验做法作出批示肯定', date: '2026-09-13', category: '作战训练', module: '领导批示', unit: '作战训练处', status: '已发布' },
  { id: 32, title: '州委主要领导批示要求全力做好汛期抢险救援准备', date: '2026-09-11', category: '战勤保障', module: '领导批示', unit: '支队办公室', status: '已发布' },
  { id: 33, title: '支队党委关于加强基层正规化建设的批示要求', date: '2026-09-08', category: '思想政治', module: '领导批示', unit: '政治部', status: '已发布' },
  { id: 34, title: '州政府领导批示：坚决遏制较大以上火灾事故发生', date: '2026-09-05', category: '火灾防控', module: '领导批示', unit: '防火监督处', status: '已发布' },
]

export const AGENCY_NEWS: SiteArticle[] = [
  {
    id: 41,
    title: '举行2026年新招录消防员分配仪式',
    date: '2026-09-14',
    isNew: true,
    category: '战勤保障',
    module: '机关动态',
    unit: '政治部',
    status: '已发布',
    images: [
      'https://images.unsplash.com/photo-1633092228879-d6a88c22e7bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80',
    ],
  },
  { id: 42, title: '开展"重温伟人诗词、纪念伟大长征"集中授课活动', date: '2026-09-11', category: '思想政治', module: '机关动态', unit: '政治部', status: '已发布' },
  { id: 43, title: '召开全州电动自行车安全隐患全链条整治工作会议', date: '2026-09-10', category: '火灾防控', module: '机关动态', unit: '防火监督处', status: '已发布' },
  { id: 44, title: '组织工作组到个旧大队开展督导检查和案例复盘', date: '2026-09-10', category: '作战训练', module: '机关动态', unit: '作战训练处', status: '已发布' },
  { id: 45, title: '支队机关开展9月升旗仪式和队容风纪检查', date: '2026-09-08', category: '思想政治', module: '机关动态', unit: '纪检督察室', status: '已发布' },
  { id: 46, title: '蒙自—屏边经济合作区向支队致感谢信', date: '2026-09-07', category: '战勤保障', module: '机关动态', unit: '支队办公室', status: '已发布' },
]

export const SUPERVISION: SiteArticle[] = [
  { id: 51, title: '第三期、第四期条令纪法应知应会考试成绩的通报', date: '2026-09-12', category: '思想政治', module: '通报督导', unit: '纪检督察室', status: '已发布' },
  { id: 52, title: '第一次党纪法规应知应会考试成绩登记表', date: '2026-09-10', category: '思想政治', module: '通报督导', unit: '纪检督察室', status: '已发布' },
  { id: 53, title: '红河州消防救援支队队伍管理督察情况通报（第九期）', date: '2026-09-09', category: '战勤保障', module: '通报督导', unit: '纪检督察室', status: '已发布' },
  { id: 54, title: '红河州消防救援支队常态化督察通报（第八期）', date: '2026-09-06', category: '战勤保障', module: '通报督导', unit: '纪检督察室', status: '已发布' },
]

export const GRASSROOTS: Record<GrassrootsTab, SiteArticle[]> = {
  执勤训练: [
    { id: 61, title: '【蒙自】迎接3名新消防员下队开展岗前适应性训练', date: '09-15', category: '作战训练', module: '基层动态', grassrootsTab: '执勤训练', unit: '蒙自市消防大队', status: '已发布' },
    { id: 62, title: '【开远】组织开展高层建筑灭火救援实战拉动演练', date: '09-14', isNew: true, category: '作战训练', module: '基层动态', grassrootsTab: '执勤训练', unit: '开远市消防大队', status: '已发布' },
    { id: 63, title: '【河口】与县总工会对接2026年消防安全职业技能大赛', date: '09-13', isNew: true, category: '作战训练', module: '基层动态', grassrootsTab: '执勤训练', unit: '河口县消防大队', status: '已发布' },
    { id: 64, title: '【泸西】开展地下有限空间浓烟搜救专项训练', date: '09-12', category: '作战训练', module: '基层动态', grassrootsTab: '执勤训练', unit: '泸西县消防大队', status: '已发布' },
    { id: 65, title: '【金平】深入铜矿区共商"一队一站"执勤联勤建设', date: '09-11', category: '作战训练', module: '基层动态', grassrootsTab: '执勤训练', unit: '金平县消防大队', status: '已发布' },
  ],
  队伍管理: [
    { id: 66, title: '【元阳】开展中秋国庆节前队伍安全管理专项排查', date: '09-10', category: '战勤保障', module: '基层动态', grassrootsTab: '队伍管理', unit: '元阳县消防大队', status: '已发布' },
    { id: 67, title: '【红河】宁客路消防救援站开展夜间查铺查哨与内务规范检查', date: '09-09', category: '思想政治', module: '基层动态', grassrootsTab: '队伍管理', unit: '红河县消防大队', status: '已发布' },
    { id: 68, title: '【特勤】喜迎9名新消防员下队并开展队规队纪教育', date: '09-08', category: '战勤保障', module: '基层动态', grassrootsTab: '队伍管理', unit: '特勤大队', status: '已发布' },
    { id: 69, title: '【战保】传达学习国家综合性消防救援队伍正规化建设要求', date: '09-07', category: '思想政治', module: '基层动态', grassrootsTab: '队伍管理', unit: '战勤保障处', status: '已发布' },
  ],
  思想政治: [
    { id: 70, title: '【建水】组织开展"守初心担使命"主题党日活动', date: '09-11', category: '思想政治', module: '基层动态', grassrootsTab: '思想政治', unit: '建水县消防大队', status: '已发布' },
    { id: 71, title: '【弥勒】开展红色教育基地现场教学', date: '09-09', category: '思想政治', module: '基层动态', grassrootsTab: '思想政治', unit: '弥勒市消防大队', status: '已发布' },
  ],
  后勤保障: [
    { id: 72, title: '【绿春】完成秋季被装物资统一发放工作', date: '09-10', category: '战勤保障', module: '基层动态', grassrootsTab: '后勤保障', unit: '绿春县消防大队', status: '已发布' },
    { id: 73, title: '【石屏】开展营区食品安全专项检查', date: '09-08', category: '战勤保障', module: '基层动态', grassrootsTab: '后勤保障', unit: '石屏县消防大队', status: '已发布' },
  ],
  监督执法: [
    { id: 74, title: '【屏边】联合开展危险物资运输专项检查', date: '09-11', isNew: true, category: '火灾防控', module: '基层动态', grassrootsTab: '监督执法', unit: '屏边县消防大队', status: '已发布' },
    { id: 75, title: '【开远】约谈3家消防安全重点单位主要负责人', date: '09-07', category: '火灾防控', module: '基层动态', grassrootsTab: '监督执法', unit: '开远市消防大队', status: '已发布' },
  ],
  宣传教育: [
    { id: 76, title: '【蒙自】"消防安全进校园"主题活动走进第一小学', date: '09-12', category: '火灾防控', module: '基层动态', grassrootsTab: '宣传教育', unit: '蒙自市消防大队', status: '已发布' },
    { id: 77, title: '【河口】口岸消防宣传月启动仪式顺利举行', date: '09-06', category: '火灾防控', module: '基层动态', grassrootsTab: '宣传教育', unit: '河口县消防大队', status: '已发布' },
  ],
  综合信息: [
    { id: 78, title: '【支队】9月份基层动态信息报送情况通报', date: '09-13', category: '思想政治', module: '基层动态', grassrootsTab: '综合信息', unit: '支队办公室', status: '已发布' },
    { id: 79, title: '【机关】完成第三季度政务信息编报工作', date: '09-05', category: '战勤保障', module: '基层动态', grassrootsTab: '综合信息', unit: '支队办公室', status: '已发布' },
  ],
}

export const RESCUE_EXPRESS: SiteArticle[] = [
  { id: 81, title: '红河建水：居民院内发现大王蛇 消防协助快速抓捕除患', date: '09-14', isNew: true, category: '作战训练', module: '救援速递', unit: '建水县消防大队', status: '已发布' },
  { id: 82, title: '红河河口：黄牛被卡石缝 消防精细破拆成功解救', date: '09-14', category: '作战训练', module: '救援速递', unit: '河口县消防大队', status: '已发布' },
  { id: 83, title: '红河泸西：两车相撞一人被困 消防紧急破拆救援', date: '09-11', category: '作战训练', module: '救援速递', unit: '泸西县消防大队', status: '已发布' },
  { id: 84, title: '红河蒙自：群众不慎被困深井 消防架设三脚架快速施救', date: '09-11', category: '作战训练', module: '救援速递', unit: '蒙自市消防大队', status: '已发布' },
  { id: 85, title: '红河河口：眼镜蛇闯入民宅藏匿老旧灶台 消防紧急捕捉除隐患', date: '09-09', category: '战勤保障', module: '救援速递', unit: '河口县消防大队', status: '已发布' },
  { id: 86, title: '红河蒙自：六旬老人夜间失足坠沟 消防暖心守护紧急救援', date: '09-08', category: '战勤保障', module: '救援速递', unit: '蒙自市消防大队', status: '已发布' },
]

export const RESEARCH: SiteArticle[] = [
  { id: 91, title: '开远大队：参观看守所警示教育心得体会', date: '09-14', isNew: true, category: '思想政治', module: '调研专栏', unit: '开远市消防大队', status: '已发布' },
  { id: 92, title: '弥勒大队：参观廉政教育基地警示教育心得体会', date: '09-12', category: '思想政治', module: '调研专栏', unit: '弥勒市消防大队', status: '已发布' },
  { id: 93, title: '金平大队：开展法纪警示教育专题研讨心得体会', date: '09-11', category: '思想政治', module: '调研专栏', unit: '金平县消防大队', status: '已发布' },
  { id: 94, title: '绿春大队：基层消防队伍正规化管理调研报告', date: '09-11', category: '思想政治', module: '调研专栏', unit: '绿春县消防大队', status: '已发布' },
  { id: 95, title: '开远大队：参观拘留所警示教育心得体会汇编', date: '09-10', category: '思想政治', module: '调研专栏', unit: '开远市消防大队', status: '已发布' },
]

export const RECOMMENDED: SiteArticle[] = [
  { id: 101, title: '蒙自：引入公益"活水"撬动全民消防', date: '07-06', category: '火灾防控', module: '推荐阅读', unit: '蒙自市消防大队', status: '已发布' },
  { id: 102, title: '蒙自消防宣传推广步步"踩点"', date: '03-26', category: '火灾防控', module: '推荐阅读', unit: '蒙自市消防大队', status: '已发布' },
  { id: 103, title: '河口大队13个事业编岗位落地', date: '03-02', category: '战勤保障', module: '推荐阅读', unit: '河口县消防大队', status: '已发布' },
  { id: 104, title: '蒙自：为独居老人免费安装"消防三件套"', date: '02-11', category: '火灾防控', module: '推荐阅读', unit: '蒙自市消防大队', status: '已发布' },
  { id: 105, title: '河口：大队"一代表、两委员"积极建言献策', date: '01-27', category: '思想政治', module: '推荐阅读', unit: '河口县消防大队', status: '已发布' },
  { id: 106, title: '蒙自："电消"联动破解老旧小区消防难题', date: '01-23', category: '火灾防控', module: '推荐阅读', unit: '蒙自市消防大队', status: '已发布' },
]

export const MEDIA_FOCUS: SiteArticle[] = [
  { id: 111, title: '多家主流媒体刊发红河消防驰援磨憨抗洪一线纪实素材', date: '09-07', category: '战勤保障', module: '媒体聚焦', unit: '新闻宣传处', status: '已发布' },
  { id: 112, title: '央视网报道泸西消防连夜搜救失联6小时祖孙救援行动', date: '08-05', category: '战勤保障', module: '媒体聚焦', unit: '泸西县消防大队', status: '已发布' },
  { id: 113, title: '中央媒体报道幼童爬入洗衣机被卡 个旧消防紧急破拆营救', date: '07-03', category: '战勤保障', module: '媒体聚焦', unit: '个旧市消防大队', status: '已发布' },
  { id: 114, title: '央级、省级新闻媒体纷纷报道蒙自消防营救被困货车司机', date: '05-13', category: '战勤保障', module: '媒体聚焦', unit: '蒙自市消防大队', status: '已发布' },
  { id: 115, title: '《中国应急管理报》报道蒙自消防"电消联动"机制', date: '04-27', category: '火灾防控', module: '媒体聚焦', unit: '蒙自市消防大队', status: '已发布' },
]

export const DIGEST: SiteArticle[] = [
  { id: 121, title: '接纳不完美 是人生最好的自愈', date: '09-11', category: '思想政治', module: '精品文摘', unit: '政治部', status: '已发布' },
  { id: 122, title: '熬过低谷 自有清风来', date: '09-11', category: '思想政治', module: '精品文摘', unit: '建水县消防大队', status: '已发布' },
  { id: 123, title: '工地走出的作家 于烟火尘埃中书写人生', date: '09-09', category: '思想政治', module: '精品文摘', unit: '弥勒市消防大队', status: '已发布' },
  { id: 124, title: '蓝焰背后，巾帼芳华——致消防女文员', date: '03-05', category: '思想政治', module: '精品文摘', unit: '石屏县消防大队', status: '已发布' },
  { id: 125, title: '允许别人做别人 允许自己做自己', date: '06-19', category: '思想政治', module: '精品文摘', unit: '政治部', status: '已发布' },
]

export const LIBRARY_DOCS: SiteArticle[] = [
  { id: 201, title: '全国灭火救援技术师资培训教材', date: '03-18', category: '作战训练', module: '资料库', unit: '作战训练处', status: '已发布' },
  { id: 202, title: '2024版《地震救援行动手册》', date: '03-01', category: '战勤保障', module: '资料库', unit: '战勤保障处', status: '已发布' },
  { id: 203, title: '2023第二季度作战训练安全通报', date: '07-26', category: '作战训练', module: '资料库', unit: '作战训练处', status: '已发布' },
  { id: 204, title: '典型灾害事故处置安全管控库', date: '11-24', category: '火灾防控', module: '资料库', unit: '防火监督处', status: '已发布' },
]

export type RankingEntry = {
  rank: number
  unit: string
  submitted: number
  count: number
}

export const INITIAL_RANKING: RankingEntry[] = [
  { rank: 1, unit: '石屏县消防大队', submitted: 46, count: 39 },
  { rank: 2, unit: '建水县消防大队', submitted: 45, count: 39 },
  { rank: 3, unit: '泸西县消防大队', submitted: 44, count: 38 },
  { rank: 4, unit: '河口县消防大队', submitted: 42, count: 37 },
  { rank: 5, unit: '蒙自市消防大队', submitted: 40, count: 35 },
  { rank: 6, unit: '弥勒市消防大队', submitted: 39, count: 34 },
  { rank: 7, unit: '开远市消防大队', submitted: 37, count: 32 },
  { rank: 8, unit: '个旧市消防大队', submitted: 35, count: 30 },
  { rank: 9, unit: '元阳县消防大队', submitted: 33, count: 28 },
  { rank: 10, unit: '红河县消防大队', submitted: 31, count: 26 },
  { rank: 11, unit: '绿春县消防大队', submitted: 29, count: 24 },
  { rank: 12, unit: '金平县消防大队', submitted: 28, count: 23 },
  { rank: 13, unit: '屏边县消防大队', submitted: 26, count: 21 },
]

/** 全部稿件汇总（供顶部四大类自动检索目录） */
export const ALL_ARTICLES: SiteArticle[] = [
  ...HEADLINE_NEWS,
  ...NOTICES,
  ...DIRECTIVES,
  ...AGENCY_NEWS,
  ...SUPERVISION,
  ...Object.values(GRASSROOTS).flat(),
  ...RESCUE_EXPRESS,
  ...RESEARCH,
  ...RECOMMENDED,
  ...LIBRARY_DOCS,
  ...MEDIA_FOCUS,
  ...DIGEST,
]
