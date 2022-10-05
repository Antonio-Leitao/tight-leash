import { wrap } from "svelte-spa-router/wrap";
import Home from "./lib/Home.svelte";
import Error from "./lib/Error.svelte";
import Dashboard from "./lib/Dashboard.svelte";
import Loading from "./lib/Loading.svelte";
import Denied from "./lib/Denied.svelte";
import Button from "./lib/Button.svelte";

const user = "Antonio";

export const routes = {
  "/": Home,
  "/researchers": Dashboard,

  // This route has an async function as pre-condition
  "/researchers/:name": wrap({
    // Use a dynamically-loaded component for this
    asyncComponent: () => import("./lib/Guarded.svelte"),
    // Adding one pre-condition that's an async function
    conditions: [
      (detail) => {
        return detail.params.name === user;
      },
    ],
    loadingComponent: Loading,
  }),
  "/denied": Denied,
  "/button": Button,
  "/*": Error,
};
