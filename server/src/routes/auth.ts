import { Router } from 'express'
import { db, ALL_UNITS } from '../db/index.js'

const router = Router()

// POST /api/auth/login
// body: { username, password }
// 返回: { token, user: { id, username, role, unit } }
router.post('/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) {
    res.status(400).json({ error: '缺少 username 或 password' })
    return
  }

  // 优先匹配 adminUsers（更完整的后台用户表）
  const adminUser = db.adminUsers.find(u => u.username === username && u.active)
  if (adminUser) {
    // adminUsers 表暂存明文 password 时使用；如无密码字段则跳过
    const baseUser = db.users.find(u => u.username === username)
    if (baseUser && baseUser.password !== password) {
      res.status(401).json({ error: '账号或密码错误' })
      return
    }
    if (!baseUser) {
      // adminUsers 存在但 users 表没记录（种子数据场景），仍放行
    }

    // 校验 unit 合法性
    if (adminUser.unit && !ALL_UNITS.includes(adminUser.unit as any)) {
      res.status(400).json({ error: `单位 "${adminUser.unit}" 不在有效列表中` })
      return
    }

    const role = adminUser.level === '支队' ? '支队级' : '大队级'
    const token = `tok_${adminUser.id}_${Date.now()}`
    res.json({
      token,
      user: {
        id: adminUser.id,
        username: adminUser.username,
        role,
        unit: adminUser.unit,
        name: adminUser.name,
        level: adminUser.level,
        canWrite: adminUser.canWrite,
        canAudit: adminUser.canAudit,
        canOfficeDirect: adminUser.canOfficeDirect,
        canManageUsers: adminUser.canManageUsers,
        auditScope: adminUser.auditScope,
        allowedModules: adminUser.allowedModules,
      },
    })
    return
  }

  // fallback: 旧 users 表
  const user = db.users.find(u => u.username === username && u.password === password)
  if (!user) {
    res.status(401).json({ error: '账号或密码错误' })
    return
  }

  // 校验 unit
  if (user.unit && !ALL_UNITS.includes(user.unit as any)) {
    res.status(400).json({ error: `单位 "${user.unit}" 不在有效列表中` })
    return
  }

  const token = `tok_${user.id}_${Date.now()}`
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      unit: user.unit,
    },
  })
})

export default router
