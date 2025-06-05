import { Head } from "$fresh/runtime.ts";

export default function App() {
  return (
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const lang = navigator.language.startsWith('ar') ? 'ar' : 'en';
            location.replace('/' + lang);
          `,
        }}
      />
    </Head>
  );
}
