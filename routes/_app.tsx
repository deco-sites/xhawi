import { defineApp } from "$fresh/server.ts";

export default defineApp((_req, ctx) => {
  return (
    <>
      <ctx.Component />
    </>
  );
});
