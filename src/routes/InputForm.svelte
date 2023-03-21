<script>
  import { Button, Input, Pagination, Select } from 'spaper';

  import {
    language,
    line,
    lines,
    languageSwap,
    sourceLine,
    targetLine,
    sourceAlignment,
    targetAlignment,
    sourceCorpus,
    targetCorpus,
    data,
  } from "../stores";

  $: {
    $sourceLine = data.greek.corpus.split(/\n/)[$line];
    $targetLine = data[$language].corpus.split(/\n/)[$line];
  };
  $: {
    $sourceCorpus = data.greek.corpus;
    $targetCorpus = data[$language].corpus;
    $line = 1;
  };
  $: {
    $sourceAlignment = data.greek.alignment;
    $targetAlignment = data[$language].alignment;
  };
  $: $lines = $sourceCorpus?.split("\n").length;
  
  function switchSourceAndTarget () {
    $languageSwap = !$languageSwap;
    [$sourceCorpus, $targetCorpus] = [$targetCorpus, $sourceCorpus];
    [$sourceAlignment, $targetAlignment] = [$targetAlignment, $sourceAlignment];
    [$sourceLine, $targetLine] = [$targetLine, $sourceLine];
  };

  const languages = ['english', 'arabic', 'russian'];
</script>

<div>
  <div style="width: 100%; text-align: center; margin: 0.5em;">
    <Pagination total={$lines-1} pageSize={1} rangeBetween={10} bind:current={$line} />
  </div>
  <div class="language">
    <Select label="language" class="language" bind:value={$language}>
      {#each languages as _language}
        <option value={_language}>{_language}</option>
      {/each}
    </Select>
  </div>
  <div class="switch">
    <Button type="secondary" on:click={switchSourceAndTarget}>Switch source and target</Button>
  </div>
  <div style="width: 100%">
    <Input label="Source" type="textarea" value={$sourceLine} on:change={(e)=>{ $sourceLine = e.target.value; }} />
    <Input label="Target" type="textarea" value={$targetLine} on:change={(e)=>{ $targetLine = e.target.value; }} />
    <div class="py-2">
    </div>
  </div>
  <div style="width: 100%">
    <Input label="Source Corpus" class="corpus" type="textarea" value={$sourceCorpus} on:change={(e)=>{ $sourceCorpus = e.target.value; }} />
    <Input label="Target Corpus" class="corpus" type="textarea" value={$targetCorpus} on:change={(e)=>{ $targetCorpus = e.target.value; }} />
  </div>
  <div style="width: 100%">
    <Input label="Source Alignment Memory" class="alignment" type="textarea" value={$sourceAlignment} on:change={(e)=>{ $sourceAlignment = e.target.value; }} />
    <Input label="Target Alignment Memory" class="alignment" type="textarea" value={$targetAlignment} on:change={(e)=>{ $targetAlignment = e.target.value; }} />
  </div>
</div>