
import 'antd/dist/antd.css'
import './index.less'

import dva, { connect } from 'dva'

import { useRouterHistory } from 'dva/router'
import { createHashHistory } from 'history'

// 1. Initialize
const app = dva();

// 2. Plugins
//app.use({});

// 3. Model
//app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start(document.getElementById('root'), {
  history: useRouterHistory(createHashHistory)({ queryKey: false })
});
