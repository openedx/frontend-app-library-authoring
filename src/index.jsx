import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import {
  APP_INIT_ERROR, APP_READY, initialize, mergeConfig, subscribe,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { StudioHeader, messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import appMessages from './i18n';
import store from './store';
import { NotFoundPage } from './generic';
import {
  AboutLibrariesHyperlink,
  ROUTES,
  CourseImportPage,
  LibraryBlockPage,
  LibraryEditPage,
  LibraryListPage,
  LibraryCreatePage,
  LibraryAccessPage,
  LibraryAuthoringPage,
} from './library-authoring';
import './index.scss';
import './assets/favicon.ico';

mergeConfig({
  LIB_AUTHORING_BASE_URL: process.env.BASE_URL,
  STUDIO_BASE_URL: process.env.STUDIO_BASE_URL,
  LOGO_URL: process.env.LOGO_TRADEMARK_URL,
  BLOCKSTORE_COLLECTION_UUID: process.env.BLOCKSTORE_COLLECTION_UUID,
  SECURE_ORIGIN_XBLOCK_BOOTSTRAP_HTML_URL: process.env.SECURE_ORIGIN_XBLOCK_BOOTSTRAP_HTML_URL,
});

const mainMenu = {
  content: 'blarg',
  href: '#',
  menuItems: [
  {
    type: 'item',
    href: `#`,
    content: 'blarg',
  },
  {
    type: 'item',
    href: `#`,
    content: 'blarg',
  },
  {
    type: 'item',
    href: '#',
    content: 'blarg',
  },
]};

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      {/* todo: add help link to header or somewhere else that feels reasonable */}
      {/* <ul>
        <li className="nav-item nav-account-help">
          <h3 className="title">
            <a
              href="http://edx.readthedocs.io/projects/open-edx-building-and-running-a-course/en/latest/course_components/libraries.html"
              title={intl.formatMessage(messages['library.header.nav.help.title'])}
              rel="noopener noreferrer"
              target="_blank"
            >
              {intl.formatMessage(messages['library.header.nav.help'])}
            </a>
          </h3>
        </li>
      </ul> */}
      <StudioHeader appMenu={mainMenu}/>
        <main className="library-authoring__main-content">
          <Switch>
            <Route exact path={ROUTES.List.HOME} component={LibraryListPage} />
            <Route exact path={ROUTES.List.CREATE} component={LibraryCreatePage} />
            <Route exact path={ROUTES.Detail.HOME} component={LibraryAuthoringPage} />
            <Route exact path={ROUTES.Detail.EDIT} component={LibraryEditPage} />
            <Route exact path={ROUTES.Detail.ACCESS} component={LibraryAccessPage} />
            <Route exact path={ROUTES.Detail.IMPORT} component={CourseImportPage} />
            <Route exact path={ROUTES.Block.HOME} component={LibraryBlockPage} />
            <Route exact path={ROUTES.Block.EDIT} component={LibraryBlockPage} />
            <Route exact path={ROUTES.Block.ASSETS} component={LibraryBlockPage} />
            <Route exact path={ROUTES.Block.SOURCE} component={LibraryBlockPage} />
            <Route exact path={ROUTES.Block.LEARN} component={LibraryBlockPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </main>
        <AboutLibrariesHyperlink />
        <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [
    appMessages,
    footerMessages,
  ],
  requireAuthenticatedUser: true,
});
