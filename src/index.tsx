import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { tablePage } from './pages/table'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => c.html(tablePage()))

app.get('/api/health', (c) => c.json({ status: 'ok', service: 'Portfolio Manager', version: '2.0.0' }))

export default app
