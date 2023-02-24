<script>
  import { Article } from "spaper";
  import WordMap from "./WordMap.svelte";
</script>

<main>
  <Article title="WordMAP Lab" border>
    <p>This web app is a demo of providing "essentially aligned" Bible translations in the top 10 languages of the SLI via proper noun alignment and automated alignment by leveraging WordMAP.</p>
  </Article>
  <WordMap />
</main>
