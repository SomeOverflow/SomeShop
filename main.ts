/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

// development: (hostname: "45.146.254.69", port: 3000)
await start(manifest, { plugins: [twindPlugin(twindConfig)], hostname: "45.146.254.69", port: 3000 });
