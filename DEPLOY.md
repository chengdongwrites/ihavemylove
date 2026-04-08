# 部署说明：ihavemylove.life

## 部署步骤（约20分钟）

### 第一步：上传代码到 GitHub

1. 访问 github.com，注册或登录账号
2. 点击右上角 "+" → "New repository"
3. 仓库名填：`ihavemylove`，选 **Private**（私有），点击 Create
4. 在你的电脑上：
   - 打开终端，进入 `ihavemylove-website` 文件夹
   - 运行：
     ```
     git init
     git add .
     git commit -m "initial site"
     git branch -M main
     git remote add origin https://github.com/你的用户名/ihavemylove.git
     git push -u origin main
     ```

### 第二步：部署到 Vercel

1. 访问 vercel.com，用 GitHub 账号登录
2. 点击 "Add New Project"
3. 选择 `ihavemylove` 仓库，点击 Import
4. Framework 会自动检测为 Next.js
5. 点击 **Deploy**（等待约2分钟）
6. 部署成功后，Vercel 会给你一个 .vercel.app 的临时网址，先测试是否正常

### 第三步：绑定域名（Namecheap → Vercel）

1. 在 Vercel 项目页面，点击 Settings → Domains
2. 添加域名：`ihavemylove.life`
3. Vercel 会显示两条 DNS 记录，类似：
   - A 记录：`@` → `76.76.21.21`
   - CNAME 记录：`www` → `cname.vercel-dns.com`
4. 登录 Namecheap → Domain List → 点击 ihavemylove.life 的 Manage
5. 点击 Advanced DNS，添加上面两条记录
6. 等待约10-30分钟生效

### 完成！

访问 https://ihavemylove.life 即可看到网站。

---

## 后续功能（下一步）

以下功能需要设置 Supabase 数据库，可在下次 Cowork 会话中完成：

- [ ] 用户注册（邮箱+网名）
- [ ] 每章留言区
- [ ] 访问计数器
- [ ] 管理后台

---

## 本地预览（可选）

```
cd ihavemylove-website
npm install
npm run dev
```
然后访问 http://localhost:3000
