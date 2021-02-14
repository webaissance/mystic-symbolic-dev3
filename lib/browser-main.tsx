import React from "react";
import ReactDOM from "react-dom";
import { AboutPage } from "./pages/about-page";
import { VocabularyPage } from "./pages/vocabulary-page";

const Pages = {
  vocabulary: VocabularyPage,
  about: AboutPage,
};

type PageName = keyof typeof Pages;

const pageNames = Object.keys(Pages) as PageName[];

const APP_ID = "app";

const appEl = document.getElementById(APP_ID);

if (!appEl) {
  throw new Error(`Unable to find #${APP_ID}!`);
}

const App: React.FC<{}> = (props) => {
  const page = new URLSearchParams(window.location.search);
  const currPageName = toPageName(page.get("p") || "", "vocabulary");
  const PageComponent = Pages[currPageName];

  return (
    <>
      <main>
        <PageComponent />
      </main>
      <footer>
        <p>Other pages</p>
        <ul>
          {pageNames.map((pageName) => (
            <li key={pageName}>
              {currPageName === pageName ? (
                pageName
              ) : (
                <a href={`?p=${encodeURIComponent(pageName)}`}>{pageName}</a>
              )}
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
};

ReactDOM.render(<App />, appEl);

function isPageName(page: string): page is PageName {
  return pageNames.includes(page as any);
}

function toPageName(page: string, defaultValue: PageName): PageName {
  if (isPageName(page)) return page;
  return defaultValue;
}
