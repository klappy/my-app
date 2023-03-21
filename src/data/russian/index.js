import mat1 from './mat-1';
import mat2 from './mat-2';
import act1 from './act-1';
import properNouns from './proper-nouns';
import act2 from './act-2';

export default {
  corpus: [mat1, mat2, act1, act2].join(),
  alignment: properNouns,
};