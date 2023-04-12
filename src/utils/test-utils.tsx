import React, { type PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type storeType from "@states/index";
import Store, { type RootState } from "@states/index";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof storeType;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function renderWithProviders(
  ui: React.ReactElement,
  {
    // preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={Store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
