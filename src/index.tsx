import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { mainPage } from './pages/dashboard'
import { tablePage } from './pages/table'
import { projectDetailPage } from './pages/project-detail'
import { addProjectPage } from './pages/add-project'
import { templatePage } from './pages/template'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

// 메인 (트리뷰 + 그리드뷰 + 스프레드시트 + 공통기능 + 필수항목 + 템플릿 통합)
app.get('/', (c) => c.html(mainPage()))

// 테이블 전용 페이지 (24컬럼 편집가능 스프레드시트)
app.get('/table', (c) => c.html(tablePage()))

// 프로젝트 상세
app.get('/project/:id', (c) => {
  const id = c.req.param('id')
  return c.html(projectDetailPage(id))
})

// 프로젝트 추가
app.get('/add', (c) => c.html(addProjectPage()))

// 템플릿
app.get('/template', (c) => c.html(templatePage()))

app.get('/api/health', (c) => c.json({ status: 'ok', service: 'Portfolio Manager', version: '2.2.0' }))

export default app
