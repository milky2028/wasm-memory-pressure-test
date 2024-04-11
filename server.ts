import { toReadableStream } from "https://deno.land/std/io/mod.ts";

const port = 8080;
const handler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  switch (url.pathname) {
    case "/dist/allocate.wasm": {
      const body = toReadableStream(await Deno.open("./dist/allocate.wasm"));
      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "application/wasm",
        },
      });
    }

    case "/dist/allocate.js": {
      const body = toReadableStream(await Deno.open("./dist/allocate.js"));
      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "text/javascript",
        },
      });
    }

    case "/dist/allocate.debug.wasm": {
      const body = toReadableStream(
        await Deno.open("./dist/allocate.debug.wasm")
      );
      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "application/wasm",
        },
      });
    }

    case "/dist/allocate.debug.js": {
      const body = toReadableStream(
        await Deno.open("./dist/allocate.debug.js")
      );
      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "text/javascript",
        },
      });
    }

    default: {
      const body = toReadableStream(await Deno.open("./index.html"));
      return new Response(body, {
        status: 200,
        headers: {
          "Cross-Origin-Opener-Policy": "same-origin",
          "Cross-Origin-Embedder-Policy": "require-corp",
        },
      });
    }
  }
};

console.log(`HTTP server running. Access it at: http://localhost:8080/`);
Deno.serve({ port }, handler);
