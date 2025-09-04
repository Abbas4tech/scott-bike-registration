"use client";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { store } from "@/store";

export default function Providers({
  children,
}: PropsWithChildren): React.JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
