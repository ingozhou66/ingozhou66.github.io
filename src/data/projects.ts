export interface VideoItem {
  title: string;
  description: string;
  src: string;
  thumbnail: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  type: 'iframe' | 'video';
  thumbnail: string;
  techStack: string[];
  iframeSrc?: string;
  videos?: VideoItem[];
}

export interface TechCategory {
  name: string;
  icon: string;
  technologies: string[];
}

// ==========================================
// EDIT PROJECTS BELOW
// ==========================================
// To modify project info, edit the objects below.
// To replace videos: copy new files to public/videos/ and update src paths.
// To replace HTML files: copy new files to public/projects/ and update iframeSrc.

export const projects: Project[] = [
  {
    id: 'family-finance',
    title: '家庭财务管理',
    shortDescription: '帮你理清家庭资产和收支。覆盖资产净值追踪、月度收支记录、预算执行监控和退休资金规划。不用安装注册，即开即用，浏览器本地数据安全有保障。',
    fullDescription: '一个无需后端、无需部署、浏览器打开即用的家庭财务工具。以 Excel 文件为数据存储层，降低非技术家庭成员的维护门槛。包含仪表盘 KPI、月度收支录入、预算管理、退休测算、数据迁移五个模块。暗色主题 + 金色点缀 + 流光动画的金融级 UI。全程与 AI 协作完成，从需求定义到 UI 细节均由我独立设计。',
    type: 'iframe',
    thumbnail: '/thumbnails/project-1.jpg',
    techStack: ['Vanilla JS', 'ECharts', 'Tailwind CSS', 'SheetJS'],
    iframeSrc: '/projects/01-家庭财务中枢.html',
  },
  {
    id: 'stock-analysis',
    title: '股票分析工具',
    shortDescription: '个人投资者的技术分析助手，内置 63 条信号规则与回测引擎，自动发现买卖信号辅助交易。',
    fullDescription: '面向个人投资者的本地化股票技术分析平台。核心设计思路是将专业量化策略概念产品化为可配置的信号规则系统——63 条内置规则覆盖趋势、反转、量价等多因子，14 套策略预设开箱即用，同时支持自定义 DSL 规则编辑器。包含行情看板（K 线 + MA/MACD/RSI）、股票池管理、批量扫描和回测验证的完整闭环。全程与 AI 协作独立开发。',
    type: 'video',
    thumbnail: '/thumbnails/project-2.jpg',
    techStack: ['Flask', 'SQLite', 'ECharts 5.5', 'Python'],
    videos: [
      {
        title: '数据与行情',
        description: '数据导入流程，K 线图表展示（MA/MACD/RSI），振幅分析功能',
        src: '/videos/02-股票分析-数据与行情.mp4',
        thumbnail: '/thumbnails/project-2.jpg',
      },
      {
        title: '策略中心',
        description: '63 条信号规则管理，14 套预设策略，自定义策略编辑器',
        src: '/videos/02-股票分析-策略中心.mp4',
        thumbnail: '/thumbnails/project-2b.jpg',
      },
      {
        title: '回测与扫描',
        description: '批量扫描股票，策略回测引擎，胜率统计分析',
        src: '/videos/02-股票分析-回测与扫描.mp4',
        thumbnail: '/thumbnails/project-2c.jpg',
      },
    ],
  },
  {
    id: 'portfolio-manager',
    title: '持仓管理器',
    shortDescription: '多账户股票持仓的一站式管理。按策略分三类账户跟踪，持仓健康度红绿灯诊断，股息收益评级和资产配置监控一目了然。',
    fullDescription: '将"看看我的股票赚了多少钱"的简单需求，深化为多账户分策略管理的产品体系。三账户设计——成长账户跟踪投资逻辑验证、红利账户对比国债收益率做股息率健康度评级、指数账户监控配比偏离度。健康状态红黄绿分级模型让持仓诊断一目了然。毛玻璃卡片 + 亮色主题，内置演示模式无需后端即可体验完整交互。全程与 AI 协作独立开发。',
    type: 'iframe',
    thumbnail: '/thumbnails/project-3.jpg',
    techStack: ['Chart.js', 'Tailwind CSS', 'Flask', 'SQLite'],
    iframeSrc: '/projects/03-持仓管理器.html',
  },
  {
    id: 'mcn-hub',
    title: 'MCN达人合作平台',
    shortDescription: 'MCN 机构的达人管理后台。从发掘达人、建立合作到邮件营销、数据分析一站式搞定。',
    fullDescription: '面向 MCN 机构的达人管理全流程 SaaS 平台。包含潜在达人库、合作达人库、达人数据挖掘、Excel 导入导出、邮件营销、活动管理与达人-活动智能匹配推荐、数据分析看板、AI 对话等模块。全栈 TypeScript（React 19 + tRPC + Drizzle ORM），前后端类型安全，支持打包为 Windows 独立 exe 降低客户部署成本。四个项目中复杂度最高，体现从零定义 SaaS 产品架构的能力。全程与 AI 协作独立开发。',
    type: 'video',
    thumbnail: '/thumbnails/project-4.jpg',
    techStack: ['React 19', 'tRPC', 'Drizzle ORM', 'Framer Motion'],
    videos: [
      {
        title: '平台演示',
        description: '达人管理、数据挖掘、邮件营销、活动推荐等完整功能演示',
        src: '/videos/04-MCN-展示视频.mp4',
        thumbnail: '/thumbnails/project-4.jpg',
      },
    ],
  },
];

export const techCategories: TechCategory[] = [
  {
    name: 'Frontend',
    icon: 'Layout',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
  },
  {
    name: 'Backend',
    icon: 'Server',
    technologies: ['Flask', 'tRPC', 'Express', 'Drizzle ORM'],
  },
  {
    name: 'Database',
    icon: 'Database',
    technologies: ['SQLite', 'MySQL', 'Better-SQLite3'],
  },
  {
    name: 'Visualization',
    icon: 'BarChart3',
    technologies: ['ECharts 5.5', 'Chart.js', 'Recharts'],
  },
  {
    name: 'Tools',
    icon: 'Wrench',
    technologies: ['Vite', 'Git', 'Zod', 'React Hook Form'],
  },
];
