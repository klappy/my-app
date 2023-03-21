<script>
  import WordMap from "wordmap";

  import InputForm from "./InputForm.svelte";
  import Suggestions from "./Suggestions.svelte";

  import {
    sourceLine,
    targetLine,
    sourceAlignment,
    targetAlignment,
    sourceCorpus,
    targetCorpus,
  } from "../stores";

  let map;
  let corpus;

  $: {
    map = new WordMap();
    corpus = [];
    let alignmentMemory = [];

    const _sourceAlignment = $sourceAlignment?.split("\n") || [];
    const _targetAlignment = $targetAlignment?.split("\n") || [];
    // only add a corpus if you actually have one
    const _sourceCorpus = $sourceCorpus?.split("\n") || [];
    const _targetCorpus = $targetCorpus?.split("\n") || [];

    _sourceAlignment.forEach((_source, i) => {
      const _target = _targetAlignment[i];
      if (_source?.length && _target?.length) alignmentMemory.push([_source, _target]);
      // if (_source && _target) map.appendAlignmentMemoryString(_source, _target);
    });

    _sourceCorpus.forEach((_source, i) => {
      const _target = _targetCorpus[i];
      if (_source?.length && _target?.length) corpus.push([_source, _target]);
    });
    // map.appendCorpus(alignmentMemory);

    alignmentMemory.forEach((alignment) => {
      map.appendAlignmentMemoryString(alignment[0], alignment[1]);
      corpus.push(alignment);
    });
    if (corpus?.length) map.appendCorpus(corpus);
  };

  let _sourceLine = $sourceLine;
  let _targetLine = $targetLine;

  $: {
    _sourceLine = $sourceLine;
    _targetLine = $targetLine;
  }
</script>

<div>
  <Suggestions {map} {_sourceLine} {_targetLine} />
  <InputForm />
  {#each corpus as [_sourceLine, _targetLine]}
    <Suggestions {map} {_sourceLine} {_targetLine} />
  {/each}
</div>
