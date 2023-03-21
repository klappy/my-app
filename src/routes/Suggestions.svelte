<script>
  export let map;
  export let _sourceLine;
  export let _targetLine;  
  
  $: suggestions = map.predict(_sourceLine, _targetLine);

  let predictions;

  $: predictions = suggestions?.map(suggestion => {
    return suggestion?.predictions?.map(prediction => {
      const {scores, predictedAlignment} = prediction;
      // console.log('predictedA', predictedAlignment);
      return {
        alignment: predictedAlignment?.cachedKey.split('->'),
        confidence: scores?.confidence,
      }
    })
  });

  $: console.log(predictions);
</script>

<div class="predictions">
  {#each predictions[0] as prediction, index (index)}
    <div class="prediction"
      title="{prediction.confidence.toFixed(2)}"
      style="background-color: rgba({(prediction.confidence < 1) ? 255 : 0},{(prediction.confidence >= 1) ? 255 : 0},0,{ prediction.confidence >= 1 ? 1 : 0.6-prediction.confidence});"
    >
      <div class="source word">
        {prediction.alignment[0].replace(/^n:/, '').replaceAll(':', ' ')}
      </div>
      <div class="target word">
        {@html prediction.alignment[1].replace(/^n:/, '').replaceAll(':', ' ') || '&nbsp;'}
      </div>
    </div>
  {/each}
</div>